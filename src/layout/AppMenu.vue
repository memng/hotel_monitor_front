<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import router from '@/router';
import SessionStorageService from '@/service/SessionStorageService';
const sssObj = new SessionStorageService();

const model = ref([
    {
        label: 'Home',
        items: [
            { label: '监控列表', icon: 'pi pi-fw pi-home', to: '/maindash' },
            { label: '新增监控', icon: 'pi pi-fw pi-home', to: '/add' }
        ]
    },
    {
        label: 'Profile',
        items: [
            { label: '修改密码', icon: 'pi pi-fw pi-pencil', to: '/changePassword' },
            {
                label: '退出登录',
                icon: 'pi pi-fw pi-lock',
                command: () => {
                    sssObj.clearAll();
                    router.push({ name: 'login' });
                }
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
