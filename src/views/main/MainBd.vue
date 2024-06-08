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
const showOther = ref(false);
let myChart1;
let myChart2;
let myChart3;

onMounted(() => {
    myChart1 = echarts.init(chat1.value);
    myChart2 = echarts.init(chat2.value);
    myChart3 = echarts.init(chat3.value);
});

onMounted(async () => {
    const loadData = await initData();
    initChat(loadData.main.info, loadData.main.data, myChart1);
    if (loadData.showOther) {
        initChat(loadData.other[0].info, loadData.other[0].data, myChart2);
        initChat(loadData.other[1].info, loadData.other[1].data, myChart3);
    }
});
async function refreshChat() {
    const loadData = await initData();
    initChat(loadData.main.info, loadData.main.data, myChart1);
    myChart1.resize();
    if (loadData.showOther) {
        initChat(loadData.other[0].info, loadData.other[0].data, myChart2);
        initChat(loadData.other[1].info, loadData.other[1].data, myChart3);
        myChart2.resize();
        myChart3.resize();
    }
}

async function initData() {
    return await HttpService.get('/api/getBd', toast, { sid: props.sid });
}

function initChat(info, myData, myChart) {
    // 定义图表的配置项
    var option = {
        title: {
            text: info + '百分比走势'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross' // 显示阴影
            },
            formatter: function (params) {
                var dataIndex = params[0].dataIndex;
                var sp1 = myData[dataIndex]['Ladbrokes'];
                var sp2 = myData[dataIndex]['William_Hill'];
                var sp3 = myData[dataIndex]['bd'];
                var datetime = myData[dataIndex]['create_time'];
                var diff1 = (sp3 - sp1).toFixed(2);
                var diff2 = (sp3 - sp2).toFixed(2);
                return `相差_Ladb**kes: ${diff1}<br>相差_Wil**_Hill: ${diff2}<br> Ladb**kes: ${sp1}<br>Wil**_Hill: ${sp2}<br>北单: ${sp3}<br>create_time: ${datetime}`;
            }
        },
        legend: {
            data: ['Ladb**kes', 'Wil**_Hill', 'bd']
        },
        xAxis: {
            type: 'category',
            data: myData.map((item) => item.create_time)
        },
        yAxis: {
            type: 'value',
            min: 0,
            interval: 5,
            axisLabel: {
                interval: 'auto' // 刻度间隔为0.2
            }
        },
        dataZoom: [
            {
                // 第一个 dataZoom 组件
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
                name: 'Ladb**kes',
                type: 'line',
                data: myData.map((item) => item.Ladbrokes)
            },
            {
                name: 'Wil**_Hill',
                type: 'line',
                data: myData.map((item) => item.William_Hill)
            },
            {
                name: 'bd',
                type: 'line',
                data: myData.map((item) => item.bd)
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);

    // 注册点击事件，用于控制折线的显示和隐藏
    myChart.on('legendselectchanged', function (params) {
        var selected = params.selected;
        var series = option.series;

        // 更新 series 中每个系列的 show 属性
        for (var i = 0; i < series.length; i++) {
            var seriesName = series[i].name;
            series[i].show = selected[seriesName];
        }

        // 刷新图表
        myChart.setOption(option);
    });
}

</script>

<template>
    <div class="flex flex-row">
        <Button class="ml-6" icon="pi pi-refresh" label="刷新" @click="refreshChat"></Button>
    </div>
    <div class="flex flex-column">
        <div ref="chat1" class="flex m-2 odds_chat"></div>
        <div v-if="showOther" ref="chat2" class="flex m-2 odds_chat"></div>
        <div v-if="showOther" ref="chat3" class="flex m-2 odds_chat"></div>
    </div>
</template>

<style lang="scss">
.bd_chat {
    width: 100%;
    height: 400px;
}
</style>