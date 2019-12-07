// Deps
import uuid from "uuid";
// Locals
import IAuthContainer from "../auth/IAuthContainer";
import { HttpClientRequestFailedError, HttpClientParseError } from "./HttpClientError";
import IHttpClient, { HttpResponse, RequestBody } from "./IHttpClient";
import JSON from "../utils/JSON";

export default class HttpClient implements IHttpClient {
    private authContainer: IAuthContainer;
    // private resourceCache: ResourceCache;
    // private abortControllerManager: AbortControllerManager;
    // private telemetryLogger: TelemetryLogger;

    private requestsInProgress: { [key: string]: Promise<HttpResponse<any>> } = {};
    private sessionId = uuid();

    constructor(
        authContainer: IAuthContainer,
        // resourceCache: ResourceCache,
        // abortControllerManager: AbortControllerManager,
        // telemetryLogger: TelemetryLogger
    ) {
        this.authContainer = authContainer;
        // this.resourceCache = resourceCache;
        // this.abortControllerManager = AbortControllerManager;
        // this.telemetryLogger = telemetryLogger;
    }

    async getAsync<TResponse>(url: string, init?: RequestInit | null) {
        // Reuse GET requests in progress
        const requestInProgress = this.getRequestInProgress<TResponse>(url);

        if (requestInProgress) {
            return await requestInProgress;
        }

        return this.performReusableRequest<TResponse>(url, async () => {
            init = this.ensureRequestInit(init, init => ({ ...init, method: "GET" }));
            const response = await this.performFetchAsync(url, init);
            return await this.parseResponseAsync<TResponse>(init, response);
        });
    }

    async postAsync<TBody, TResponse>(url: string, body: TBody, init?: RequestInit | null) {
        init = this.ensureRequestInit(init, init => ({ ...init, method: "POST", body: this.createRequestBody(body) }));

        const response = await this.performFetchAsync(url, init);
        return await this.parseResponseAsync<TResponse>(init, response);
    }

    async putAsync<TBody, TResponse>(url: string, body: TBody, init?: RequestInit | null) {
        init = this.ensureRequestInit(init, init => ({ ...init, method: "PUT", body: this.createRequestBody(body) }));

        const response = await this.performFetchAsync(url, init);
        return await this.parseResponseAsync<TResponse>(init, response);
    }

    async patchAsync<TBody, TResponse>(url: string, body: TBody, init?: RequestInit | null) {
        init = this.ensureRequestInit(init, init => ({ ...init, method: "PATCH", body: this.createRequestBody(body) }));

        const response = await this.performFetchAsync(url, init);
        return await this.parseResponseAsync<TResponse>(init, response);
    }

    async deleteAsync<TResponse>(url: string, init?: RequestInit | null) {
        init = this.ensureRequestInit(init, init => ({ ...init, method: "DELETE" }));

        const response = await this.performFetchAsync(url, init);
        return await this.parseResponseAsync<TResponse>(init, response);
    }

    private async performFetchAsync(url: string, init: RequestInit): Promise<Response> {
        try {
            const options = await this.transformRequestAsync(url, init);
            const response = await fetch(url, options);

            if (!response.ok) {
                // TODO: improve?
                const errorResponse = await this.parseResponseJSONAsync(response);
                throw new HttpClientRequestFailedError(url, response.status, errorResponse);
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    private async performReusableRequest<TResponse>(url: string, handler: () => Promise<HttpResponse<TResponse>>) {
        // Reuse GET requests in progress
        const requestInProgress = this.getRequestInProgress<TResponse>(url);

        if (requestInProgress) {
            return await requestInProgress;
        }

        const requestPerformer = async () => {
            try {
                const data = await handler();
                delete this.requestsInProgress[url];
                return data;
            } catch (error) {
                delete this.requestsInProgress[url];
                throw error;
            }
        };

        const request = requestPerformer();

        this.requestsInProgress[url] = requestPerformer();

        return await request;
    }

    private async parseResponseAsync<TResponse>(request: RequestInit, response: Response): Promise<HttpResponse<TResponse>> {
        const data = await this.parseResponseJSONAsync<TResponse>(response);

        return this.createHttpResponse<TResponse>(request, response, data);
    }

    private async createHttpResponse<TResponse>(request: RequestInit, response: Response, data: TResponse) {
        const httpResponse: HttpResponse<TResponse> = {
            data,
            status: response.status,
            headers: response.headers,
        };

        return httpResponse;
    }

    private async parseResponseJSONAsync<TResponse>(response: Response): Promise<TResponse> {
        try {
            const text = await response.text();
            const json = JSON.parse<TResponse>(text);
            return json;
        } catch (error) {
            throw new HttpClientParseError(response);
        }
    }

    // Request transformers
    private async transformRequestAsync(url: string, init: RequestInit) {
        let request = await this.addAuthHeaderAsync(url, init);
        // request = this.addAcceptJsonHeader(request);
        // request = await this.addAbortSignal(request);
        request = this.addSessionIdHeader(request);
        return request;
    }

    private async addAuthHeaderAsync(url: string, init: RequestInit) {
        const token = await this.authContainer.acquireTokenAsync(url);

        return this.transformHeaders(init, headers => headers.append("Authorization", "Bearer " + token));
    }

    private addSessionIdHeader(init: RequestInit) {
        return this.transformHeaders(init, headers => headers.append("X-Session-Id", this.sessionId));
    }

    private transformHeaders(init: RequestInit, transform: (headers: Headers) => void): RequestInit {
        const headers = new Headers(init.headers);
        transform(headers);

        return {
            ...init,
            headers,
        };
    }

    // Utils
    private getRequestInProgress<T>(url: string) {
        return this.requestsInProgress[url] as Promise<HttpResponse<T>>;
    }

    private createRequestBody<TBody extends RequestBody>(body: TBody) {
        if (typeof body === "function") {
            const bodyFactory = body as () => string;
            return bodyFactory();
        }

        return JSON.stringify(body);
    }

    private ensureRequestInit(init?: RequestInit | null, transform?: (init: RequestInit) => RequestInit) {
        const headers = new Headers(init && init.headers ? init.headers : new Headers());

        init = {
            ...init,
            headers,
        };

        for (let key in defaultHeaders) {
            headers.append(key, defaultHeaders[key]);
        }

        if (typeof transform === "undefined") {
            return init;
        }

        return transform(init);
    }
}

const defaultHeaders: { [key: string]: string } = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
