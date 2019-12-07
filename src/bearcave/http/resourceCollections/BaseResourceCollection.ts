// Locals
import { ServiceResolver } from "../../core/ServiceResolver";
import { history } from "../../../index";
import { Params } from "../../utils/url";

class FailedToParseInstCodeError extends Error {}

export default abstract class BaseResourceCollection {
    protected serviceResolver: ServiceResolver;

    constructor(serviceResolver: ServiceResolver) {
        this.serviceResolver = serviceResolver;
    }

    // override in specific resource if another baseurl/baseparam is added some day.
    protected getBaseUrl(): string {
        return this.serviceResolver.getStidBaseUrl();
    }

    protected getBaseParams(): Params {
        return { instCode: this.instCode() };
    }

    // necessary for almost all urls
    instCode(): string {
        const [, instCode] = history.location.pathname.split("/");

        // Should we throw error here? Will fail by default when user needs to login.
        if (!instCode) throw new FailedToParseInstCodeError(history.location.pathname);

        return instCode;
    }
}
