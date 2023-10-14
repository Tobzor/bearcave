import { FirebaseApp } from "@firebase/app";
import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

declare global {
    interface Window {
        FIREBASE_APPCHECK_DEBUG_TOKEN: boolean;
    }
}

const reCaptchaKey = "6LcSEKAoAAAAADm5tRdKbPMgCxtKuwAsHBxJevQs";
export function createAppCheck(app: FirebaseApp) {
    if (process.env.NODE_ENV !== "production") {
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    return initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(reCaptchaKey),
        isTokenAutoRefreshEnabled: true,
    });
}
