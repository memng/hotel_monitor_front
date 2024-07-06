<script setup>
import router from '@/router';
function doPushLogin() {
    router.push({ name: 'login' });
}
</script>
<template>
    <div
        id="hero"
        class="flex flex-column pt-4 px-4 lg:px-8 min-w-screen overflow-hidden"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-4 md:mx-8 mt-0 md:mt-4">
            <h1 class="text-6xl font-bold text-gray-900 line-height-2">精准、可靠、稳定的必发交易所数据</h1>
            <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">精准还原每一笔必发交易，精确到毫秒</p>
            <Button @click="doPushLogin" label="免费体验" class="p-button-rounded text-xl border-none mt-5 bg-green-500 font-normal text-white line-height-3 px-3"></Button>
        </div>
        <div class="flex justify-content-center md:justify-content-end">
            <img src="/demo/bf/raw_graph.png" alt="Hero Image" class="w-9 md:w-auto top_raw_graph" />
        </div>
    </div>

    <div id="highlights" class="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
        <div class="text-center">
            <h2 class="text-900 font-normal mb-2">专业图表数据</h2>
            <span class="text-600 text-2xl">祝你一臂之力</span>
        </div>

        <div class="grid mt-8 pb-2 md:pb-8">
            <div class="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0" style="border-radius: 8px">
                <img src="/demo/bf/k_line.png" class="w-11 main_item"  alt="mockup mobile" />
            </div>

            <div class="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
                <div class="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">成交挂单图</h2>
                <span class="text-700 text-2xl line-height-3 ml-0 md:ml-2" style="max-width: 650px"
                    >精确还原订单成交时的挂单现场，对于分析主力意图和玩家态度具有重要意义</span
                >
            </div>
        </div>

        <div class="grid my-8 pt-2 md:pt-8">
            <div class="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                <div class="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">北单偏离</h2>
                <span class="text-700 text-2xl line-height-3 mr-0 md:mr-2" style="max-width: 650px"
                    >比较北单玩家对打出支持百分比和欧赔公司设定的支持百分比，从而得出欧赔公司对打出态度。适用次级联赛</span
                >
            </div>

            <div class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style="border-radius: 8px">
                <img src="/demo/bf/bd.png" class="w-11 main_item" alt="mockup" />
            </div>
        </div>

        <div class="grid mt-8 pb-2 md:pb-8">
            <div class="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0" style="border-radius: 8px">
                <img src="/demo/bf/raw_graph_stat.png"  class="w-11 main_item" alt="mockup mobile" />
            </div>

            <div class="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
                <div class="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">自定义时间段原图统计</h2>
                <span class="text-700 text-2xl line-height-3 ml-0 md:ml-2" style="max-width: 650px"
                    >自定义时间段统计原图买卖双方的量和差值，对分析玩家态度有重要意义。适用于五大联赛等成交量较大比赛</span
                >
            </div>
        </div>

        <div class="grid my-8 pt-2 md:pt-8">
            <div class="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                <div class="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">欧赔走势图表</h2>
                <span class="text-700 text-2xl line-height-3 mr-0 md:mr-2" style="max-width: 650px"
                    >结合玩家态度，可分析欧赔公司的调整方向和目的</span
                >
            </div>

            <div class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style="border-radius: 8px">
                <img src="/demo/bf/odds.png" class="w-11 main_item" alt="mockup" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.top_raw_graph {
    max-width: 609px !important;
    height: auto;
}
.main_item {
    max-width: 530px;
    height: auto;
}
</style>