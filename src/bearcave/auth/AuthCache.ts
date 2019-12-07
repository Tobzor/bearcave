import AuthApp from "./AuthApp";
import AuthToken from "./AuthToken";
import AuthUser, { AuthUserJSON } from "./AuthUser";
import LocalStorageProvider from "../cache/LocalStorageProvider";
import ReliableStorageProvider from "../utils/ReliableStorageProvider";

enum TokenCacheKey {
    TOKEN = "TOKEN",
    USER = "USER",
    REDIRECT_URL = "REDIRECT_URL",
}

export default class AuthCache extends ReliableStorageProvider {
    constructor() {
        super(new LocalStorageProvider("STID_AUTH_CACHE"));
    }

    private static createAppCacheKey(app: AuthApp, key: TokenCacheKey): string {
        return `STID_AUTH_CACHE:${app.clientId}:${key}`;
    }

    async storeTokenAsync(app: AuthApp, token: AuthToken): Promise<void> {
        await this.setAsync(AuthCache.createAppCacheKey(app, TokenCacheKey.TOKEN), token.toString());
    }

    async getTokenAsync(app: AuthApp): Promise<AuthToken | null> {
        const originalToken = await this.getAsync<string, string>(AuthCache.createAppCacheKey(app, TokenCacheKey.TOKEN));

        if (!originalToken) {
            return null;
        }

        return AuthToken.parse(originalToken);
    }

    async clearTokenAsync(app: AuthApp): Promise<void> {
        await this.removeAsync(AuthCache.createAppCacheKey(app, TokenCacheKey.TOKEN));
    }

    async storeUserAsync(user: AuthUser): Promise<void> {
        await this.setAsync(TokenCacheKey.USER, user.toObject());
    }

    async getUserAsync(): Promise<AuthUser | null> {
        const cachedUser = await this.getAsync<string, AuthUserJSON>(TokenCacheKey.USER);

        if (cachedUser === null) {
            return null;
        }

        return AuthUser.fromJSON(cachedUser);
    }

    async storeRedirectUrl(redirectUrl: string) {
        await this.setAsync(TokenCacheKey.REDIRECT_URL, redirectUrl);
    }

    async getRedirectUrl() {
        const redirectUrl = await this.getAsync<string, string>(TokenCacheKey.REDIRECT_URL);
        await this.removeAsync(TokenCacheKey.REDIRECT_URL);
        return redirectUrl;
    }
}
