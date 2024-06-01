<script setup>
//import router from '@/router';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const t = ref('a');
onMounted(() => {
    console.log('this is execute by onmounted' + route.params.market_id);
});
</script>
<template>
    <div>{{ t }}</div>
</template>
