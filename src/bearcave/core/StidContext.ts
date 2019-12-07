// Deps
import { MutableRefObject, createContext, useContext } from "react";
import { History, createBrowserHistory } from "history";
// Locals
import IAuthContainer from "../auth/IAuthContainer";
import { DeviceType } from "./DeviceType";
import { PreferTableView, ShowAllColumns } from "./ViewModes";
import { ServiceResolver } from "./ServiceResolver";
import IHttpClient from "../http/IHttpClient";
import SettingsContainer from "../settings/SettingsContainer";
import HttpClient from "../http/HttpClient";
import { ApiClients, createApiClients } from "../apiClients/ApiClients";
import { ResourceCollections, createResourceCollections } from "../http/resourceCollections/ResourceCollections";
import JSON from "../utils/JSON";

import { history } from "../../index";

export type Auth = {
    container: IAuthContainer;
};

export type Http = {
    client: IHttpClient;
    resourceCollections: ResourceCollections;
    apiClients: ApiClients;
    // resourceCache: ResourceCache;
    serviceResolver: ServiceResolver;
};

export type ExternalRefs = {
    // root: MutableRefObject<HTMLElement | null>;
    overlay: MutableRefObject<HTMLDivElement | null>;
};

export type Refs = ExternalRefs;

export type StidSettings = {
    deviceType: DeviceType;
    preferTableView: PreferTableView;
    showAllColumns: ShowAllColumns;
};

export type AppSettings = {
    [key: string]: SettingsContainer;
};

export type Settings = {
    core: SettingsContainer<StidSettings>;
    apps: AppSettings;
};

/* TODO: implement logging -- extend with component logging as well?
export type Logging = {
    telemetry: TelemetryLogger;
};
 */

export interface StidContext {
    auth: Auth;
    http: Http;
    refs: Refs;
    history: History;
    settings: Settings;
    // tasksContainer: TasksContainer; // Maybe add this per user for fun?
    // abortControllerManager: AbortControllerManager;
    // notificationCenter: NotificationCenter; // Add this to display notifications (for save, updated, etc.)
    // logging: Logging;
}

export const defaultSettings: StidSettings = {
    deviceType: DeviceType.Desktop,
    preferTableView: JSON.parse<boolean>(localStorage.getItem("preferTableView") || "false"),
    showAllColumns: false,
};

export const StidContext = createContext<StidContext>({} as StidContext);

export const createStidContext = (
    authContainer: IAuthContainer,
    serviceResolver: ServiceResolver,
    refs: ExternalRefs,
): StidContext => {
    // const telemetryLogger = new TelemetryLogger("", authContainer);
    // const abortControllerManager = new AbortControllerManager();
    const resourceCollections = createResourceCollections(serviceResolver);

    // const resourceCache = new ResourceCache();
    const httpClient = new HttpClient(authContainer);
    const apiClients = createApiClients(httpClient, resourceCollections);

    const coreSettings = new SettingsContainer<StidSettings>("stid", defaultSettings);

    // const tasksContainer = new TasksContainer(apiClients);
    // const notificationCenter = new NotificationCenter();
    const stidContext: StidContext = {
        auth: { container: authContainer },
        http: {
            client: httpClient,
            resourceCollections,
            apiClients,
            // resourceCache,
            serviceResolver,
        },
        refs,
        history,
        settings: {
            core: coreSettings,
            apps: {},
        },
        // tasksContainer,
        // abortControllerManager,
        // notificationCenter,
        // logging: {
        // telemetry: telemetryLogger,
        // },
    };

    return stidContext;
};

export const useStidContext: () => StidContext = () => useContext(StidContext);

export default StidContext;
