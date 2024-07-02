<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
const props = defineProps({
    sid: {
        type: Number,
        required: true
    }
});
const toast = useToast();
const chat1 = ref();
const chat2 = ref();
const chat3 = ref();
const loading = ref(false);
let myChart1;
let myChart2;
let myChart3;

onMounted(() => {
    myChart1 = echarts.init(chat1.value);
    myChart2 = echarts.init(chat2.value);
    myChart3 = echarts.init(chat3.value);
});

onMounted(async () => {
    try {
        const loadData = await initData();
        initChat(loadData[0].info, loadData[0].data, myChart1);
        initChat(loadData[1].info, loadData[1].data, myChart2);
        initChat(loadData[2].info, loadData[2].data, myChart3);
    } catch (error) {
        console.error('initOddsChat:' + error.message);
    }
});
async function refreshChat() {
    try {
        const loadData = await initData();
        initChat(loadData[0].info, loadData[0].data, myChart1);
        initChat(loadData[1].info, loadData[1].data, myChart2);
        initChat(loadData[2].info, loadData[2].data, myChart3);
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
    } catch (error) {
        console.error('refreshOddsChat:' + error.message);
    }
}

async function initData() {
    loading.value = true;
    try {
        return await HttpService.get('/api/getOdds', toast, { sid: props.sid });
    } finally {
        loading.value = false;
    }
}

function initChat(info, myData, myChart) {
     // 定义图表的配置项
     var option = {
        title: {
            text: info + 'odds走势'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow' // 显示阴影
            },
            formatter: function (params) {
                var dataIndex = params[0].dataIndex;
                var sp = myData[dataIndex]['avg_sp'];
                var datetime = myData[dataIndex]['create_time'];
                return `sp: ${sp}<br>create_time: ${datetime}`;
            }
        },
        legend: {
            data: ['sp']
        },
        xAxis: {
            type: 'category',
            data: myData.map((item) => item.create_time)
        },
        yAxis: {
            type: 'value',
            min: Math.min.apply(
                null,
                myData.map((item) => item.avg_sp)
            ),
            interval: 0.1,
            axisLabel: {
                interval: 'auto' // 刻度间隔为0.2
            }
        },
        dataZoom: [
            { // 第一个 dataZoom 组件
                type: 'slider',
                start: 50,
                end: 100,
                xAxisIndex: [0] // 表示这个 dataZoom 组件控制 第一个 和 第三个 xAxis
            },
            {
                type: 'inside',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: 'sp',
                type: 'line',
                data: myData.map((item) => item.avg_sp)
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);
}

</script>

<template>
    <div class="flex flex-row justify-content-center">
        <Button class="ml-6" icon="pi pi-refresh" label="刷新" @click="refreshChat"></Button>
    </div>
    <div v-if="loading" class="odds_loading">
        <div class="spinner_container">
            <ProgressSpinner />
        </div>
    </div>
    <div v-show="!loading" class="flex flex-column">
        <div ref="chat1" class="flex m-2 odds_chat"></div>
        <div ref="chat2" class="flex m-2 odds_chat"></div>
        <div ref="chat3" class="flex m-2 odds_chat"></div>
    </div>
</template>

<style lang="scss">
.odds_chat {
    width: 100%;
    height: 400px;
}
.odds_loading {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.spinner_container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>