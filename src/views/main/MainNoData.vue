<script setup>
defineProps({
    show_message: {
        type: String,
        required: true
    }
});
</script>
<template>
    <div>{{ show_message }}</div>
</template>
