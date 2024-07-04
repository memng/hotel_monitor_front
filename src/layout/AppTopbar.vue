<script setup>
import { computed, onBeforeMount, ref, onMounted, onUnmounted, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import SessionStorageService from '@/service/SessionStorageService';
import HttpService from '@/service/HttpService';
import moment from 'moment';
import { useRangMenu } from '@/layout/global_state/topbar_menu';
import { useMenuTab } from '@/layout/global_state/selection_tab';
import { useGlobalConfig } from '@/layout/config/global_config';
import { useConfirm } from 'primevue/useconfirm';

import _ from 'lodash';
const { layoutConfig, onMenuToggle } = useLayout();
const { items, currentMenu } = useRangMenu();
const { tabs, selectedTabId } = useMenuTab();
const confirm = useConfirm();


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
    const currentMenuStore = sssObj.getCurrentMenuItem();
    if (_.isEmpty(currentMenuStore)) {
        setCurrentMenuItem(rangeConfig);
    } else {
        loadCurrentMenuItem(currentMenuStore);
    }
    watchRangeConfig(rangeConfig);
});

let intervalId;
const { refreshConfigIntervalTime } = useGlobalConfig();

const clearTabs = (event) => {
    if (event.key === sssObj.currentMenuItem) {
        initMenu();
    }
}

function initMenu() {
    tabs.value = [];
    selectedTabId.value = false;
    loadCurrentMenuItem(sssObj.getCurrentMenuItem());
}

onMounted(() => {
    intervalId = setInterval(refreshConfig, refreshConfigIntervalTime);
    //currentMenuItem变化时，清空tabs;
    window.addEventListener('storage', clearTabs);
});

onUnmounted(() => {
    clearInterval(intervalId);
    window.removeEventListener('storage', clearTabs);
});

async function refreshConfig() {
    try {
        const configRequest = await HttpService.post('/api/refreshConfig', toast);
        const config = configRequest.config;
        const storeConfig = sssObj.getConfig();
        if (JSON.stringify(config) !== JSON.stringify(storeConfig)) {
            sssObj.setConfig(config);
            setCurrentMenuItem(config);
            watchRangeConfig(config);
        }
    } catch (error) {
        console.error('refresh_config: ' + error.message);
    }
}

function setCurrentMenuItem(rangeConfig){
    const defaultItem = rangeConfig.find((item) => item.default === 1);
    sssObj.setCurrentMenuItem(defaultItem);
    initMenu();
}
function loadCurrentMenuItem(currentItem){
    currentMenu.value = currentItem;
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


function showTemplate(confirmMessage) {
    confirm.require({
        group: 'templating',
        header: '温馨提醒',
        message: confirmMessage,
        icon: 'pi pi-exclamation-circle',
        acceptLabel: '去购买',
        rejectLabel: '取消',
        accept: () => {
            router.push({ name: 'goodsintro' });
        },
        reject: () => {}
    });
};

function joinWithComma(str1, str2) {
    if (str1 && str2) {
        return `${str1}、${str2}`;
    } else if (str1) {
        return str1;
    } else if (str2) {
        return str2;
    } else {
        return '';
    }
}

function switchCurrentMenuItem(itemId, rangeConfig) {
    //判断有无切换权限
    const foundItem = rangeConfig.find((item) => item.id === itemId);
    const userInfo = sssObj.getUserInfo();
    const groupId = userInfo.group_id;
    if (foundItem.allow_group_id.includes(groupId)) {
        sssObj.setCurrentMenuItem(foundItem);
        initMenu();
    } else {
        let confirmMessage;
        let partStr1;
        let partStr2;
        if (foundItem.allow_group_id.includes(2)) {
            partStr1 = '专业版';
        }
        if (foundItem.allow_group_id.includes(3)) {
            partStr2 = '高级版';
        }
        confirmMessage = joinWithComma(partStr1, partStr2);
        confirmMessage = `该时间段数据只有${confirmMessage}会员可以查看`;
        showTemplate(confirmMessage);
    }
}
const toggle = (event) => {
    if (menu.value) {
        menu.value.toggle(event);
    }
};
const isDateString = (str) => {
    return moment(str, 'YYYY-MM-DD', true).isValid();
}
watch(
    selectedTabId,
    (newValue) => {
        if (newValue) {
            activeTabIndex.value = tabs.value.findIndex((item) => item.market_id === newValue);
            //router.push({ name: 'mainview', params: { market_id: newValue.replace(/\./g, '_') } });
        }
        //router.push({ name: 'maindash' });
    },
    { immediate: true }
);

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
    } else {
        selectedTabId.value = false;
    }
    tabs.value = tabs.value.filter((tab) => tab.market_id !== marketId);
}
//与右侧个人菜单栏相关
const userInfo = sssObj.getUserInfo();
const userInfoButtonLabel = userInfo.user_name;
const userinfoMenu = ref();
const userInfoItems = [
    {
        label: '个人中心',
        command: () => {
            router.push({ name: 'usercentre' });
        }
    },
    {
        label: '会员续费',
        command: () => {
            router.push({ name: 'goodsintro' });
        }
    },
    {
        label: '退出登录',
        command: () => {
            sssObj.clearAll();
            router.push({ name: 'login' });
        }
    }
];
const toggleUserinfo = (event) => {
    if (userinfoMenu.value) {
        userinfoMenu.value.toggle(event);
    }
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
            <TabMenu :model="tabs" @tab-change="onTabChange" v-model:activeIndex="activeTabIndex" pt:menuitem:class="topbar_tab_item">
                <template #item="{ item }">
                    <a class="p-menuitem-link topbar_tab_link" >
                        <span class="flex flex-row align-items-center p-menuitem-text topbar_tab_item_content">
                            <span class="flex flex-column">
                                <span class="p-1 topbar_tab_word">{{ item.host_name }} </span>
                                <span class="p-1 topbar_tab_word">{{ item.guest_name }}</span>
                            </span>
                            <span>
                                <span class="pi pi-times p-2" @click.stop="doCloseTab(item.market_id)" />
                            </span>
                        </span>
                    </a>
                </template>
            </TabMenu>
        </div>
        <div class="topbar_user">
            <Button class="topbar_userinfo_button" icon="pi pi-angle-down" :label="userInfoButtonLabel" iconPos="right" @click="toggleUserinfo" />
            <Menu ref="userinfoMenu" id="userinfo_menu" :model="userInfoItems" :popup="true" />
        </div>
        <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
                    <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
                    <p>{{ slotProps.message.message }}</p>
                </div>
            </template>
        </ConfirmDialog>
    </div>
</template>

<style lang="scss">
.topbar_range_button {
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 5px;
    padding-bottom: 5px; 
}
.topbar_tab_item {
    max-width: 120px;
    padding: 2px;
}
.topbar_tab_link {
    display: flex;
    width: 100%;
    border: none;
}
.topbar_tab_item_content {
    //width: 60px;
}
.topbar_tab_word {
    width: 100%;
    height: 100%;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.topbar_user {
    margin: 0 0 0 auto;
    padding: 0;
    list-style: none;
    display: flex;
}
</style>
