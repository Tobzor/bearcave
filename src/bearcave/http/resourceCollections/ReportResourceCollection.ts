import BaseResourceCollection from "./BaseResourceCollection";
import { combineUrls } from "../../utils/url";
import { history } from "../../../index";

export default class ReportResourceCollection extends BaseResourceCollection {
    protected getReportType(): ReportType {
        const queryString = history.location.pathname.split("/");

        const stringReportType: string = queryString[queryString.indexOf("report") + 1];

        return stringReportType as ReportType;
    }

    get(): string {
        const reportType = this.getReportType();
        const url = combineUrls(this.getBaseUrl(), "portal", "report", this.instCode(), "form", reportType);
        return url;
    }
}

export enum ReportType {
    lciqc = "lciqc",
}
