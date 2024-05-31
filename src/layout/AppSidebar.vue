<script setup>
import { ref, computed, watch } from 'vue';
import moment from 'moment';
import { useRangMenu } from './global_state/topbar_menu';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const eventDataRaw = ref([]);
const showFilterButton = ref(false);

const { currentMenu } = useRangMenu();

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

watch(
    date,
    async (newValue) => {
        try {
            eventDataRaw.value = await HttpService.get('/api/getEventByDate', toast, { date: newValue });
            showFilterButton.value = true;
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
const selectedNames = ref([]);
const allSelected = ref(false);
const noneSelected = ref(false);
const reverseSelected = ref(false);

const uniqueNames = computed(() => {
    const ages = eventDataRaw.value.map((compition) => compition.compition_name);
    return [...new Set(ages)];
});

const filteredCompition = computed(() => {
    // if (selectedNames.value.length === 0) {
    //     return eventDataRaw.value;
    // }
    return eventDataRaw.value.filter((compition) => selectedNames.value.includes(compition.compition_name));
});

watch(filteredCompition, (newValue) => {
  
    console.log(newValue);
});

watch(allSelected, (newValue) => {
    if (newValue) {
        selectedNames.value = uniqueNames.value;
        noneSelected.value = false;
        reverseSelected.value = false;
    }
    //console.log(selectedNames.value);
});

watch(noneSelected, (newValue) => {
    if (newValue) {
        selectedNames.value = [];
        allSelected.value = false;
        reverseSelected.value = false;
    }
});

watch(reverseSelected, (newValue) => {
    if (newValue) {
        selectedNames.value = uniqueNames.value.filter((name) => !selectedNames.value.includes(name));
        allSelected.value = false;
        noneSelected.value = false;
    }
});

// const selectAll = () => {
//     selectedNames.value = uniqueNames.value;
//     allSelected.value = true;
//     noneSelected.value = false;
//     reverseSelected.value = false;
// };
// const deselectAll = () => {
//     selectedNames.value = [];
//     noneSelected.value = true;
//     selectAll.value = false;
//     reverseSelected.value = false;
// };

// const reverseSelection = () => {
//     selectedNames.value = uniqueNames.value.filter((name) => !selectedNames.value.includes(name));
//     reverseSelected.value = true;
//     selectAll.value = false;
//     deselectAll.value = false;
// };
</script>

<template>
    <Calendar v-model="date" :selectOtherMonths="true" :minDate="minDate" :maxDate="maxDate" dateFormat="yy-mm-dd" placeholder="请先选择一个日期" />
    <Button v-if="showFilterButton" label="按联赛筛选" @click="showDialog = true"></Button>
    <Dialog header="按联赛筛选" v-model:visible="showDialog" :style="{ width: '50vw' }" closable :modal="true" :dismissable-mask="true">
        <div>
            <div class="card flex flex-wrap justify-content-center gap-3">
                <div class="flex align-items-center" v-for="name in uniqueNames" :key="name">
                    <Checkbox v-model="selectedNames" :inputId="name" :value="name" />
                    <label :for="name" class="ml-2"> {{ name }} </label>
                </div>
            </div>
            <div class="card flex flex-wrap justify-content-center gap-3">
                <Checkbox v-model="allSelected"  inputId="allSelected" value="全选" />
                <label for="allSelected" class="ml-2">全选</label>
                <Checkbox v-model="noneSelected" inputId="noneSelected" value="全不选" />
                <label for="noneSelected" class="ml-2">全不选</label>
                <Checkbox v-model="reverseSelected"  inputId="reverseSelected" value="反选" />
                <label for="reverseSelected" class="ml-2">反选</label>
            </div>
        </div>
    </Dialog>
    <div v-for="match in filteredCompition" :key="match.market_id" class="match-card">
        <Card>
            <template #title>
                {{ match.compition_name }}
            </template>
            <template #content>
                <div>队伍: {{ match.host_name }} VS {{ match.guest_name }} </div>
                <div>开赛时间: {{ match.compition_time }}</div>
            </template>
        </Card>
    </div>
</template>

<style lang="scss" scoped>
.match-card {
  margin-bottom: 1rem;
}
</style>
