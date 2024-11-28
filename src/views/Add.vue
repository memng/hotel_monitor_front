<script setup>
import { ref, onMounted, watch } from 'vue';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import moment from 'moment';
import { useRouter } from 'vue-router';
const toast = useToast();
const router = useRouter();

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

onMounted(async () => {
    try {
        const loadData = await initData();
        countryList.value = loadData.countryListResult;
        staffList.value = loadData.commonConfig.staff;
        roomTypeList.value = loadData.commonConfig.room_type;
        typeList.value = loadData.commonConfig.type;
        noticeIntervalList.value = loadData.commonConfig.notice_interval;
    } catch (error) {
        console.error('init add needed data error:' + error.message);
    }
});

async function initData() {
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
    const checkDateFormat = selectCheckDate.value.map((item) => moment(item).format('YYYY-MM-DD'))
    try {
        const params = {
            hotel_id: selectHotel.value.join(','),
            room_type_id: selectRoomTypetId.value.join(','),
            check_date: checkDateFormat.join(','),
            monitor_user_id: selectStaffId.value,
            monitor_type: selectTypeId.value,
            notice_interval: selectNoticeInterval.value
        };
        const postResult = await HttpService.post('/api/monitorList/create', toast, params);
        if (postResult === 1) {
            toast.add({
                severity: 'success',
                summary: '成功',
                detail: '添加成功',
                life: 5000
            });
            router.push('/maindash');
        }
    } catch (error) {
        console.log('add monitor list error' + error.message);
    }
}

function resetForm() {
    selectCountry.value = undefined;
    selectCity.value = undefined;

    selectHotel.value = [];
    selectCheckDate.value =[];
    selectRoomTypetId.value=[];

    selectTypeId.value = undefined;
    selectStaffId.value = undefined;
    selectNoticeInterval.value = undefined;
}

function transformEmptyObjectToArray(data) {
    if (typeof data === 'object' && !Array.isArray(data) && data !== null && Object.keys(data).length === 0) {
        return [];
    }
    return data;
}
</script>
<template>
    <div class="grid">
        <div class="col-12 md:col-6">
            <div class="card p-fluid">
                <h5>增加酒店</h5>
                <div class="field grid">
                    <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">酒店</label>
                    <div class="col-12 md:col-10">
                        <Dropdown v-model="selectCountry" filter :loading="countryLoading" :options="countryList" optionLabel="CountryName_CN" optionValue="ISOCountryCode" placeholder="选择国家" class="w-full md:w-14rem" />
                        <Dropdown v-model="selectCity" filter :loading="cityLoading" :options="cityList" optionLabel="CityName_CN" optionValue="CityCode" placeholder="选择城市" class="w-full md:w-14rem mt-2" />
                        <MultiSelect v-model="selectHotel" filter :loading="hotelLoading" :options="hotelList" optionLabel="Name_CN" optionValue="HotelID" placeholder="选择酒店" :maxSelectedLabels="1" class="w-full md:w-20rem mt-2" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">日期</label>
                    <div class="col-12 md:col-10">
                        <Calendar v-model="selectCheckDate" selectionMode="multiple" dateFormat="yy-mm-dd" placeholder="选择日期" :manualInput="false" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">人数</label>
                    <div class="col-12 md:col-10">
                        <MultiSelect v-model="selectRoomTypetId" :options="roomTypeList" optionLabel="adult_count" optionValue="id" placeholder="选择人数" :maxSelectedLabels="3" class="w-full md:w-14rem" />
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
                    <div><Button label="重置" @click="resetForm" /></div>
                </div>
            </div>
        </div>
    </div>
</template>
