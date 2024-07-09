<script setup>
import router from '@/router';
import OpenHttpService from '@/service/OpenHttpService';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;

const data = ref([]);

const fetchData = async () => {
    try {
        const response = OpenHttpService.get('/article/getById', { id: id });
        if (response.ret === 200) {
            data.value = response.data;
        } else {
            console.error('获取文章失败');
        }
    } catch (error) {
        console.error('获取文章失败:', error.message);
    }
};

function navToList() {
    router.push(`/index/category/${data.value.cid}.html`);
}

onMounted(() => {
    fetchData();
});
</script>
<template>
    <div class="surface-ground flex justify-content-center main_h_screen min-w-screen overflow-hidden">
        <div class="contact_main mt-6">
            <h2>{{ data.title }}</h2>
            <p>{{ data.post_time }}</p>
            <div v-html="data.content"></div>
            <div class="flex justify-content-center">
                <Button @click="navToList" label="返回" class="p-button-rounded text-xl border-none mt-5 bg-green-500 font-normal text-white line-height-3 px-3"></Button>
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
