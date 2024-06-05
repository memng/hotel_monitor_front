<script setup>
import { watch, ref, toRefs } from 'vue';
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
const activeIndex = ref(0);
const { market_id, selection_id } = toRefs(props);

const items = ref([
    {
        label: '原',
        type: 1,
        command: () => {
            bfType.value = 1;
        }
    },
    {
        label: 'K',
        type: 2,
        command: () => {
            bfType.value = 2;
        }
    },
]);

watch([market_id, selection_id], () => {
    bfType.value = 1;
    activeIndex.value = items.value.findIndex((ele) => ele.type === 1);
});
</script>

<template>
    <TabMenu v-model:activeIndex="activeIndex" :model="items"></TabMenu>
    <raw-graph v-if="bfType === 1" :key="market_id + selection_id + '1'" :market_id="market_id" :selection_id="selection_id"></raw-graph>
    <k-line v-else :key="market_id + selection_id + '2'" :market_id="market_id" :selection_id="selection_id"></k-line>
</template>