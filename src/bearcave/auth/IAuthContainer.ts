import AuthUser from "./AuthUser";

// Thanks Equinor Fusion team, this was great.
export default interface IAuthContainer {
    /**
     * Handle redirect back from login. Should not be called by apps or tiles
     */
    handleWindowCallbackAsync(): Promise<void>;

    /**
     * Acquire token for specified resource
     * @param resource Either clientId or a resource url used to resolve a registered app and token
     * @throws {StidAuthAppNotFoundError} When unable to match specified resource to a registered app
     */
    acquireTokenAsync(resource: string): Promise<string | null>;

    /**
     * Register an AAD app for authentication.
     * Returns false if login is required. (use AuthContainer.login(clientId);)
     * @param clientId The AAD app client id
     * @param resources An array of resources that uses the specified client id
     */
    registerAppAsync(clientId: string, resources: string[]): Promise<boolean>;

    /**
     * Initiates the login process
     * @param clientId The AAD app client id
     * @throws {StidAuthAppNotFoundError} When unable to match specified resource to a registered app
     */
    loginAsync(clientId: string): Promise<void>;

    /**
     * Log out
     * @param clientId Optional client id to log out of. If blank it will log out of all apps
     */
    logoutAsync(clientId?: string): Promise<void>;

    /**
     * Get the current cached user
     */
    getCachedUserAsync(): Promise<AuthUser | null>;

    /**
     * Get the current cached user sync
     */
    getCachedUser(): AuthUser | null;
}
