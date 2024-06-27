<script setup>
import { ref } from 'vue';
import Profile from './Profile.vue';
import ChangePassword from './ChangePassword.vue';
import Orderlist from './OrderList.vue';
const currentComponent = ref()
const menuItems = [
    {
        id: 1,
        label: '账号信息',
        command: () => {
            currentComponent.value = Profile;
        }
    },
    {
        id: 2,
        label: '修改密码',
        command: () => {
            currentComponent.value = ChangePassword;
        }
    },
    {
        id: 3,
        label: '订单列表',
        command: () => {
            currentComponent.value = Orderlist;
        }
    }
];
</script>

<template>
    <div>
        <TabMenu :model="menuItems"></TabMenu>
        <component :is="currentComponent"></component>
    </div>
</template>
