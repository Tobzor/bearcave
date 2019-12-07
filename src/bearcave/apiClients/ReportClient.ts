import BaseApiClient from "./BaseApiClient";
import { HttpResponse } from "../http/IHttpClient";
import { ReportType } from "../http/resourceCollections/ReportResourceCollection";

type Report = {
    elements: any[];
    reportApi: string;
    reportDescription: string;
    title: string;
    type: ReportType;
};

export default class ReportClient extends BaseApiClient {
    async get(): Promise<HttpResponse<Report>> {
        const url = this.resourceCollections.report.get();
        return await this.httpClient.getAsync<Report>(url);
    }
}
