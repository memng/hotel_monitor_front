<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, computed } from 'vue';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import moment from 'moment';

const props = defineProps({
    market_id: {
        type: String,
        required: true
    },
    selection_id: {
        type: Number,
        required: true
    }
});

const chats = ref();
const toast = useToast();
const datetime24h = ref();
const statData = ref({});
const selectionName = ref();
const amountItem = ref();
const configMap = {
    between0_100_sum: '0-100订单总和',
    between100_1000_sum: '100-1000订单总和',
    between1000_2000_sum: '1000-2000订单总和',
    all_between0_1000_sum: '0-1000订单总和',
    all_between0_2000_sum: '0-2000订单总和',
    between0_100_count: '0-100订单数量',
    between100_1000_count: '100-1000订单数量',
    between1000_2000_count: '1000-2000订单数量',
    all_between0_1000_count: '0-1000订单数量',
    all_between0_2000_count: '0-2000订单数量',

}
const tableData = computed(() => {
    return Object.keys(statData.value).map((key) => {
        return {
            key: configMap[key],
            ...statData.value[key]
        };
    });
})

onMounted(async () => {
    const loadData = await initData();
    initChat(loadData);
    initAmountStat();
});
async function initAmountStat(){
    const result = await HttpService.get('/api/getAmountStat', toast, { market_id: props.market_id, selection_id: props.selection_id });
    amountItem.value = result.amount_stat;
    selectionName.value = result.selection_name; 
}
async function initData(){
    return await HttpService.get('/api/getRawData', toast, { market_id: props.market_id, selection_id: props.selection_id });
}

async function refreshChat() {
    const loadData = await initData();
    initChat(loadData);
}

async function dealSelectDate(dateParam){
    console.log(dateParam);
    console.log(datetime24h.value);
    const params = {
        market_id: props.market_id,
        selection_id: props.selection_id,
    };
    statData.value = await HttpService.get('/api/getRawStat', toast, params);
}

function initChat(data){
    let selected = false;
    // 获取图表容器
    var chartContainer = chats.value;
    if (!chartContainer) {
        return;
    }
    //console.log(chartContainer);
    // 初始化 ECharts 实例
    var myChart = echarts.init(chartContainer);
    var option = updataOption(data);
    // 使用配置项绘制图表
    myChart.setOption(option);
    chartContainer.addEventListener('mouseover', () => {
        selected = true;
    });
    chartContainer.addEventListener('mouseout', () => {
        selected = false;
    });
    window.addEventListener('resize', () => {
        myChart.resize();
    });
    window.addEventListener('keydown', (params) => {
        let nowOption = myChart.getOption();
        let dataIndex = nowOption.xAxis[0].axisPointer.value;
        if (!selected) return;
        switch (params.keyCode) {
            // 左
            case 37:
                dataIndex = dataIndex > 0 ? --dataIndex : 0;
                break;
            // 左
            case 39:
                dataIndex < data.length - 1 ? ++dataIndex : data.length - 1;
                break;
            default:
                break;
        }
        option.xAxis.axisPointer.value = dataIndex;
        option.dataZoom[0]['start'] = nowOption.dataZoom[0]['start'];
        option.dataZoom[0]['end'] = nowOption.dataZoom[0]['end'];
        option.dataZoom[1]['start'] = nowOption.dataZoom[1]['start'];
        option.dataZoom[1]['end'] = nowOption.dataZoom[1]['end'];
        myChart.setOption(option);
        myChart.dispatchAction({
            seriesIndex: 0,
            type: 'showTip',
            dataIndex,
        });
    });
}

function updataOption(data){
    // 提取各列数据
    var rawTimeData = data.map((item) => moment(item.raw_timestamp).format('MM-DD HH:mm:ss.SSS')); 
    var priceData = data.map((item) => item.price);
    var volumeData = data.map((item) => item.volume);
    var propertyData = data.map((item) => item.property);
    var symbolData = data.map((item) => item.symbol);

    // 配置项
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross' // 显示阴影
            },
            formatter: function (params) {
                var dataIndex = params[0].dataIndex;
                var price = priceData[dataIndex];
                var volume = volumeData[dataIndex];
                var datetime = rawTimeData[dataIndex];
                return `Price: ${price}<br>Volume: ${volume}<br>Datetime: ${datetime}`;
            }
        },
        xAxis: {
            type: 'category',
            data: rawTimeData,
            axisLabel: {
                interval: 'auto' // 根据数据自动调整标签显示密度
            },
            axisPointer:{
                value : 0
            }
        },
        yAxis: [
            {
                type: 'value',
                name: 'Price',
                min: 1
            },
            {
                type: 'value',
                name: 'Volume'
            }
        ],
        dataZoom: [
            { // 第一个 dataZoom 组件
                type: 'slider',
                start: 0,
                end: 100,
                // 启用鼠标滚轮缩放
                //zoomLock: false,
                //zoomOnMouseWheel: true,
                xAxisIndex: [0] // 表示这个 dataZoom 组件控制 第一个 和 第三个 xAxis
            },
            {
                type: 'inside',
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'Price',
                type: 'line',
                data: priceData,
                // 设置折线上的点的形状和大小
                symbol: function (value, params) {
                    var symbol = symbolData[params.dataIndex];
                    // 根据symbol值为2的点标记出来
                    if (symbol === 2) {
                        return 'rect';
                    }
                    return 'circle';
                },
                symbolSize: function (value, params) {
                    var symbol = symbolData[params.dataIndex];
                    // 根据symbol值为2的点标记出来
                    if (symbol === 2) {
                        return 12;
                    }
                    return 5;
                }
            },
            {
                name: 'Volume',
                type: 'bar',
                yAxisIndex: 1,
                data: volumeData,
                itemStyle: {
                    color: function (params) {
                        var property = propertyData[params.dataIndex];
                        if (property === 1) {
                            return 'red';
                        } else if (property === 2) {
                            return 'green';
                        } else if (property === 3) {
                            return 'gray';
                        } else if (property === 4) {
                            return 'lightcoral'; // 浅红色
                        } else if (property === 5) {
                            return 'lightgreen'; // 浅绿色
                        }
                    }
                }
            }
        ]
    };
    return option;
}

function calculatePercentageDifference(a1, a2) {
    a1 = parseFloat(a1);
    a2 = parseFloat(a2);
    var difference = a1 - a2;
    var total = a1 + a2;
    var percentageDifference = (difference / total) * 100;
    return percentageDifference.toFixed(1); // 保留一位小数
}
function calculateDiff(a1,a2){
    a1 = parseFloat(a1);
    a2 = parseFloat(a2);
    return (a1 - a2).toFixed(1);
}
</script>

<template>
    <div class="flex flex-row justify-content-center align-content-center">
        <!--名称和刷新按钮-->
        <span class="p-2 mr-6 vertical-align-middle">{{ selectionName }}</span>
        <Button class="ml-6" icon="pi pi-refresh" label="刷新" @click="refreshChat"></Button>
    </div>
    <div class="raw_graph_chat" ref="chats"></div>
    <!--整体统计-->
    <div>
        <DataTable v-if="amountItem !== undefined" :value="amountItem" showGridlines tableStyle="min-width: 50rem">
            <Column field="selection_name" header="队伍"></Column>
            <Column field="amount" header="总量"></Column>
            <Column field="amount_percent" header="总量占比"></Column>
            <Column field="pure_amount" header="总量(3500以下)"></Column>
            <Column field="pure_amount_percent" header="总量占比(3500以下)"></Column>
        </DataTable>
    </div>
    <div class="flex-auto">
        <Calendar
            id="calendar-24h"
            showIcon
            placeholder="选择一个时间段进行统计"
            v-model="datetime24h"
            showTime
            hourFormat="24"
            dateFormat="yy-mm-dd"
            selectionMode="range"
            :selectOtherMonths="true"
            @date-select="dealSelectDate"
            inputClass="raw_graph_time_button"
        />
    </div>
    <div>
        <DataTable v-if="Object.keys(statData) !== 0" :value="tableData" showGridlines tableStyle="min-width: 50rem">
            <Column field="key" header="区间"></Column>
            <Column field="pure_buy" header="买"></Column>
            <Column field="pure_sell" header="卖"></Column>
            <Column header="差值">
                <template #body="slotProps">
                    {{ calculateDiff(slotProps.data.pure_buy, slotProps.data.pure_sell) }}
                </template>
            </Column>
            <Column header="差值百分比">
                <template #body="slotProps">
                    {{ calculatePercentageDifference(slotProps.data.pure_buy, slotProps.data.pure_sell) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<style lang="scss">
.raw_graph_chat {
    width: 100%;
    height: 600px;
}
.raw_graph_time_button {
    width: 400px;
}
</style>