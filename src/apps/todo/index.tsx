// deps
import React from "react";
import { Route, Routes } from "react-router";
// locals
import { registerCaveApp } from "@utils";
import { Link } from "react-router-dom";

function Todo(): JSX.Element {
    return (
        <div>
            <h2>TODO</h2>
            <nav>
                <Link to="somewhere">somewhere</Link>
            </nav>

            <Routes>
                <Route path="somewhere">
                    <h2>{"TODO'"} somewhere</h2>
                </Route>
            </Routes>
        </div>
    );
}

registerCaveApp({
    key: "todo",
    name: "Todo",
    render: Todo,
});
