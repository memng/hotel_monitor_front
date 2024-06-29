<script setup>
import MainView from '@/views/MainView.vue';
import { useMenuTab } from '@/layout/global_state/selection_tab';
const { selectedTabId } = useMenuTab();
</script>

<template>
    <div v-if="selectedTabId === false">请选择一场赛事</div>
    <main-view v-else :key="selectedTabId" :market_id="selectedTabId"></main-view>
</template>