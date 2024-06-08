import { FirebaseApp } from "@firebase/app";
import { AppCheck } from "@firebase/app-check";
import { Firestore } from "@firebase/firestore";

// Always create app first then use this to create other modules.
import { firebaseApp } from "./firebase";
// Firebase modules
import { createAppCheck } from "./appCheck";
import { createFirestore } from "./fireStore";

type Firebase = {
    app: FirebaseApp;
    appCheck: AppCheck;
    db: Firestore;
};

let firebase: Firebase | undefined;

export function createFirebase(): Firebase {
    if (firebase) {
        return firebase;
    }

    const appCheck = createAppCheck(firebaseApp);
    const db = createFirestore(firebaseApp);

    firebase = {
        app: firebaseApp,
        appCheck,
        db,
    };

    return firebase;
}
