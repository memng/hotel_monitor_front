<script setup>
import { computed, ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';
const { layoutConfig } = useLayout();

import router from '@/router';
import SessionStorageService from '@/service/SessionStorageService';
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const sssObj = new SessionStorageService();
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
        <div class="topbar_user">
            <Button class="topbar_userinfo_button" icon="pi pi-angle-down" :label="userInfoButtonLabel" iconPos="right" @click="toggleUserinfo" />
            <Menu ref="userinfoMenu" id="userinfo_menu" :model="userInfoItems" :popup="true" />
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
