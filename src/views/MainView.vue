<script setup>
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import { onMounted, toRefs, watch, ref } from 'vue';
import MainBf from './main/MainBf.vue';
import MainOdds from './main/MainOdds.vue';
import MainBd from './main/MainBd.vue';

const toast = useToast();
const props = defineProps({
    market_id: {
        type: String,
        required: true
    }
});
const { market_id } = toRefs(props);
const menuItems = ref([]);
const activeIndex = ref();
const currentComponent = ref();
const currentProps = ref();

watch(
    market_id,
    async (newValue) => {
        try {
            const marketMenu = await HttpService.get('/api/getMarketMenu', toast, { market_id: newValue });
            const foundItem = marketMenu.find((item) => item.default === 1);
            activeIndex.value = marketMenu.findIndex((item) => item.default === 1);
            watchMarketMenu(marketMenu);
            currentComponent.value = MainBf;
            currentProps.value = { market_id: newValue, selection_id: foundItem.selection_id };
        } catch (error) {
            console.log('load getMarketMenu' + error.message);
        }
    },
    { immediate: true }
);

function watchMarketMenu(marketMenu){
    const tmepList = [];
    marketMenu.map((index, element) => {
        let param;
        let componentName;
        switch (element.type) {
            case 1:
                param = { market_id: market_id, selection_id: element.selection_id };
                componentName = MainBf;
                break;
            case 2:
                param = { sid: element.sid };
                componentName = MainOdds;
                break;
            case 3:
                param = { sid: element.sid };
                componentName = MainBd;
                break;
            default:
                break;
        }
        tmepList.push({
            id: index,
            label: element.menu_name,
            command: () => {
                currentComponent.value = componentName;
                currentProps.value = param;
            }
        });
    });
    menuItems.value = tmepList;
}

onMounted(() => {
    //console.log('this is execute by onmounted' + route.params.market_id);
});
</script>
<template>
    <div>
        <TabMenu v-model="activeIndex" :model="menuItems"></TabMenu>
        <component :is="currentComponent" v-bind="currentProps"></component>
    </div>
</template>
