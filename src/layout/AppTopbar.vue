<script setup>
import { computed } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { layoutConfig, onMenuToggle } = useLayout();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const items = [
    {
        label: 'Update',
    },
    {
        label: 'Update',
    },
    {
        label: 'Update',
    },
];

const defaultButtonProps = {
    class: 'range_button'
};

const menuButtonProps = {
    class: 'range_button_menu'
};

</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>bf-data</span>
        </router-link>

        <div class="flex justify-content-center">
            <SplitButton label="23.11.01-24.05.11" icon="pi pi-check" menuButtonIcon="pi pi-cog" @click="save" :model="items" :buttonProps="defaultButtonProps" :menuButtonProps="menuButtonProps" />
        </div>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>
    </div>
</template>

<style lang="scss">
.range_button {
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 5px;
    padding-bottom: 5px; 
}
.range_button_menu {
    width: 26px;
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>
