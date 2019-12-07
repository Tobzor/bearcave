import { ServiceResolver } from "../../core/ServiceResolver";

import StidResourceCollection from "./StidResourceCollection";
import UserResourceCollection from "./UserResourceCollection";
import CodeResourceCollection from "./CodeResourceCollection";
import ReportResourceCollection from "./ReportResourceCollection";

export type ResourceCollections = {
    stid: StidResourceCollection;
    user: UserResourceCollection;
    code: CodeResourceCollection;
    report: ReportResourceCollection;
};

export const createResourceCollections = (serviceResolver: ServiceResolver): ResourceCollections => ({
    stid: new StidResourceCollection(serviceResolver),
    user: new UserResourceCollection(serviceResolver),
    code: new CodeResourceCollection(serviceResolver),
    report: new ReportResourceCollection(serviceResolver),
});
