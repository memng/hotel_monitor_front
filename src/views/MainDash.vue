<script setup>
import MainView from '@/views/MainView.vue';
import { useMenuTab } from '@/layout/global_state/selection_tab';
const { selectedTabId } = useMenuTab();

</script>

<template>
    <main-view :key="selectedTabId" :market_id="selectedTabId"></main-view>
</template>