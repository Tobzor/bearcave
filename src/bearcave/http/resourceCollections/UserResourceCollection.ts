import BaseResourceCollection from "./BaseResourceCollection";
import { combineUrls } from "../../utils/url";

export default class UserResourceCollection extends BaseResourceCollection {
    user(): string {
        return combineUrls(this.getBaseUrl(), "portal", "user");
    }
}
