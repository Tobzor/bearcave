<template>
    <li>
        <span>{{ todo.text }}</span>
        <button @click.prevent="$emit('remove', todo)">Remove</button>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            required: true,
            type: Object,
        },
    },
    emits: ["remove"],
};
</script>

<style scoped></style>
