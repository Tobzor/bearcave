import { DelayedDisplay } from "@components";

import {useAwait, useEffectAsync} from "@utils";
import {ReactElement, useEffect, useState} from "react";

type FeatureCollection<TProperties> = {
    type: "FeatureCollection";
    features: Feature<TProperties>[];
}

type Feature<TProperties = unknown> = {
    id: string;
    type: "Feature";
    geometry: Geometry;
    properties: TProperties;
}

type Geometry = {type: string, coordinates: unknown};

type DogHotelDto = {
    Id: string;
    Name: string;
    Address?: string;
    Description?: string;
    Location?: Geometry;
}

async function getDogHotels() {
    const response = await fetch("https://localhost:5001/api/doghotels");
    const data: FeatureCollection<DogHotelDto> = await response.json();
    return data;
}

export default function DogHotels(): ReactElement {
    const [data, loading, error] = useAwait(getDogHotels);
    
    return (
        <section>
            <h1>DogHotels</h1>

            {loading ? (
                <DelayedDisplay>
                    <p>Loading...</p>
                </DelayedDisplay>
            ) : (
                <ul>
                    {data?.features.map(feature => (
                        <li key={feature.properties.Id}>
                            <h2>{feature.properties.Name}</h2>
                            {feature.properties.Address && <p>{feature.properties.Address}</p>}
                            {feature.properties.Description && <p>{feature.properties.Description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
