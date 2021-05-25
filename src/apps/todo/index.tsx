// deps
import React, { useEffect } from "react";
import Vue from "vue";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.
import App from "./Todo.vue";

let vue: Vue | null = null;
function startTodoApp() {
    if (!vue) {
        vue = new Vue({
            el: "#todo-vue",
            render: (h) => h(App),
        });
    }
}

function destroyVue() {
    if (vue) {
        vue.$destroy();
        vue = null;
    }
}

function Todo(): JSX.Element {
    useEffect(() => {
        startTodoApp();
        return () => destroyVue();
    }, []);

    return (
        <div>
            <div id="todo-vue"></div>
        </div>
    );
}

registerCaveApp({
    key: "todo",
    name: "Todo",
    render: Todo,
});
