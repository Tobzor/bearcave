// deps
import React, { useEffect } from "react";
import Vue from "vue";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.
import App from "./Todo.vue";

function startTodoApp() {
    const vue = new Vue({
        render: (h) => h(App),
    });

    vue.$mount("#todo-vue");
}

function Todo(): JSX.Element {
    useEffect(() => {
        startTodoApp();
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
