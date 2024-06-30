<script setup>
import { onMounted, ref } from 'vue';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const keyMap = {
    user_phone: '手机号',
    user_group_name: '会员级别',
    expire_str: '到期时间'
};
const profileData = ref();

const fetchProfileData = async () => {
    try {
        profileData.value = await HttpService.get('/api/getProfile', toast);
    } catch (error) {
        console.error('获取个人资料失败:', error);
    }
}

onMounted(() => {
    fetchProfileData();
});
</script>

<template>
    <div class="mt-3 py-4">
        <div>
            <p v-for="(value, key) in profileData" :key="key">
                {{ keyMap[key] }}: <span class="ml-2">{{ value }}</span>
            </p>
        </div>
    </div>
</template>

<style lang="scss"></style>