<script setup>
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import { onMounted, toRefs, watch, ref, shallowRef } from 'vue';
import MainBf from './main/MainBf.vue';
import MainOdds from './main/MainOdds.vue';
import MainBd from './main/MainBd.vue';
import MainNoData from './main/MainNoData.vue';
import _ from 'lodash';

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
const currentComponent = shallowRef();
const currentProps = ref();
//const currntComponentKey = ref();
// watch(activeIndex, (newValue) => {
//     console.log(newValue);
// });

watch(
    market_id,
    async (newValue) => {
        try {
            const marketMenu = await HttpService.get('/api/getMarketMenu', toast, { market_id: newValue });
            if (_.isEmpty(marketMenu)) {
                currentComponent.value = MainNoData;
                currentProps.value = { show_message: '暂时没有本场比赛数据' };
                menuItems.value = [];
                return;
            }
            const foundItem = marketMenu.find((item) => item.default === 1);
            activeIndex.value = marketMenu.findIndex((item) => item.default === 1);
            //console.log(newValue);
            //console.log(activeIndex.value);
            watchMarketMenu(marketMenu);
            if (foundItem.type === 1) {
                currentComponent.value = MainBf;
                currentProps.value = { market_id: newValue, selection_id: foundItem.selection_id };
            } else if (foundItem.type === 2) {
                currentComponent.value = MainOdds;
                currentProps.value = { sid: foundItem.sid };
            } else {
                throw new Error('invalid marketmenu type');
            }
        } catch (error) {
            console.log('load getMarketMenu' + error.message);
        }
    },
    { immediate: true }
);

//watch(currentProps,(newValue) => {console.log(newValue)});

function watchMarketMenu(marketMenu){
    const tmepList = [];
    marketMenu.map((element, index) => {
        //console.log(element);
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
                //console.log(currentComponent.value);
                //console.log(currentProps.value);
            }
        });
    });
    menuItems.value = tmepList;
   // console.log(menuItems.value);
}

onMounted(() => {
    //console.log('this is execute by onmounted' + route.params.market_id);
});
</script>
<template>
    <div>
        <TabMenu v-model:activeIndex="activeIndex" :model="menuItems"></TabMenu>
        <component :is="currentComponent" v-bind="currentProps"></component>
    </div>
</template>
