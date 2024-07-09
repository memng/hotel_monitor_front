<script setup>
import { useLayout } from '@/layout/composables/layout';
import router from '@/router';
import { computed, nextTick, ref } from 'vue';

const { layoutConfig } = useLayout();
const isMenuVisible = ref(false); 

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const closeMenu = () => {
    isMenuVisible.value = false;
};

const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
};

const navToLogin = () => {
    closeMenu();
    nextTick(() => {
        router.push('/index/login');
    });
};

const navToReg = () => {
    closeMenu();
    nextTick(() => {
        router.push('/index/reg');
    });
};

const navToHome = () => {
    closeMenu();
    nextTick(() => {
        router.push('/index/home');
    });
};

const navToPrice = () => {
    closeMenu();
    nextTick(() => {
        router.push('/index/price');
    });
};

const navToFaq = () => {
    closeMenu();
    nextTick(() => {
        router.push('/index/faq');
    });
};

const navToContact = () => {
    closeMenu();
    nextTick(() => {
        router.push('/index/contact');
    });
};
const navToCategory = (id) => {
    closeMenu();
    nextTick(() => {
        router.push(`/index/category/${id}`);
    });
};

</script>
<template>
    <Toast :baseZIndex="100" />
    <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
        <a class="flex align-items-center" href="#"> <img :src="logoUrl" alt="Sakai Logo" height="50" class="mr-0 lg:mr-2" /><span class="text-900 white-space-nowrap font-medium text-2xl line-height-3 mr-8">bf-data</span> </a>
        <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple @click="toggleMenu">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div class="index_top_menu-container align-items-center surface-0 flex-grow-1 justify-content-between lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px" v-show="isMenuVisible">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                <li>
                    <a href="/index/home" @click.prevent="navToHome" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>首页</span>
                    </a>
                </li>
                <li>
                    <a href="/index/price" @click.prevent="navToPrice"  class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>价格</span>
                    </a>
                </li>
                <li>
                    <a href="/index/category/1" @click.prevent="navToCategory(1)" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>网站使用</span>
                    </a>
                </li>
                <li>
                    <a href="/index/category/2" @click.prevent="navToCategory(2)" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>必发分析</span>
                    </a>
                </li>
                <li>
                    <a href="/index/faq" @click.prevent="navToFaq" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                        <span>常见问题</span>
                    </a>
                </li>
                <li>
                    <a href="/index/contact" @click.prevent="navToContact" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
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
<style scoped>

/* Media query to handle large screens */
@media (min-width: 1024px) {
    .index_top_menu-container {
        display: flex !important;
    }
}
</style>