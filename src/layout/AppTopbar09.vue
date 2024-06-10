<script setup>
import { computed, onBeforeMount, ref, onMounted, onUnmounted, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import SessionStorageService from '@/service/SessionStorageService';
import HttpService from '@/service/HttpService';
import moment from 'moment';
import { useRangMenu } from './global_state/topbar_menu';
import { useMenuTab } from './global_state/selection_tab';
const { layoutConfig, onMenuToggle } = useLayout();
const { items, currentMenu } = useRangMenu();
const { tabs, selectedTabId } = useMenuTab();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const menu = ref();
const toast = useToast();
const sssObj = new SessionStorageService();
const activeTabIndex = ref();

const buttonLabel = computed(() => {
    let start_date = currentMenu.value.start_date;
    let end_date = currentMenu.value.end_date;

    if (isDateString(currentMenu.value.start_date)) {
        start_date = moment(currentMenu.value.start_date, 'YYYY-MM-DD').format('YY.MM.DD');
    }
    if (isDateString(currentMenu.value.end_date)) {
        end_date = moment(currentMenu.value.end_date, 'YYYY-MM-DD').format('YY.MM.DD');
    }
    return start_date + '-' + end_date;
});

onBeforeMount(() => {
    const rangeConfig = sssObj.getConfig();
    setCurrentMenuItem(rangeConfig);
    watchRangeConfig(rangeConfig);
});

let intervalId;
let intervalTime = 6 * 60 * 60 * 1000;

onMounted(() => {
    intervalId = setInterval(refreshConfig, intervalTime);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

async function refreshConfig(){
    const configRequest = await HttpService.post('/api/refreshConfig', toast);
    const config = configRequest.config;
    const storeConfig = sssObj.getConfig();
    if (JSON.stringify(config) !== JSON.stringify(storeConfig)) {
        sssObj.setConfig(config);
        watchRangeConfig(config);
    }
}

function setCurrentMenuItem(rangeConfig){
    const defaultItem = rangeConfig.find((item) => item.default === 1);
    sssObj.setCurrentMenuItem(defaultItem);
    currentMenu.value = defaultItem;
}

function watchRangeConfig(rangeConfig){
    const tmepList = [];
    rangeConfig.forEach((element) => {
        let start_date = element.start_date;
        let end_date = element.end_date;

        if (isDateString(element.start_date)) {
            start_date = moment(element.start_date, 'YYYY-MM-DD').format('YY.MM.DD');
        }
        if (isDateString(element.end_date)) {
            end_date = moment(element.end_date, 'YYYY-MM-DD').format('YY.MM.DD');
        }

        tmepList.push({
            id: element.id,
            label: start_date + '-' + end_date,
            command: (menuItem) => {
                // 执行你的操作，比如显示 toast
                switchCurrentMenuItem(menuItem.item.id, rangeConfig);
            }
        });
    });
    items.value = tmepList;
}
function switchCurrentMenuItem(itemId, rangeConfig) {
    //判断有无切换权限
    const foundItem = rangeConfig.find((item) => item.id === itemId);
    const userInfo = sssObj.getUserInfo();
    const groupId = userInfo.group_id;
    if (foundItem.allow_group_id.includes(groupId)) {
        sssObj.setCurrentMenuItem(foundItem);
        currentMenu.value = foundItem;
    } else {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '您的会员级别不支持查看该时间段数据', // 假设返回的数据中包含错误消息
            life: 5000
        });
    }
}
const toggle = (event) => {
    menu.value.toggle(event);
};
const isDateString = (str) => {
    return moment(str, 'YYYY-MM-DD', true).isValid();
}
watch(
    selectedTabId,
    (newValue) => {
        if (newValue) {
            activeTabIndex.value = tabs.value.findIndex((item) => item.market_id === newValue);
            router.push({ name: 'mainview', params: { market_id: newValue.replace(/\./g, '_') } });
        }
    },
    { immediate: true }
);
watch(
    tabs,
    (newValue) => {
        if (newValue.length === 0) {
            router.push({ name: 'mainviewempty' });
        }
    },
    { immediate: true }
)

const onTabChange = (event) => {
    selectedTabId.value = tabs.value[event.index].market_id;
} 

const doCloseTab = (marketId) => {
    const tabLength = tabs.value.length;
    let index = tabs.value.findIndex((element) => element.market_id === marketId);
    if (tabLength > 1) {
        if (index > 0) {
            index--;
        } else {
            index++;
        }
        selectedTabId.value = tabs.value[index].market_id;
        router.push({ name: 'mainview', params: { market_id: tabs.value[index].market_id.replace(/\./g, '_') } });
    } else {
        selectedTabId.value = false;
        router.push({ name: 'mainviewempty' });
    }
    tabs.value = tabs.value.filter((tab) => tab.market_id !== marketId);
}

</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>bf-data</span>
        </router-link>

        <div class="flex justify-content-center">
            <Button class="topbar_range_button" icon="pi pi-angle-down" :label="buttonLabel" iconPos="right" @click="toggle" />
            <Menu ref="menu" id="range_menu" :model="items" :popup="true" />
        </div>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <div class="flex justify-content-center">
            <TabView pt:panelContainer:class="topbar_tab_panel" @tab-change="onTabChange" v-model:activeIndex="activeTabIndex">
                <TabPanel v-for="tab in tabs" :key="tab.market_id" >
                    <template #header>
                        <span class="topbar_tab_word">
                            {{ tab.host_name }} sdfsfsdfgdfghdfhfdhdf<br>
                            {{ tab.guest_name }}
                        </span>
                        <Button icon="pi pi-times" class="p-button-rounded p-button-text p-ml-2" @click.stop="doCloseTab(tab.market_id)" />
                    </template>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<style lang="scss">
.topbar_range_button {
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 5px;
    padding-bottom: 5px; 
}
.topbar_tab_panel {
    padding: 0;
}
.topbar_tab_word {
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
