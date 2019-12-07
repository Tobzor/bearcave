import BaseApiClient from "./BaseApiClient";
import { HttpResponse } from "../http/IHttpClient";

type InstCode = string;

type Plants = any;
type ChangeLog = any;

type PlantImage = {
    instCode: InstCode;
    updatedDate: Date;
    imagesSrcString: string;
};

export default class StidClient extends BaseApiClient {
    async getPlantsAsync(): Promise<HttpResponse<Plants>> {
        const url = this.resourceCollections.stid.plants();
        return this.httpClient.getAsync<Plants[]>(url);
    }

    async getPlantImageAsync(): Promise<HttpResponse<Plants>> {
        const url = this.resourceCollections.stid.image();
        return this.httpClient.getAsync<PlantImage>(url);
    }

    async getChangelogAsync(): Promise<HttpResponse<ChangeLog>> {
        const url = this.resourceCollections.stid.changeLog();
        return this.httpClient.getAsync<ChangeLog>(url);
    }
}
