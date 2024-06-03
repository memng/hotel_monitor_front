<script setup>
import router from '@/router';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import { onMounted, toRefs, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
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
let isNavigating = false;

watch(
    market_id,
    async (newValue) => {
        if (isNavigating) return;
        try {
            const marketMenu = await HttpService.get('/api/getMarketMenu', toast, { market_id: newValue });
            const foundItem = marketMenu.find((item) => item.default === 1);
            activeIndex.value = marketMenu.findIndex((item) => item.default === 1);
            watchMarketMenu(marketMenu);
            if (route.name !== 'mainbf' || route.params.selection_id !== foundItem.selection_id) {
                isNavigating = true;
                await router.push({ name: 'mainbf', params: { market_id: newValue, selection_id: foundItem.selection_id } });
                isNavigating = false;
            }
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
        let routeName;
        switch (element.type) {
            case 1:
                param = element.selection_id;
                routeName = 'mainbf';
                break;
            case 2:
                param = element.sid;
                routeName = 'mainodds';
                break;
            case 3:
                param = element.sid;
                routeName = 'mainbd';
                break;
            default:
                break;
        }
        tmepList.push({
            id: index,
            label: element.menu_name,
            command: () => {
                // 执行你的操作，比如显示 toast
                doRouterPush(routeName, param);
            }
        });
    });
    menuItems.value = tmepList;
}

async function doRouterPush(routeName, param){
    if (routeName === 'mainbf') {
        if (route.name !== routeName || route.params.selection_id !== param) {
            isNavigating = true;
            await router.push({ name: routeName, params: { market_id: route.params.market_id, selection_id: param } });
            isNavigating = false;
        }
    } else {
        if (route.name !== routeName || route.params.sid !== param) {
            isNavigating = true;
            await router.push({ name: routeName, params: { sid: param } });
            isNavigating = false;
        }
    }
}

onMounted(() => {
    //console.log('this is execute by onmounted' + route.params.market_id);
});
</script>
<template>
    <div>
        <TabMenu v-model="activeIndex" :model="menuItems"></TabMenu>
        <router-view></router-view>
    </div>
</template>
