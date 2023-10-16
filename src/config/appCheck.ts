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

// Recaptcha key specific to tobzor-32daa web project in firebase.
// If you want test env for previews you have to create a different project.
// TODO: is it possible to extend github action to add domains to reCaptcha key when they are generated?
const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_KEY;

export function createAppCheck(app: FirebaseApp) {
    // Specifically set only for local development based on local env file.
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
