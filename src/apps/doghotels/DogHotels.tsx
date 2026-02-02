import { DelayedDisplay } from "@components";

import {useAwait, useEffectAsync} from "@utils";
import {ReactElement, useEffect, useState} from "react";

export default function DogHotels(): ReactElement {
    const [data, loading, error] = useAwait(async () => {
        return undefined; // apicall()
    })
    
    return (
        <section>
            <h1>DogHotels</h1>

            {loading ? (
                <DelayedDisplay>
                    <p>Loading...</p>
                </DelayedDisplay>
            ) : (
                <ul>
                    <li>this should be data eventually</li>
                </ul>
            )}
        </section>
    );
}
