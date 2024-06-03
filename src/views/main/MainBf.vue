<script setup>
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import { toRefs, watch, ref } from 'vue';
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
const toast = useToast();
const { selection_id } = toRefs(props);
//1 raw graph 2 k_line
const bfType = ref(1);
watch(
    selection_id, 
    async (newValue) => {
        try {
            menuItems.value = await HttpService.get('/api/getMarketMenu', toast, { market_id: newValue });
            const foundItem = menuItems.value.find((item) => item.default === 1);
            router.push({ name: 'mainbf', params: { selection_id: foundItem.selection_id } });
        } catch (error) {
            console.log('load getMarketMenu' + error.message);
        }
    },
    { immediate: true }
);

</script>

<template>    
</template>