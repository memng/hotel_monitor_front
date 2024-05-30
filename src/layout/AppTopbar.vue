<script setup>
import { computed, onBeforeMount, ref, onMounted, onUnmounted } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useToast } from 'primevue/usetoast';
import SessionStorageService from '@/service/SessionStorageService';
import HttpService from '@/service/HttpService';
import moment from 'moment';
import { useRangMenu } from './global_state/topbar_menu';
const { layoutConfig, onMenuToggle } = useLayout();
const { items, currentMenu } = useRangMenu();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const menu = ref();
const toast = useToast();
const sssObj = new SessionStorageService();

const buttonLabel = computed(() => {
    let start_date = currentMenu.start_date;
    let end_date = currentMenu.end_date;

    if (isDateString(currentMenu.start_date)) {
        start_date = moment(currentMenu.start_date, 'YYYY-MM-DD').format('YY.MM.DD');
    }
    if (isDateString(currentMenu.end_date)) {
        end_date = moment(currentMenu.end_date, 'YYYY-MM-DD').format('YY.MM.DD');
    }
    return start_date + '-' + end_date;
});

onBeforeMount(() => {
    const rangeConfig = sssObj.getConfig();
    setCurrentMenuItem(rangeConfig);
    watchRangeConfig(rangeConfig);
});

let intervalId;

onMounted(() => {
    intervalId = setInterval(refreshConfig, 6 * 60 * 60 * 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

async function refreshConfig(){
    const configRequest = await HttpService.post('/api/refreshConfig', toast);
    const config = configRequest.config;
    const storeConfig = sssObj.getConfig();
    if (JSON.stringify(config) === JSON.stringify(storeConfig)) {
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
    rangeConfig.forEach((element) => {
        let start_date = element.start_date;
        let end_date = element.end_date;

        if (isDateString(element.start_date)) {
            start_date = moment(element.start_date, 'YYYY-MM-DD').format('YY.MM.DD');
        }
        if (isDateString(element.end_date)) {
            end_date = moment(element.end_date, 'YYYY-MM-DD').format('YY.MM.DD');
        }

        items.value.push({
            id: element.id,
            label: start_date + '-' + end_date,
            command: (menuItem) => {
                // 执行你的操作，比如显示 toast
                switchCurrentMenuItem(menuItem.item.id, rangeConfig);
            }
        });
    });
}
function switchCurrentMenuItem(itemId, rangeConfig){
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
    moment(str, 'YYYY-MM-DD', true).isValid();
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
    </div>
</template>

<style lang="scss">
.topbar_range_button {
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 5px;
    padding-bottom: 5px; 
}
</style>
