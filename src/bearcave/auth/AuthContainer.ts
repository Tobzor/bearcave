import AuthUser from "./AuthUser";
import AuthApp from "./AuthApp";
import AuthCache from "./AuthCache";
import AuthToken from "./AuthToken";
import AuthNonce from "./AuthNonce";
import IAuthContainer from "./IAuthContainer";
import { trimTrailingSlash } from "../utils/url";

export class StidAuthAppNotFoundError extends Error {
    constructor(clientId: string) {
        super(`Unable to find app for clientId [${clientId}]`);
    }
}
export class StidAuthLoginError extends Error {}

const getTopLevelWindow = (win: Window): Window => {
    if (win === win.parent) {
        return win;
    }

    return getTopLevelWindow(win.parent);
};

export default class AuthContainer implements IAuthContainer {
    private apps: AuthApp[];
    private cache: AuthCache;
    private cachedUser: AuthUser | null = null;
    // private telemetryLogger?: TelemetryLogger;

    constructor() {
        this.apps = [];
        this.cache = new AuthCache();
    }

    async handleWindowCallbackAsync(): Promise<void> {
        const token = AuthContainer.getTokenFromHash(window.location.hash);
        const error = AuthContainer.getErrorFromHash(window.location.hash);

        if (error) {
            const authError = new StidAuthLoginError(error);
            // this.logError(authError);
            throw authError;
        }

        if (token === null) {
            return;
        }

        try {
            const parsedToken = AuthToken.parse(token);
            const nonce = AuthNonce.resolve(parsedToken.nonce);
            const clientId = nonce.toString();

            const app = new AuthApp(clientId, []);
            this.apps.push(app);

            await this.updateTokenForAppAsync(app, token);
            // cleanup hash
            window.location.hash = "";

            const redirectUrl = await this.cache.getRedirectUrl();
            if (redirectUrl && AuthContainer.getResourceOrigin(redirectUrl) === window.location.origin) {
                // Redirect to requested resource
                window.location.href = redirectUrl;
            }
        } catch (error) {
            // this.logError(error);
            throw new StidAuthLoginError(error);
        }
    }

    async acquireTokenAsync(resource: string): Promise<string | null> {
        const app = this.resolveApp(resource);

        if (app === null) {
            throw new StidAuthAppNotFoundError(resource);
        }

        const cachedToken = await this.cache.getTokenAsync(app);

        if (cachedToken !== null && cachedToken.isValid()) {
            return cachedToken.toString();
        }

        const refreshedToken = await this.refreshTokenAsync(resource);

        if (!refreshedToken) {
            return null;
        }

        await this.updateTokenForAppAsync(app, refreshedToken);

        return refreshedToken;
    }

    protected async refreshTokenAsync(resource: string): Promise<string | null> {
        // TODO: this should refresh token instead of logging in
        // iframes and crazies.
        await this.loginAsync(resource);
        return null;
    }

    async registerAppAsync(clientId: string, resources: string[]): Promise<boolean> {
        resources = resources.filter(Boolean);
        const existingApp = this.resolveApp(clientId);

        if (existingApp !== null) {
            existingApp.updateResources(resources);
            return (await this.cache.getTokenAsync(existingApp)) !== null;
        }

        const newApp = new AuthApp(clientId, resources);
        this.apps.push(newApp);

        const cachedToken = await this.cache.getTokenAsync(newApp);

        if (cachedToken !== null) {
            return true;
        }

        return false;
    }

    async loginAsync(clientId: string, customParams: object = {}): Promise<void> {
        const app = this.resolveApp(clientId);

        if (app === null) {
            throw new StidAuthAppNotFoundError(clientId);
        }

        const nonce = AuthNonce.createNew(app);
        this.cache.storeRedirectUrl(getTopLevelWindow(window).location.href);

        getTopLevelWindow(window).location.href = await this.buildLoginUrlAsync(app, nonce, customParams);
    }

    async logoutAsync(clientId?: string): Promise<void> {
        if (clientId) {
            const app = this.resolveApp(clientId);

            if (app === null) {
                throw new StidAuthAppNotFoundError(clientId);
            }

            return await this.cache.clearTokenAsync(app);
        }

        await this.cache.clearAsync();
    }

    async getCachedUserAsync(): Promise<AuthUser | null> {
        if (!this.cachedUser) {
            this.cachedUser = await this.cache.getUserAsync();
        }

        return this.cachedUser;
    }

    getCachedUser(): AuthUser | null {
        return this.cachedUser || null;
    }
    /*
    private logError(error: Error) {
        if (this.telemetryLogger) {
            this.telemetryLogger.trackException({ error });
        }
    } */

    private async updateTokenForAppAsync(app: AuthApp, token: string): Promise<void> {
        const parsedToken = AuthToken.parse(token);
        await this.cache.storeTokenAsync(app, parsedToken);

        const cachedUser = (await this.getCachedUserAsync()) || AuthUser.createFromToken(parsedToken);

        cachedUser.mergeWithToken(parsedToken);
        await this.cacheUserAsync(cachedUser);
    }

    private static getPartFromHash(hash: string, key: string): string | null {
        const parts = hash.substr(1).split("&");
        const tokenPart = parts.find(part => part.indexOf(`${key}`) === 0);

        if (typeof tokenPart === "undefined") {
            return null;
        }

        return tokenPart.replace(`${key}=`, "");
    }

    protected async cacheUserAsync(user: AuthUser): Promise<void> {
        this.cachedUser = user;
        await this.cache.storeUserAsync(user);
    }

    protected static getResourceOrigin(resource: string): string {
        try {
            const url = new URL(resource);
            return trimTrailingSlash(url.origin.toLowerCase());
        } catch {
            return "";
        }
    }

    protected static getTokenFromHash(hash: string): string | null {
        return AuthContainer.getPartFromHash(hash, "id_token");
    }

    protected static getErrorFromHash(hash: string): string | null {
        return AuthContainer.getPartFromHash(hash, "error");
    }

    protected async buildLoginUrlAsync(app: AuthApp, nonce: AuthNonce, customParams: object = {}): Promise<string> {
        const cachedUser = await this.getCachedUserAsync();

        // v2
        // const base = "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/v2.0/authorize";
        // v1
        const base = "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/authorize";
        const params: any = {
            ...customParams,
            client_id: app.clientId,
            response_type: "id_token",
            redirect_uri: getTopLevelWindow(window).location.origin.split("#")[0],
            nonce: nonce.getKey(),
            login_hint: cachedUser ? cachedUser.upn : null,
            scope: "openid user.read email profile",
        };

        const queryString = Object.keys(params)
            .filter(key => params[key])
            .reduce((query, key) => query + `${query ? "&" : ""}${key}=${encodeURIComponent(params[key])}`, "");
        return base + "?" + queryString;
    }

    protected resolveApp(resource: string): AuthApp | null {
        const resourceOrigin = AuthContainer.getResourceOrigin(resource);

        const app = this.apps.find(
            app =>
                app.resources.indexOf(resourceOrigin) !== -1 || app.clientId === resourceOrigin || app.clientId === resource,
        );

        if (typeof app === "undefined") {
            return null;
        }

        return app;
    }
}
