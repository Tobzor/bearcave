// deps
import React from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
// locals
import { registerCaveApp } from "@utils";

function Trippin(): JSX.Element {
    return (
        <div>
            <h2>Trippin</h2>
            <nav>
                <Link to="somewhere">somewhere</Link>
            </nav>

            <Routes>
                <Route path="somewhere">
                    <h2>{"Trippin'"} somewhere</h2>
                </Route>
            </Routes>
        </div>
    );
}

registerCaveApp({
    key: "trippin",
    name: "Trippin",
    render: Trippin,
});
