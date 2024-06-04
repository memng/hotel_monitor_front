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
const activeIndex = ref(1);

const items = [
    {
        label: '原',
        command: () => {
            bfType.value = 1;
        }
    },
    {
        label: 'K',
        command: () => {
            bfType.value = 2;
        }
    },
];

watch(props.selection_id, () => {
    bfType.value = 1;
});
</script>

<template>
    <TabMenu v-model="activeIndex" :model="items"></TabMenu>
    <raw-graph v-if="bfType === 1" :market_id="market_id" :selection_id="selection_id"></raw-graph>
    <k-line v-else :market_id="market_id" :selection_id="selection_id"></k-line>
</template>