<script setup>
import { ref, onMounted } from 'vue';
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
const uniqueContinuity = ref([]);

const toast = useToast();
const confirm = useConfirm();

const editVisible = ref(false);
const editId = ref(false);

const staffList = ref([]);
const uniqueContinuityList = ref([]);
const typeList = ref([]);
const noticeIntervalList = ref([]);
const roomTypeList = ref([]);

const selectHotel = ref();
const selectStaffId = ref();
const selectTypeId = ref();
const selectCheckDate = ref();
const selectNoticeInterval = ref();
const selectRoomTypetId = ref([]);
const selectContinuityStatus = ref();
const selectCheckOutDate = ref();
const selectCheckInDate = ref();

const roomloading = ref(false);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'hotel.Name_CN': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'staff.user_name': { value: null, matchMode: FilterMatchMode.EQUALS },
    'type.value': { value: null, matchMode: FilterMatchMode.EQUALS },
    'continuity.value': { value: null, matchMode: FilterMatchMode.EQUALS }
});

onMounted(async () => {
    console.log('test');
    try {
        loadData.value = await initData();

        const loadCommonData = await initCommonData();
        staffList.value = loadCommonData.commonConfig.staff;
        uniqueContinuityList.value = loadCommonData.commonConfig.continuity_status;
        typeList.value = loadCommonData.commonConfig.type;
        noticeIntervalList.value = loadCommonData.commonConfig.notice_interval;

        uniqueCheckDate.value = [...new Set(loadData.value.map((item) => item.check_date))].map((date) => ({ value: date }));
        uniqueRoom.value = [...new Set(loadData.value.map((item) => item.room_type.adult_count))].map((a_count) => ({ value: a_count }));
        uniqueUser.value = [...new Set(loadData.value.map((item) => item.staff.user_name))].map((a_count) => ({ value: a_count }));
        uniqueContinuity.value = [...new Set(loadData.value.map((item) => item.continuity_status.value))].map((a_count) => ({ value: a_count }));
    } catch (error) {
        console.error('init tabel data error:' + error.message);
    }
});

async function initData() {
    loading.value = true;
    try {
        const fetchRersultData = transformEmptyObjectToArray(await HttpService.get('/api/monitorList/query', toast));
        return fetchRersultData;
    } finally {
        loading.value = false;
    }
}

async function initCommonData() {
    try {
        const commonConfig = transformEmptyObjectToArray(await HttpService.get('/api/getStaffAndRoomType', toast));
        return {
            commonConfig
        };
    } catch (error) {
        console.log(error.message);
    }
}

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

const editItem = async (id) => {
    const editItem = loadData.value.find((item) => item.id === id);
    if (editItem) {
        editVisible.value = true;
        editId.value = editItem.id;

        roomloading.value = true;
        try {
            roomTypeList.value = transformEmptyObjectToArray(await HttpService.get('/api/getRoomTypeByHotelID', toast, { HotelID: editItem.hotel_id }));
        } finally {
            roomloading.value = false;
        }

        selectHotel.value = editItem.hotel.Name_CN;
        selectRoomTypetId.value = editItem.room_type_id.split(',');
        selectContinuityStatus.value = String(editItem.continuity_status);
        if (selectContinuityStatus.value === '1') {
            selectCheckDate.value = editItem.check_date.split(',').map((item) => moment(item, 'YYYY-MM-DD').toDate());
        } else if (selectContinuityStatus.value === '2') {
            selectCheckInDate.value = moment(editItem.check_date, 'YYYY-MM-DD').toDate();
            selectCheckOutDate.value = moment(editItem.check_out_date, 'YYYY-MM-DD').toDate();
        }
        selectStaffId.value = editItem.staff.id;
        selectTypeId.value = editItem.type.id;
        selectNoticeInterval.value = editItem.interval.save;
    }
};

async function submitForm() {
    if (selectRoomTypetId.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '房型数据不能为空',
            life: 5000
        });
        return;
    }
    if (selectContinuityStatus.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '连续类型不能为空',
            life: 5000
        });
        return;
    }
    if (selectContinuityStatus.value === 1 && selectCheckDate.value === undefined) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '日期不能为空',
            life: 5000
        });
        return;
    }
    if (selectContinuityStatus.value === 2 && (selectCheckOutDate.value === undefined || selectCheckInDate.value === undefined)) {
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '连续类型checkout时间不能为空',
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
    try {
        const params = {
            hotel_id: selectHotel.value,
            room_type_id: selectRoomTypetId.value.join(','),
            monitor_user_id: selectStaffId.value,
            monitor_type: selectTypeId.value,
            notice_interval: selectNoticeInterval.value,
            continuity_status: selectContinuityStatus.value,
        };
        if (selectContinuityStatus.value === '1') {
            const checkDateFormat = selectCheckDate.value.map((item) => moment(item).format('YYYY-MM-DD'));
            params['check_date'] = checkDateFormat.join(',');
        } else {
            params['check_date'] = moment(selectCheckInDate.value).format('YYYY-MM-DD');
            params['check_out_date'] = moment(selectCheckOutDate.value).format('YYYY-MM-DD');
        }
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
        <DataTable v-model:filters="filters" :value="loadData" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="loading" :globalFilterFields="['hotel.Name_CN', 'staff.user_name']">
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
            <Column header="房型" style="min-width: 12rem" :showFilterMenu="false">
                <template #body="{ data }">
                    <div class="flex flex-column align-items-start gap-2">
                        <span v-for="room in data.room_type" :key="room.id" style="display: block;">{{ room.Name_CN }}</span>
                    </div>
                </template>
            </Column>
            <Column header="入住类型" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <span> {{ data.continuity.value }} </span>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown
                        v-model="filterModel.value"
                        @change="filterCallback()"
                        :options="uniqueContinuityList"
                        optionValue="value"
                        optionLabel="value"
                        placeholder="Select One"
                        class="p-column-filter"
                        style="min-width: 12rem"
                        :showClear="true"
                    ></Dropdown>
                </template>
            </Column>
            <Column header="入住日期" style="min-width: 12rem" :showFilterMenu="false">
                <template #body="{ data }">
                    <div class="flex flex-column align-items-start gap-2">
                        <span v-for="date in data.check_date.split(',')" :key="date.trim()" style="display: block;">{{ date.trim() }}</span>
                    </div>
                </template>
            </Column>
            <Column header="退房日期" style="min-width: 12rem" :showFilterMenu="false">
                <template #body="{ data }">
                    <div class="flex flex-column align-items-start gap-2">
                        <span>{{ data.check_out_date }}</span>
                    </div>
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
                <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">房型</label>
                <div class="col-12 md:col-10">
                    <MultiSelect v-model="selectRoomTypetId" filter :loading="roomloading" :options="roomTypeList" optionLabel="Name_CN" optionValue="id" placeholder="选择房型" :maxSelectedLabels="1" class="w-full md:w-20rem mt-2" />
                </div>
            </div>
            <div class="field grid">
                <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">是否连续入住</label>
                <div class="col-12 md:col-10">
                    <RadioButton class="ml-2" v-model="selectContinuityStatus" value="1" inputId="ingredient1" name="pizza" />
                    <label for="ingredient1" class="ml-2">不连续入住</label>

                    <RadioButton class="ml-2" v-model="selectContinuityStatus" value="2" inputId="ingredient1" name="pizza" />
                    <label for="ingredient1" class="ml-2">连续入住</label>
                </div>
            </div>
            <div v-if="selectContinuityStatus === '1'" class="field grid">
                <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">选择日期</label>
                <div class="col-12 md:col-10">
                    <Calendar v-model="selectCheckDate" selectionMode="multiple" dateFormat="yy-mm-dd" placeholder="选择日期" :manualInput="false" />
                </div>
            </div>
            <div v-if="selectContinuityStatus === '2'" class="field grid">
                <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">选择开始和结束时间</label>
                <div class="col-12 md:col-10">
                    <Calendar v-model="selectCheckInDate" dateFormat="yy-mm-dd" placeholder="选择开始日期" :manualInput="false" />
                    <Calendar class="ml-2" v-model="selectCheckOutDate" dateFormat="yy-mm-dd" placeholder="选择结束日期" :manualInput="false" />
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
