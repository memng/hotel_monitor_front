<script setup>
import router from '@/router';
import OpenHttpService from '@/service/OpenHttpService';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const cid = route.params.id;

const data = ref([]);
const totalRecords = ref(0);
const rows = ref(20);
const page = ref(0);

const fetchData = async () => {
    try {
        const response = OpenHttpService.get('/article/getByCid', { cid: cid, page_num: page.value + 1, page_size: rows.value });
        if (response.ret === 200) {
            data.value = response.data.list;
            totalRecords.value = response.data.total;
        } else {
            console.error('获取文章列表失败');
        }
    } catch (error) {
        console.error('获取文章列表失败:', error.message);
    }
};

const onPage = (event) => {
    page.value = event.page + 1;
    rows.value = event.rows;
    fetchData();
};

function navToDetail(id) {
    router.push(`/index/page/${id}.html`);
}

onMounted(() => {
    fetchData();
});
</script>
<template>
    <div class="surface-ground flex justify-content-center main_h_screen min-w-screen overflow-hidden">
        <div class="contact_main mt-6">
            <div>
                <DataTable :value="data" :paginator="true" :rows="rows" :totalRecords="totalRecords" :showHeader="false" class="custom-datatable" @page="onPage">
                    <Column field="title" :bodyStyle="{ 'text-align': 'left' }">
                        <template #body="slotProps">
                            <a :href="`/index/page/${slotProps.data.id}.html`" @click.prevent="navToDetail(slotProps.data.id)">
                                {{ slotProps.data.title }}
                            </a>
                        </template>
                    </Column>
                    <Column field="post_time" :bodyStyle="{ 'text-align': 'right' }"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
<style scoped>
.contact_main {
    min-width: 300px;
    max-width: 1500px;
    width: 80%;
}
.main_h_screen {
    min-height: 70vh;
}
</style>

<style lang="scss">
.custom-datatable .p-datatable-tbody > tr {
    border-bottom: 1px dashed #ccc;
}

.custom-datatable .p-datatable-tbody > tr:last-child {
    border-bottom: none;
}

.custom-datatable .p-datatable-tbody > tr > td {
    border: none;
}
</style>
