<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';

const loading = ref(false);
const loadData = ref([]);
const uniqueCheckDate = ref([]);
const uniqueRoom = ref([]);
const uniqueUser = ref([]);
const uniqueType = ref([]);

const toast = useToast();

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
</script>

<template>
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
        </DataTable>
    </div>
</template>
