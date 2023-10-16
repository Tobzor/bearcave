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

// Recaptcha key used in deployed environments. One for PROD
// TODO: extend hosting-pull-request action to generate or add new domain to STAGING captcha key.
const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_KEY;

export function createAppCheck(app: FirebaseApp) {
    // Specifically set only for local development.
    // Staging and Prod has their own captcha public keys
    if (import.meta.env.DEV) {
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_DEBUG_TOKEN;
    }

    return initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(
            reCaptchaKey ?? "we're in development woho",
        ),
        isTokenAutoRefreshEnabled: true,
    });
}
