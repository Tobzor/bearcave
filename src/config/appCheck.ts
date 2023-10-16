import { FirebaseApp } from "@firebase/app";
import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

declare global {
    interface Window {
        FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string;
    }
}

// PROD public key for app-check. Only used if we don't assign debug_token.
const reCaptchaKey = "6LcSEKAoAAAAADm5tRdKbPMgCxtKuwAsHBxJevQs";

export function createAppCheck(app: FirebaseApp) {
    // We set debug tokens if they exist in the current environment (only local and preview)
    // SHOULD NOT EXIST IN PROD
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_DEBUG_TOKEN;

    console.log(
        "DEBUG TOKEN ASSIGNMENT",
        import.meta.env.VITE_DEBUG_TOKEN,
        self.FIREBASE_APPCHECK_DEBUG_TOKEN,
    );

    return initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(reCaptchaKey),
        isTokenAutoRefreshEnabled: true,
    });
}
