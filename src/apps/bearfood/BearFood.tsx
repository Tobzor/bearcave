import { DelayedDisplay } from "@components";

import { getIngredients } from "./helpers/getIngredients";
import { useAwait } from "@utils";

export default function BearFood() {
    const [data, loading] = useAwait(getIngredients);
    const ingredients = data ?? [];
    return (
        <section>
            <h1>BearFood</h1>

            {loading ? (
                <DelayedDisplay>
                    <p>Loading...</p>
                </DelayedDisplay>
            ) : (
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                </ul>
            )}
        </section>
    );
}
