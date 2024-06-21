<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, watch } from 'vue';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';

const chats = ref();
const toast = useToast();
const growthTable = ref();
const selectionName = ref();
const loading = ref(false);
let chartContainer;
let myChart;

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

watch(chats, (newValue) => {
    if (newValue) {
        chartContainer = newValue;
        myChart = echarts.init(chartContainer);
    }
});

onMounted(async () => {
    const loadData = await initData();
    initChat(loadData);
    initGrowthTable();
});

async function refreshChat() {
    const loadData = await initData();
    if (myChart) {
        const option = updateOption(loadData);
        myChart.setOption(option);
        myChart.resize();
    }
    initGrowthTable();
}

async function initGrowthTable() {
    const result = await HttpService.get('/api/getKLineGrowthStat', toast, { market_id: props.market_id, selection_id: props.selection_id });
    growthTable.value = result.growth_stat;
    selectionName.value = result.selection_name;
}

async function initData() {
    loading.value = true;
    try {
        return await HttpService.get('/api/getKLine', toast, { market_id: props.market_id, selection_id: props.selection_id });
    } catch (error) {
        console.error('errer fetch raw data' + error.message);
    } finally {
        loading.value = false;
    }
}

function updateOption(rawData){
    var option;
    // 模拟数据
    var xAxisData = [];
    var seriesData = [];
    var volumeData = [];
    var percentageData = [];
    var closePriceData = [];
    var lastTradeTimeData=[];
    var askListData =[];
    var bidListData=[];

    rawData.forEach(function (item) {
        var dateObject = new Date(item.begin_time);
        // 使用 Date 对象的方法来获取所需的格式
        var formattedDate = dateObject.getMonth() + 1 + '-' + dateObject.getDate() + ' ' + dateObject.getHours() + ':' + dateObject.getMinutes()+ ':' + dateObject.getSeconds();
        xAxisData.push(formattedDate);
        closePriceData.push(item.close_price);
        seriesData.push([
            parseFloat(item.open_price),
            parseFloat(item.close_price),
            parseFloat(item.open_price),
            parseFloat(item.close_price), // 请确保数据中的high_price字段是数值类型
        ]);
        volumeData.push(parseFloat(item.quality));
        lastTradeTimeData.push(item.last_trade_time);
        var askSum = 0;
        var bidSum = 0;
        var askList = JSON.parse(item.ask_list);
        var bidList = JSON.parse(item.bid_list);
        askListData.push(askList.reverse());
        bidListData.push(bidList);
        askList.forEach(function (ask) {
            askSum += ask[1];
        });
        bidList.forEach(function (bid) {
            bidSum += bid[1];
        });
        var percentage = 100 - Math.floor((askSum / (askSum + bidSum)) * 100);
        percentageData.push(percentage);
    });

    // 配置项
    option = {
        title: {
            text: 'K线图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                link: { xAxisIndex: 'all' }
            },
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
            formatter: function (params) {
                var dataIndex = params[0].dataIndex;
                var ask_list = askListData[dataIndex];
                var bid_list = bidListData[dataIndex];
                var paramsData = seriesData[dataIndex];
                var tooltipText = [
                    '时间: ' + xAxisData[dataIndex],
                    '最后成交:' + lastTradeTimeData[dataIndex],
                    '开盘价: ' + paramsData[0],
                    '收盘价: ' + paramsData[1],
                    '增长量: ' + volumeData[dataIndex],
                    '百分比: ' + '买' + (100 - percentageData[dataIndex]) + '/卖' + percentageData[dataIndex]
                ];

                // 添加 ask_list 和 bid_list 数据到 tooltip 中
                tooltipText.push('Ask List:');
                for (var i = 0; i < ask_list.length; i++) {
                    tooltipText.push('价格: ' + ask_list[i][0] + ', 数量: ' + ask_list[i][1]);
                }

                tooltipText.push('Bid List:');
                for (var i = 0; i < bid_list.length; i++) {
                    tooltipText.push('价格: ' + bid_list[i][0] + ', 数量: ' + bid_list[i][1]);
                }

                return tooltipText.join('<br>');
            }
        },
        axisPointer: {
            link: { xAxisIndex: 'all' },
            label: {
                backgroundColor: '#777'
            }
        },
        grid: [{
                left: '10%',
                right: '1%',
                height: '50%'
            },
            {
                left: '10%',
                right: '1%',
                top: '65%',
                height: '10%'
            },
            {
                left: '10%',
                right: '1%',
                top: '80%',
                height: '10%'
            },
        ],
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisLabel: {
                    interval: 'auto', // 根据数据长度显示刻度
                },
                axisPointer: {
                    show: true,
                    value: 0
                },
                splitLine: {
                    show: false
                },
            },
            {
                type: 'category',
                gridIndex: 1,
                data: xAxisData,
                axisLabel: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    value: 0
                },
//                        tooltip: {
//                            trigger: 'axis', // 设置为 'axis' 表示与第一个坐标轴相同的 tooltips
//                            axisPointer: {
//                                type: 'line' // 配置指示线的类型，可以根据需要调整
//                            }
//                        }
            },
            {
                type: 'category',
                gridIndex: 2,
                data: xAxisData,
                axisLabel: {
                    show: false
                },
                axisPointer: {
                    show: true,
                    value: 0
                },
//                        tooltip: {
//                            trigger: 'axis', // 设置为 'axis' 表示与第一个坐标轴相同的 tooltips
//                            axisPointer: {
//                                type: 'line' // 配置指示线的类型，可以根据需要调整
//                            }
//                        }
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                gridIndex: 1,
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false // 隐藏 Y 轴刻度
                }
            },
            {
                gridIndex: 2,
                min: 0, // 设置 Y 轴的最小值为 0
                max: 100, // 设置 Y 轴的最大值为 100
                axisLabel: {
                    show: true
                },
                axisTick: {
                    show: true // 隐藏 Y 轴刻度
                }
            },
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1,2],
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                xAxisIndex: [0, 1,2],
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'K_line',
                type: 'candlestick',
                data: seriesData,
                itemStyle: {
                    color: 'green',     // 下跌时使用红色
                    color0: 'red',   // 上升时使用绿色
                    borderColor: 'green',
                    borderColor0: 'red', 
                    borderColorDoji: '#FFFF00'
                },
                markPoint: {
                    symbol: 'pin',
                    symbolSize: 20,
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ],
                    itemStyle: {
                        color: 'green', // 下跌时使用红色
                        color0: 'red', // 上升时使用绿色
                        borderColor: 'green',
                        borderColor0: 'red', 
                        borderColorDoji: '#FFFF00'
                    },
                }
            },
            {
                name: 'move',
                type: 'line',
                data: closePriceData,
                xAxisIndex: 0,
                yAxisIndex: 0,
                symbol: 'none',
                lineStyle: {
                    type: 'solid', // 设置为实线
                    color: '#FFC602' // 将连接线颜色改为黄色
                },
            },
            {
                name: 'increment',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: volumeData,
                itemStyle: {
                    color: 'red'
                }
            },
            {
                type: 'line',
                data: percentageData,
                xAxisIndex: 2,
                yAxisIndex: 2,
                symbol: 'none',
                areaStyle: {
                    color: '#7BA9F5', // 设置区域填充颜色
                    origin: 'start' // 始终填充上方
                }
            },
            {
                type: 'line',
                data: percentageData,
                xAxisIndex: 2,
                yAxisIndex: 2,
                symbol: 'none',
                areaStyle: {
                    color: '#F2C1DF', // 设置区域填充颜色
                    origin: 'end' // 始终填充下方
                }
            }
        ]
    };
    return option;
}

function initChat(rawData){
    if (!chartContainer || !myChart) {
        return;
    }
    const option = updateOption(rawData);
    myChart.setOption(option);
    let selected = false;
    // 使用配置项显示图表
    chartContainer.addEventListener('mouseover', () => {
        // 创建一个新的点击事件
        let clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        // 触发图表的点击事件
        chartContainer.dispatchEvent(clickEvent);
        // 设置图表元素为焦点
        chartContainer.focus();
        selected = true;
    });
    chartContainer.addEventListener('mouseout', () => {
        selected = false;
    });

    window.addEventListener('keydown', (params) => {
        let nowOption = myChart.getOption();
        let dataIndex = nowOption.xAxis[0].axisPointer.value;
        if (!selected) return;

        switch (params.code) {
            // 左
            case 'ArrowLeft':
                dataIndex = dataIndex > 0 ? --dataIndex : 0;
                params.stopPropagation();
                break;
            // 左
            case 'ArrowRight':
                dataIndex < rawData.length - 1 ? ++dataIndex : rawData.length - 1;
                params.stopPropagation();
                break;
            default:
                break;
        }
        option.xAxis[0].axisPointer.value = dataIndex;
        option.xAxis[1].axisPointer.value = dataIndex;
        option.xAxis[2].axisPointer.value = dataIndex;
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
</script>

<template>
    <div class="flex flex-row justify-content-center align-content-center">
        <!--名称和刷新按钮-->
        <span class="p-2 mr-6 vertical-align-middle">{{ selectionName }}</span>
        <Button class="ml-6" icon="pi pi-refresh" label="刷新" @click="refreshChat"></Button>
    </div>
    <div v-if="loading" class="k_line_loading">
        <div class="spinner_container">
            <ProgressSpinner />
        </div>
    </div>
    <div v-show="!loading">
        <div tabindex="1" class="k_line_chat" ref="chats"></div>
    </div>
    <!--增长统计-->
    <div>
        <DataTable v-if="growthTable !== undefined" :value="growthTable" paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50]" showGridlines tableStyle="min-width: 50rem">
            <Column field="begin_time" header="时间"></Column>
            <Column header="方向">
                <template #body="slotProps">
                    <span v-if="slotProps.data.direction_type === 1">买</span>
                    <span v-else>卖</span>
                </template>
            </Column>
            <Column field="price" header="价位"></Column>
            <Column field="grow_quantity" header="量"></Column>
            <Column header="其他">
                <template #body="slotProps">
                    <span v-if="slotProps.data.symbol === 2" class="text-red-500">可能是重复</span>
                    <span v-else>正常</span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>
.k_line_chat {
    width: 100%;
    height: 600px;
    outline-color: var(--primary-color);
}
.k_line_loading {
    width: 100%;
    height: 600px;
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