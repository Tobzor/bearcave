export type HttpResponse<T> = {
    data: T;
    headers: Headers;
    status: number;
};
export type RequestBody = unknown | (() => string);
export default interface IHttpClient {
    /**
     * Perform a GET request
     * @param url Request url
     * @param init Optional request init object
     */
    getAsync<TResponse>(url: string, init?: RequestInit | null): Promise<HttpResponse<TResponse>>;

    /**
     * Perform a POST request
     * @param url Request url
     * @param body Request body
     * @param init Optional request init object
     */
    postAsync<TBody extends RequestBody, TResponse>(
        url: string,
        body: TBody,
        init?: RequestInit | null,
    ): Promise<HttpResponse<TResponse>>;

    /**
     * Perform a PUT request
     * @param url Request url
     * @param body Request body
     * @param init Optional request init object
     */
    putAsync<TBody extends RequestBody, TResponse>(
        url: string,
        body: TBody,
        init?: RequestInit | null,
    ): Promise<HttpResponse<TResponse>>;

    /**
     * Perform a PATCH request
     * @param url Request url
     * @param body Request body
     * @param init Optional request init object
     */
    patchAsync<TBody extends RequestBody, TResponse>(
        url: string,
        body: TBody,
        init?: RequestInit | null,
    ): Promise<HttpResponse<TResponse>>;

    /**
     * Perform a DELETE request
     * @param url Request url
     * @param init Optional request init object
     * @param responseParser Optional response parser
     */
    deleteAsync<TResponse>(url: string, init?: RequestInit | null): Promise<HttpResponse<TResponse>>;
}
