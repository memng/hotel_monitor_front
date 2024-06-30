<script setup>
import { shallowRef } from 'vue';
import Profile from './Profile.vue';
import ChangePassword from './ChangePassword.vue';
import Orderlist from './OrderList.vue';
const currentComponent = shallowRef(Profile);
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
    <div class="surface-ground flex justify-content-center main_h_screen min-w-screen overflow-hidden">
        <div class="contact_main mt-6">
            <TabMenu :model="menuItems"></TabMenu>
            <component :is="currentComponent"></component>
        </div>
    </div>
</template>
<style scoped>
.contact_main {
    width: 992px;
}
.main_h_screen {
    min-height: 70vh;
}
</style>
