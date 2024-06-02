<script setup>
//import router from '@/router';
import { onMounted, toRefs, watch } from 'vue';
const props = defineProps({
    market_id: {
        type: String,
        required: true
    }
});
const { market_id } = toRefs(props);
watch(
    market_id, 
    (newValue) => {
        console.log('this is execute by onmounted' + newValue);
    },
    { immediate: true }
);

onMounted(() => {
    //console.log('this is execute by onmounted' + route.params.market_id);
});
</script>
<template>
    <div>{{ market_id }}</div>
</template>
