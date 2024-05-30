<script setup>
import { ref } from 'vue';
const date = ref();
</script>

<template>
    <Calendar v-model="date" dateFormat="yy-mm-dd" placeholder="请先选择一个日期" />
</template>

<style lang="scss" scoped></style>
