<script setup>
import router from '@/router';
import OpenHttpService from '@/service/OpenHttpService';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = ref(route.params.id);

const data = ref([]);

const fetchData = async () => {
    try {
        const response = await OpenHttpService.get('/article/getById', { id: id.value });
        if (response.ret === 200) {
            data.value = response.data;
        } else {
            console.error('获取文章失败');
        }
    } catch (error) {
        console.error('获取文章失败:', error.message);
    }
};

watch(
    () => route.params.id,
    (newId) => {
        id.value = newId;
        fetchData();
    }
);

function navToList() {
    router.push(`/index/category/${data.value.cid}`);
}

const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const decodedContent = computed(() => decodeHtml(data.value.content));

onMounted(() => {
    fetchData();
});
</script>
<template>
    <div class="surface-ground flex justify-content-center main_h_screen min-w-screen overflow-hidden">
        <div class="page_contact_main mt-6">
            <h2>{{ data.title }}</h2>
            <p>{{ data.post_time }}</p>
            <div v-html="decodedContent"></div>
            <div class="flex justify-content-center">
                <Button @click="navToList" label="返回" class="p-button-rounded text-xl border-none mt-5 bg-green-500 font-normal text-white line-height-3 px-3"></Button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.page_contact_main {
    min-width: 300px;
    max-width: 1500px;
    width: 80%;
}

.main_h_screen {
    min-height: 70vh;
}
</style>

<style lang="scss">
.page_contact_main img {
    width: 100%;
    height: auto;
}
</style>
