// deps
import uuid from "uuid";
// locals
import {
    Notification,
    NotificationPresenter,
    NotificationPresenterRegistration,
    NotificationPriority,
    NotificationRequest,
    NotificationResolver,
    NotificationResponse,
    NotificationType,
} from "@types";
import { ReliableCache, LocalStorageProvider } from "@utils";

type NotificationCache = {
    notifications: Notification[];
};

enum NotificationCacheKeys {
    notifications = "notifications",
}

type NotificationEvent = (notification: NotificationRequest) => void;
type NotificationEvents = {
    presented: NotificationEvent;
    dismissed: NotificationEvent;
    confirmed: NotificationEvent;
    cancelled: NotificationEvent;
    finished: NotificationEvent;
};

export default class NotificationCenter extends ReliableCache<
    NotificationCache,
    NotificationEvents
> {
    constructor() {
        super(
            new LocalStorageProvider("BEARCAVE_NOTIFICATION_CENTER", {
                notifications: [],
            }),
        );
    }

    sendAsync(): void {}

    registerPresenter(): void {}
}
