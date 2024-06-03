<script setup>
defineProps({
    market_id: {
        type: String,
        required: true
    },
    selection_id: {
        type: Number,
        required: true
    }
});
</script>

<template>
     <div>rawGraph market_id : {{ market_id }} selection_id: {{ selection_id }}</div>
</template>