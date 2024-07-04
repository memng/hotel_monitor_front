<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import AppFooter from '@/layout/AppFooter.vue';
import NotSupport from '@/views/pages/auth/NotSupport.vue';
import { useLayout } from '@/layout/composables/layout';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import SessionStorageService from '@/service/SessionStorageService';
import { useGlobalConfig } from '@/layout/config/global_config';
import AppSimpleTopbar from '@/simple_layout/AppSimpleTopbar.vue';
import router from '@/router';

const { layoutConfig, layoutState } = useLayout();

const isSupported = ref(true);

const toast = useToast();

const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === 'light',
        'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-ripple-disabled': layoutConfig.ripple.value === false
    };
});

const checkScreenWidth = () => {
    isSupported.value = window.innerWidth > 991;
};

async function refreshToken() {
    try {
        const tokenHttp = await HttpService.post('/api/refreshToken', toast);
        const session = new SessionStorageService();
        session.setToken(tokenHttp.access_token);
    } catch (error) {
        console.error('refresh_token: ' + error.message);
    }
}

let intervalId;
const { refreshTokenIntervalTime } = useGlobalConfig();
onMounted(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    intervalId = setInterval(refreshToken, refreshTokenIntervalTime);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenWidth);
    clearInterval(intervalId);
});

function doPushLogin() {
    router.push({ name: 'maindash' });
}
</script>

<template>
    <Toast />
    <div class="layout-wrapper" :class="containerClass">
        <app-simple-topbar></app-simple-topbar>
        <div class="layout-main-container simple_main" style="margin-left: 0px;">
            <div v-if="isSupported" class="layout-main">
                <router-view></router-view>
                <div class="flex justify-content-center">
                    <Button @click="doPushLogin" label="返回首页" class="p-button-rounded text-xl border-none mt-5 bg-green-500 font-normal text-white line-height-3 px-3"></Button>
                </div>
            </div>
            <div v-else class="layout-main">
                <NotSupport></NotSupport>
                <div class="flex justify-content-center">
                    <Button @click="doPushLogin" label="返回首页" class="p-button-rounded text-xl border-none mt-5 bg-green-500 font-normal text-white line-height-3 px-3"></Button>
                </div>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask"></div>
    </div>
</template>

<style lang="scss" scoped>
.simple_main {
    margin-left: 0;
}
</style>
