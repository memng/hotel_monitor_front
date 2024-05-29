<script setup>
import { computed, ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useToast } from 'primevue/usetoast';
import SessionStorageService from '@/service/SessionStorageService';
import moment from 'moment';
const { layoutConfig, onMenuToggle } = useLayout();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const menu = ref();
const toast = useToast();

const sssObj = new SessionStorageService();
const rangeConfig = sssObj.getConfig();
const items = [];
rangeConfig.forEach((element) => {
    let start_date = element.start_date;
    let end_date = element.end_date;

    if (isDateString(element.start_date)) {
        start_date = moment(element.start_date, 'YYYY-MM-DD').format('YY.MM.DD');
    }
    if (isDateString(element.end_date)) {
        end_date = moment(element.end_date, 'YYYY-MM-DD').format('YY.MM.DD');
    }

    items.push({
        id: element.id,
        label: start_date + '-' + end_date,
        command: (menuItem) => {
            // 执行你的操作，比如显示 toast
            switchCurrentMenuItem(menuItem.item.id);
        }
    });
});
function switchCurrentMenuItem(itemId){
    //判断有无切换权限
    const foundItem = rangeConfig.find((item) => item.id === itemId);
    const userInfo = sssObj.getUserInfo();
    const groupId = userInfo.group_id;
    if (foundItem.allow_group_id.includes(groupId)) {
        sssObj.setCurrentMenuItem(foundItem);
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
            <Button class="topbar_range_button" icon="pi pi-angle-down" label="23.11.01-24.05.11" iconPos="right" @click="toggle" />
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
