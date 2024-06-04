<script setup>
defineProps({
    sid: {
        type: Number,
        required: true
    }
});
</script>

<template>
     <div>bd sid : {{ sid }}</div>
</template>