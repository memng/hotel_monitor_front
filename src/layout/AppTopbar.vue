<script setup>
import { computed, ref } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import SessionStorageService from '@/service/SessionStorageService';
import moment from 'moment';
const { layoutConfig, onMenuToggle } = useLayout();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
const sssObj = new SessionStorageService();
const rangeConfig = sssObj.getConfig();
const items = [];
rangeConfig.array.forEach((element) => {
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
        command:(menuItem) => {
            // 执行你的操作，比如显示 toast
            console.log(menuItem.item.id);
        }
    });
});
function isDateString(str) {
    return moment(str, 'YYYY-MM-DD', true).isValid();
}
const menu = ref();
// const items = ref([
//     {
//         label: '实时数据请选择至live',
//         items: [
//             {
//                 label: 'Refresh',
//                 icon: 'pi pi-refresh',
//                 command: () => {}
//             },
//             {
//                 label: 'Export',
//                 icon: 'pi pi-upload'
//             }
//         ]
//     }
// ]);

const toggle = (event) => {
    menu.value.toggle(event);
};

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
