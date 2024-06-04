<script setup>
defineProps({
    sid: {
        type: Number,
        required: true
    }
});
</script>

<template>
     <div>odds sid : {{ sid }}</div>
</template>