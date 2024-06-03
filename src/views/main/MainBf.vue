<script setup>
import { watch, ref } from 'vue';
import RawGraph from '@/views/main/RawGraph.vue';
import KLine from '@/views/main/KLine.vue';
const props = defineProps({
    market_id: {
        type: String,
        required: true
    },
    selection_id: {
        type: Number,
        required: true
    }
});

//1 raw graph 2 k_line
const bfType = ref(1);
watch(props.selection_id, () => {
    bfType.value = 1;
});
</script>

<template>
    <Menu></Menu>
    <raw-graph :market_id="market_id" :selection_id="selection_id" v-if="bfType === 1"></raw-graph>
    <k-line :market_id="market_id" :selection_id="selection_id" v-else></k-line>
</template>