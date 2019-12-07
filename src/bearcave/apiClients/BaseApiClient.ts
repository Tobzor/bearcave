// Locals
import IHttpClient from "../http/IHttpClient";
import { ResourceCollections } from "../http/resourceCollections/ResourceCollections";

export default abstract class BaseApiClient {
    protected httpClient: IHttpClient;
    protected resourceCollections: ResourceCollections;

    constructor(httpClient: IHttpClient, resourceCollections: ResourceCollections) {
        this.httpClient = httpClient;
        this.resourceCollections = resourceCollections;
    }
}
