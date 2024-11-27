<script setup>
import { ref, onMounted, watch } from 'vue';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

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
        const countryListResult = await HttpService.get('/api/getCountryList', toast);
        const commonConfig = await HttpService.get('/api/getStaffAndRoomType', toast);
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
        cityList.value = await HttpService.get('/api/getCityByCountryCode', toast, { CountryCode: newValue });
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
        hotelList.value = await HttpService.get('/api/getHotelByCode', toast, { CountryCode: selectCountry.value, CityCode: newValue });
        selectHotel.value = undefined;
    } finally {
        hotelLoading.value = false;
    }
});
</script>
<template>
    <div class="grid">
        <div class="col-12 md:col-6">
            <div class="card p-fluid">
                <h5>增加酒店</h5>
                <div class="field grid">
                    <label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">酒店</label>
                    <div class="col-12 md:col-10">
                        <Dropdown v-model="selectCountry" filter :options="countryList" optionLabel="CountryName_CN" optionValue="ISOCountryCode" placeholder="选择国家" class="w-full md:w-14rem" />
                        <Dropdown v-model="selectCity" filter :options="cityList" optionLabel="CityName_CN" optionValue="CityCode" placeholder="选择城市" class="w-full md:w-14rem mt-2" />
                        <MultiSelect v-model="selectHotel" filter :options="hotelList" optionLabel="Name_CN" optionValue="HotelID" placeholder="选择酒店" :maxSelectedLabels="1" class="w-full md:w-20rem mt-2" />
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
            </div>
        </div>
    </div>
</template>
