<script setup>
import { ref, computed, watch  } from 'vue';
import moment from 'moment';
import { useRangMenu } from './global_state/topbar_menu';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const eventDataRaw = ref([]);
const showFilterButton = ref(false);

const { currentMenu } = useRangMenu();
const minDate = computed(() => {
    return moment(currentMenu.value.start_date).toDate();
});
const maxDate = computed(() => {
    return isDateString(currentMenu.value.end_date) ? moment(currentMenu.value.end_date).toDate() : null;
});
const initDate = computed(() => {
    return isDateString(currentMenu.value.end_date) ? moment().toDate() : moment(currentMenu.value.start_date).toDate();
})

const date = ref(initDate.value);

const isDateString = (str) => {
    return moment(str, 'YYYY-MM-DD', true).isValid();
}
watch(
    date.value,
    async (newValue) => {
        try {
            eventDataRaw.value = await HttpService.get('/api/getEventByDate', toast, { date: newValue });
            showFilterButton.value = true;
        } catch (error) {
            console.log('load event data error');
        }
    },
    { immediate: true }
);
watch(initDate.value, (newValue) => {
    date.value = newValue;
});
</script>

<template>
    <Calendar v-model="date" :minDate="minDate" :maxDate="maxDate" dateFormat="yy-mm-dd" placeholder="请先选择一个日期" />
</template>

<style lang="scss" scoped></style>
