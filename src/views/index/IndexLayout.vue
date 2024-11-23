<script setup>
//import IndexTop from './IndexTop.vue';
import IndexBottom from './IndexBottom.vue';
</script>

<template>
    <div class="surface-0 flex justify-content-center">
        <div id="home" class="landing-wrapper overflow-hidden">
            <router-view></router-view>
            <index-bottom></index-bottom>
        </div>
    </div>
</template>
