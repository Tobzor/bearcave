import { FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export function createFirestore(app: FirebaseApp) {
    return getFirestore(app);
}
