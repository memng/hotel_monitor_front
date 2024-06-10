<script setup>
import { ref, computed, watch } from 'vue';
import moment from 'moment';
import { useRangMenu } from './global_state/topbar_menu';
import { useMenuTab } from './global_state/selection_tab';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import router from '@/router';

const toast = useToast();
const eventDataRaw = ref([]);
const showFilterButton = ref(false);

const { currentMenu } = useRangMenu();
const { tabs, selectedTabId } = useMenuTab();

const isDateString = (str) => {
    return moment(str, 'YYYY-MM-DD', true).isValid();
}
const minDate = computed(() => {
    return moment(currentMenu.value.start_date).toDate();
});
const maxDate = computed(() => {
    return isDateString(currentMenu.value.end_date) ? moment(currentMenu.value.end_date).toDate() : null;
});
const initDate = computed(() => {
    return isDateString(currentMenu.value.end_date) ? moment().format('YYYY-MM-DD') : moment(currentMenu.value.start_date).format('YYYY-MM-DD');
});

const date = ref(initDate.value);
const selectedNames = ref([]);

watch(
    date,
    async (newValue) => {
        try {
            eventDataRaw.value = await HttpService.get('/api/getEventByDate', toast, { date: newValue });
            showFilterButton.value = true;
            selectedNames.value = (() => {
                const names = eventDataRaw.value.map((compition) => compition.compition_name);
                return [...new Set(names)];
            })();
        } catch (error) {
            console.log('load event data error:' + error.message);
        }
    },
    { immediate: true }
);
watch(initDate, (newValue) => {
    date.value = newValue;
});

//弹窗相关
const showDialog = ref(false);
const allSelected = ref(false);
const noneSelected = ref(false);
const reverseSelected = ref(false);

const uniqueNames = computed(() => {
    const names = eventDataRaw.value.map((compition) => compition.compition_name);
    return [...new Set(names)];
});


const filteredCompition = computed(() => {
    return eventDataRaw.value.filter((compition) => selectedNames.value.includes(compition.compition_name));
});

const selectAll = () => {
    selectedNames.value = uniqueNames.value;
    noneSelected.value = false;
    reverseSelected.value = false;
};
const deselectAll = () => {
    selectedNames.value = [];
    allSelected.value = false;
    reverseSelected.value = false;
};

const reverseSelection = () => {
    selectedNames.value = uniqueNames.value.filter((name) => !selectedNames.value.includes(name));
    allSelected.value = false;
    noneSelected.value = false;
};

//选项卡相关
const isTabOpen = (marketId) => tabs.value.some((item) => item.market_id === marketId);
const doCloseTab = (marketId) => {
    const tabLength = tabs.value.length;
    let index = tabs.value.findIndex((element) => element.market_id === marketId);
    if (tabLength > 1) {
        if (index > 0) {
            index--;
        } else {
            index++;
        }
        selectedTabId.value = tabs.value[index].market_id;
        router.push({ name: 'mainview', params: { market_id: tabs.value[index].market_id.replace(/\./g, '_') } });
    } else {
        selectedTabId.value = false;
    }
    tabs.value = tabs.value.filter((tab) => tab.market_id !== marketId);
}
const doOpenTab = (marketId) => {
    if (tabs.value.length > 8) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '打开太多比赛了,请关闭一些', // 假设返回的数据中包含错误消息
            life: 5000
        });
    } else {
        if (!isTabOpen(marketId)) {
            const findItem = filteredCompition.value.find((item) => item.market_id === marketId);
            if (findItem !== undefined) {
                tabs.value.push(findItem);
                selectedTabId.value = findItem.market_id;
                //console.log(encodeURIComponent(marketId));
                router.push({ name: 'mainview', params: { market_id: marketId.replace(/\./g, '_') } });
            }
        }
    }
}
</script>

<template>
    <Calendar v-model="date" class="side_bar_calender" showIcon :selectOtherMonths="true" :minDate="minDate" :maxDate="maxDate" dateFormat="yy-mm-dd" placeholder="请先选择一个日期" />
    <Button v-if="showFilterButton" class="ml-5" icon="pi pi-filter" @click="showDialog = true"></Button>
    <Dialog header="按联赛筛选" v-model:visible="showDialog" :style="{ width: '50vw' }" closable :modal="true" :dismissable-mask="true">
        <div>
            <div class="card flex flex-wrap justify-content-center gap-3">
                <div class="flex align-items-center" v-for="name in uniqueNames" :key="name">
                    <Checkbox v-model="selectedNames" :inputId="name" :value="name" />
                    <label :for="name" class="ml-2"> {{ name }} </label>
                </div>
            </div>
            <div class="card flex flex-wrap justify-content-center gap-3">
                <Checkbox v-model="allSelected" @change="selectAll"  inputId="allSelected" value="全选" />
                <label for="allSelected" class="ml-2">全选</label>
                <Checkbox v-model="noneSelected" @change="deselectAll" inputId="noneSelected" value="全不选" />
                <label for="noneSelected" class="ml-2">全不选</label>
                <Checkbox v-model="reverseSelected" @change="reverseSelection" inputId="reverseSelected" value="反选" />
                <label for="reverseSelected" class="ml-2">反选</label>
            </div>
        </div>
    </Dialog>
    <div v-for="match in filteredCompition" :key="match.market_id" class="match-card">
        <Card pt:body:class="pl-0 pr-0">
            <template #content>
                <div class="flex flex-row justify-content-between align-items-center">
                    <div class="flex flex-column row-gap-1" >
                        <div>
                            <div class="flex align-items-center overflow-hidden white-space-nowrap text-overflow-ellipsis side_bar_compition">
                                <div class="border-double pl-1 pr-1">{{ match.compition_name }}</div> 
                                <div class="ml-1 sider_bar_team_name">{{ match.host_name }}VS{{ match.guest_name }}这是测试数据</div>
                            </div>
                        </div>
                        <div>
                            <span>开赛时间: {{ match.compition_time }}</span>
                        </div>
                    </div>
                    <div>
                        <Button class="ml-2 side_bar_op_button" v-if="isTabOpen(match.market_id)" @click="doCloseTab(match.market_id)">关闭</Button>
                        <Button class="ml-2 side_bar_op_button" v-else @click="doOpenTab(match.market_id)">打开</Button>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style lang="scss">
.match-card {
    margin-bottom: 0.25rem;
}
.side_bar_calender {
    width: 180px;
}
.side_bar_compition {
    width: 190px;
}
.side_bar_op_button {
    padding: 4px;
    margin-right: 5px;
}
.sider_bar_team_name {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
