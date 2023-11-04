import { getDocs, collection } from "@firebase/firestore/lite";

import { createFirebase } from "@utils";

export type Ingredient = {
    id: string;
    name: string;
};

export async function getIngredients(): Promise<Ingredient[]> {
    const firebase = createFirebase();
    const appsRef = collection(firebase.db, "apps", "bearfood", "ingredients");

    try {
        const appsSnapshot = await getDocs(appsRef);
        const ingredients = appsSnapshot.docs.map((doc) => {
            const id = doc.id;
            return {
                id,
                ...doc.data(),
            };
        }) as Ingredient[];
        return ingredients;
    } catch (error) {
        throw new Error("Failed to fetch ingredients.");
    }
}
