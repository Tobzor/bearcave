// deps
import uuid from "uuid";
import { EventEmitter } from "events";

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

class NotificationCenter extends EventEmitter {
    constructor() {
        super();
    }
}
