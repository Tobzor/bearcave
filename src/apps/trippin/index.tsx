// deps
import React from "react";
import { Route, Routes } from "react-router";
// locals
import { registerCaveApp } from "@utils";
import { Link } from "react-router-dom";

function Trippin(): JSX.Element {
    return (
        <div>
            <h2>Trippin</h2>
            <nav>
                <Link to="somewhere">somewhere</Link>
            </nav>

            <Routes>
                <Route path="somewhere" element={<h2>Trippin' somewhere</h2>} />
            </Routes>
        </div>
    );
}

registerCaveApp({
    key: "trippin",
    name: "Trippin",
    render: Trippin,
});
