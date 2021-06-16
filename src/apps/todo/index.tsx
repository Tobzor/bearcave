// deps
import React, { useEffect } from "react";
import { App, createApp } from "vue";
// locals
import { registerCaveApp } from "@utils";
// This is the vue top level app that we are rendering.
import TodoApp from "./Todo.vue";

let vue: App<Element> | null = null;
function startTodoApp() {
    if (!vue) {
        vue = createApp(TodoApp);
    }

    vue.mount("#todo-vue");
}

function destroyVue() {
    if (vue) {
        vue.unmount();
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
