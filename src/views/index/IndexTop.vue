<script setup>
import { useLayout } from '@/layout/composables/layout';
import router from '@/router';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const navToLogin = () => {
    router.push('/index/login');
}

const navToReg = () => {
    router.push('/index/reg');
}
</script>
<template>
    <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
        <a class="flex align-items-center" href="#"> <img :src="logoUrl" alt="Sakai Logo" height="50" class="mr-0 lg:mr-2" /><span class="text-900 white-space-nowrap font-medium text-2xl line-height-3 mr-8">bf-data</span> </a>
        <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                <li>
                    <a href="/index/home" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>首页</span>
                    </a>
                </li>
                <li>
                    <a href="/index/price" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>价格</span>
                    </a>
                </li>
                <li>
                    <a href="/index/faq" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>faq</span>
                    </a>
                </li>
                <li>
                    <a href="/index/contact" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>联系我们</span>
                    </a>
                </li>
            </ul>
            <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                <Button @click="navToLogin" label="登录" class="p-button-text p-button-rounded border-none font-light line-height-2 text-green-500"></Button>
                <Button @click="navToReg" label="注册" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-green-500"></Button>
            </div>
        </div>
    </div>
</template>