<script setup>
import { ref, onMounted, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import moment from 'moment';

const loading = ref(false);
const loadData = ref([]);
const uniqueCheckDate = ref([]);
const uniqueRoom = ref([]);
const uniqueUser = ref([]);
const uniqueType = ref([]);

const toast = useToast();
const confirm = useConfirm();

const editVisible = ref(false);
const editId = ref(false);

const countryList = ref([]);
const cityList = ref([]);
const hotelList = ref([]);

const staffList = ref([]);
const roomTypeList = ref([]);
const typeList = ref([]);
const noticeIntervalList = ref([]);

const selectCountry = ref();
const selectCity = ref();
const selectHotel = ref();

const selectStaffId = ref();
const selectRoomTypetId = ref();
const selectTypeId = ref();
const selectCheckDate = ref();
const selectNoticeInterval = ref();

const countryLoading = ref(false);
const cityLoading = ref(false);
const hotelLoading = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'hotel.Name_CN': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    check_date: { value: null, matchMode: FilterMatchMode.IN },
    'room_type.adult_count': { value: null, matchMode: FilterMatchMode.IN },
    'staff.user_name': { value: null, matchMode: FilterMatchMode.EQUALS },
    'type.value': { value: null, matchMode: FilterMatchMode.EQUALS }
});

onMounted(async () => {
    try {
        loadData.value = await initData();

        const loadCommonData = await initCommonData();
        countryList.value = loadCommonData.countryListResult;
        staffList.value = loadCommonData.commonConfig.staff;
        roomTypeList.value = loadCommonData.commonConfig.room_type;
        typeList.value = loadCommonData.commonConfig.type;
        noticeIntervalList.value = loadCommonData.commonConfig.notice_interval;

        uniqueCheckDate.value = [...new Set(loadData.value.map((item) => item.check_date))].map((date) => ({ value: date }));
        uniqueRoom.value = [...new Set(loadData.value.map((item) => item.room_type.adult_count))].map((a_count) => ({ value: a_count }));
        uniqueUser.value = [...new Set(loadData.value.map((item) => item.staff.user_name))].map((a_count) => ({ value: a_count }));
        uniqueType.value = [...new Set(loadData.value.map((item) => item.type.value))].map((a_count) => ({ value: a_count }));
    } catch (error) {
        console.error('init tabel data error:' + error.message);
    }
});

async function initData() {
    loading.value = true;
    try {
        const fetchRersultData = await HttpService.get('/api/monitorList/query', toast);
        return fetchRersultData;
    } finally {
        loading.value = false;
    }
}

async function initCommonData() {
    countryLoading.value = true;
    try {
        const countryListResult = transformEmptyObjectToArray(await HttpService.get('/api/getCountryList', toast));
        const commonConfig = transformEmptyObjectToArray(await HttpService.get('/api/getStaffAndRoomType', toast));
        return {
            countryListResult,
            commonConfig
        };
    } finally {
        countryLoading.value = false;
    }
}

watch(selectCountry, async (newValue) => {
    cityLoading.value = true;
    try {
        cityList.value = transformEmptyObjectToArray(await HttpService.get('/api/getCityByCountryCode', toast, { CountryCode: newValue }));
        hotelList.value = [];
        selectCity.value = undefined;
        selectHotel.value = undefined;
    } finally {
        cityLoading.value = false;
    }
});

watch(selectCity, async (newValue) => {
    hotelLoading.value = true;
    try {
        hotelList.value = transformEmptyObjectToArray(await HttpService.get('/api/getHotelByCode', toast, { CountryCode: selectCountry.value, CityCode: newValue }));
        selectHotel.value = undefined;
    } finally {
        hotelLoading.value = false;
    }
});

function transformEmptyObjectToArray(data) {
    if (typeof data === 'object' && !Array.isArray(data) && data !== null && Object.keys(data).length === 0) {
        return [];
    }
    return data;
}

const deleteItem = (id) => {
    confirm.require({
        message: '确定删除这条记录么?',
        header: '删除',
        icon: 'pi pi-info-circle',
        rejectLabel: '取消',
        acceptLabel: '删除',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: async () => {
            try {
                const deleteResult = await HttpService.post('/api/monitorList/delete', toast, { id });
                if (deleteResult === 1) {
                    toast.add({ severity: 'success', summary: '成功', detail: '删除成功', life: 3000 });
                    loadData.value = await initData();
                }
            } catch (error) {
                console.log('delete item error' + id + error.message);
            }
        },
        reject: () => {}
    });
};

const editItem = (id) => {
    const editItem = loadData.value.find((item) => item.id === id);
    if (editItem) {
        editVisible.value = true;
        editId.value = editItem.id;

        selectHotel.value = editItem.hotel.Name_CN;
        selectRoomTypetId.value = editItem.room_type.id;
        selectCheckDate.value = editItem.check_date;
        selectStaffId.value = editItem.staff.id;
        selectTypeId.value = editItem.type.id;
        selectNoticeInterval.value = editItem.interval.save;
    }
};

async function submitForm() {
    if (selectHotel.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '酒店数据不能为空',
            life: 5000
        });
        return;
    }
    if (selectCheckDate.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '日期不能为空',
            life: 5000
        });
        return;
    }
    if (selectRoomTypetId.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '人数不能为空',
            life: 5000
        });
        return;
    }
    if (selectStaffId.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '监控人不能为空',
            life: 5000
        });
        return;
    }
    if (selectTypeId.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '类型不能为空',
            life: 5000
        });
        return;
    }
    if (selectNoticeInterval.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '提醒间隔不能为空',
            life: 5000
        });
        return;
    }
    const arrays = [selectHotel.value, selectCheckDate.value, selectRoomTypetId.value];
    const count = arrays.filter((arr) => arr.length > 1).length;
    if (count >= 2) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '酒店、日期、人数只允许一组数据多选',
            life: 5000
        });
        return;
    }
    try {
        const params = {
            id: editId.value,
            room_type_id: selectRoomTypetId.value,
            check_date: moment(selectCheckDate.value).format('YYYY-MM-DD'),
            monitor_user_id: selectStaffId.value,
            monitor_type: selectTypeId.value,
            notice_interval: selectNoticeInterval.value
        };
        const postResult = await HttpService.post('/api/monitorList/edit', toast, params);
        if (postResult === 1) {
            toast.add({
                severity: 'success',
                summary: '成功',
                detail: '编辑成功',
                life: 5000
            });
            loadData.value = await initData();
            editVisible.value = false;
        }
    } catch (error) {
        console.log('edit monitor list error' + error.message);
    }
}

function cancleForm() {
    editVisible.value = false;
}
</script>

<template>
    <ConfirmDialog></ConfirmDialog>
    <div class="card">
        <DataTable v-model:filters="filters" :value="loadData" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="loading" :globalFilterFields="['hotel.Name_CN', 'check_date', 'staff.user_name']">
            <template #header>
                <div class="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="输入关键词搜索" />
                    </IconField>
                    <router-link to="/add" rel="noopener">
                        <Button class="ml-2" label="新增监控" />
                    </router-link>
                </div>
            </template>
            <template #empty>没有记录 </template>
            <template #loading> 加载中，请稍等 </template>
            <Column field="hotel.Name_CN" filterField="hotel.Name_CN" header="酒店名称" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.hotel.Name_CN }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column header="入住日期" field="check_date" filterField="check_date" style="min-width: 12rem" :showFilterMenu="false">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.check_date }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="uniqueCheckDate" optionValue="value" optionLabel="value" @change="filterCallback()" placeholder="选择日期" class="p-column-filter" style="min-width: 14rem" :maxSelectedLabels="1"> </MultiSelect>
                </template>
            </Column>
            <Column header="人数" field="room_type.adult_count" filterField="room_type.adult_count" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.room_type.adult_count }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" :options="uniqueRoom" optionValue="value" optionLabel="value" @change="filterCallback()" placeholder="选择人数" class="p-column-filter" style="min-width: 14rem" :maxSelectedLabels="1"> </MultiSelect>
                </template>
            </Column>
            <Column header="监控人" field="staff.user_name" filterField="staff.user_name" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <span> {{ data.staff.user_name }} </span>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="uniqueUser" optionValue="value" optionLabel="value" placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true"></Dropdown>
                </template>
            </Column>
            <Column header="类型" field="type.value" filterField="type.value" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <span> {{ data.type.value }} </span>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="uniqueType" optionValue="value" optionLabel="value" placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true"></Dropdown>
                </template>
            </Column>
            <Column header="通知间隔" field="interval.show" style="min-width: 6rem">
                <template #body="{ data }">
                    <span> {{ data.interval.show }} </span>
                </template>
            </Column>
            <Column header="操作" style="min-width: 6rem">
                <template #body="{ data }">
                    <Button @click="editItem(data.id)" label="编辑" outlined></Button>
                    <Button @click="deleteItem(data.id)" label="删除" severity="danger" outlined></Button>
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="editVisible" header="编辑" :style="{ width: '50rem' }">
            <div class="field grid">
                <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">酒店</label>
                <div class="col-12 md:col-10">
                    <InputText v-model="selectHotel" disabled />
                </div>
            </div>
            <div class="field grid">
                <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">日期</label>
                <div class="col-12 md:col-10">
                    <Calendar v-model="selectCheckDate" dateFormat="yy-mm-dd" placeholder="选择日期" :manualInput="false" />
                </div>
            </div>
            <div class="field grid">
                <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">人数</label>
                <div class="col-12 md:col-10">
                    <Dropdown v-model="selectRoomTypetId" :options="roomTypeList" optionLabel="adult_count" optionValue="id" placeholder="选择人数" class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="field grid">
                <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">监控人</label>
                <div class="col-12 md:col-10">
                    <Dropdown v-model="selectStaffId" :options="staffList" optionLabel="user_name" optionValue="id" placeholder="选择监控人" class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="field grid">
                <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">类型</label>
                <div class="col-12 md:col-10">
                    <Dropdown v-model="selectTypeId" :options="typeList" optionLabel="value" optionValue="id" placeholder="选择类型" class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="field grid">
                <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">提醒间隔</label>
                <div class="col-12 md:col-10">
                    <Dropdown v-model="selectNoticeInterval" :options="noticeIntervalList" optionLabel="show" optionValue="save" placeholder="选择类型" class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div><Button label="提交" @click="submitForm" /></div>
                <div><Button label="取消" @click="cancleForm" /></div>
            </div>
        </Dialog>
    </div>
</template>
