import { ResourceCollections } from "../http/resourceCollections/ResourceCollections";
import IHttpClient from "../http/IHttpClient";
import StidClient from "./StidClient";
import UserClient from "./UserClient";
import CodeClient from "./CodeClient";
import ReportClient from "./ReportClient";

export type ApiClients = {
    stid: StidClient;
    user: UserClient;
    code: CodeClient;
    report: ReportClient;
};

export const createApiClients = (httpClient: IHttpClient, resources: ResourceCollections): ApiClients => ({
    stid: new StidClient(httpClient, resources),
    user: new UserClient(httpClient, resources),
    code: new CodeClient(httpClient, resources),
    report: new ReportClient(httpClient, resources),
});
