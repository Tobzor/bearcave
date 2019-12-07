import BaseResourceCollection from "./BaseResourceCollection";
import { combineUrls, addParams, Params } from "../../utils/url";

export default class StidResourceCollection extends BaseResourceCollection {
    plants() {
        const url = combineUrls(this.getBaseUrl(), "portal", "plants");
        return addParams(url, this.getBaseParams());
    }

    image() {
        const url = combineUrls(this.getBaseUrl(), "portal", "image", this.instCode());
        return url;
    }

    changeLog() {
        const url = combineUrls(this.getBaseUrl(), "portal", "change-log");
        return url;
    }
}
