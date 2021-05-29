<template>
    <div :class="$style.container">
        <h1>Real shiny vue-todo</h1>
        <form @submit.prevent="addTodo">
            <input
                v-model="newTodoText"
                type="text"
                name="todo-text"
                placeholder="New todo"
            />
        </form>
        <ul v-if="todos.length">
            <TodoItem
                v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
                @remove="removeTodo"
            />
        </ul>
        <p v-else class="none">
            Nothing left in the list. Add a new todo in the input above.
        </p>
    </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

let nextTodoId = 1;

const createTodo = (text) => ({
    text,
    id: nextTodoId++,
});

export default {
    components: {
        TodoItem,
    },

    data() {
        return {
            todos: [
                createTodo("Learn Vue"),
                createTodo("Learn about single-file components"),
                createTodo("Fall in love ❤️"),
            ],

            newTodoText: "",
        };
    },

    methods: {
        addTodo() {
            const trimmedText = this.newTodoText.trim();

            if (trimmedText) {
                this.todos.push(createTodo(trimmedText));
            }

            this.newTodoText = "";
        },

        removeTodo(item) {
            this.todos = this.todos.filter((todo) => todo !== item);
        },
    },
};
</script>

<style module>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
