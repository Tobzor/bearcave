import BaseApiClient from "./BaseApiClient";
import { HttpResponse } from "../http/IHttpClient";
import {
    ImportCodeParams,
    DependentCodeParams,
    CodeTableType,
    IndependentCodeTableType,
    DependentCodeTableType,
    IndependentCodeParams,
} from "../http/resourceCollections/CodeResourceCollection";

export type Code = {
    [key: string]: any;
    filter: {
        text: string;
        value: any;
    };
};

export type CodeResponse = Code[];

class CodeGetClient extends BaseApiClient {
    async getIndependent<CodeResponse>(
        codeType: IndependentCodeTableType,
        codeParams?: IndependentCodeParams,
    ): Promise<HttpResponse<CodeResponse>> {
        const url = this.resourceCollections.code.getResource(codeType, codeParams);
        return this.httpClient.getAsync<CodeResponse>(url);
    }

    async getDependent<CodeResponse>(
        codeType: DependentCodeTableType,
        codeParams?: DependentCodeParams,
    ): Promise<HttpResponse<CodeResponse>> {
        const url = this.resourceCollections.code.getResource(codeType, codeParams);
        return this.httpClient.getAsync<CodeResponse>(url);
    }

    async get(
        codeType: CodeTableType,
        parentValue?: any,
        params?: { [key: string]: string | boolean },
    ): Promise<HttpResponse<CodeResponse>> {
        // handle dependent
        if (parentValue) {
            const codeParams: DependentCodeParams = {
                parentValue,
                ...params,
            };

            return this.getDependent(codeType as DependentCodeTableType, codeParams);
        }

        // handle independent
        return this.getIndependent(codeType as IndependentCodeTableType, params);
    }
}

class CodeImportClient extends CodeGetClient {
    private async import<TBody, TResponse>(
        codeType: CodeTableType,
        body: TBody,
        importParams?: ImportCodeParams,
    ): Promise<HttpResponse<TResponse>> {
        const url = this.resourceCollections.code.getImportResource(codeType);
        return this.httpClient.postAsync<TBody, TResponse>(url, body);
    }
}

export default class CodeClient extends CodeImportClient {}
