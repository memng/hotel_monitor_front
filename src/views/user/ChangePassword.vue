<script setup>
import { ref } from 'vue';
import HttpService from '@/service/HttpService';
import { useMessage } from '@/layout/global_state/message_show';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import SessionStorageService from '@/service/SessionStorageService';

const sssObj = new SessionStorageService();
const { message } = useMessage();
const toast = useToast();
const changeForm = ref({
    old_user_pass: '',
    new_user_pass: '',
});

async function doChangePass() {
    try {
        const data = await HttpService.post('/api/changePassword', toast, { ...changeForm.value });
        if (data) {
            message.value = '您的密码已修改成功，现在可以直接登录!';
            sssObj.clearAll();
            router.push({ name: 'login' });
        } else {
            throw new Error(data);
        }
    } catch (error) {
        console.log(error.message);
    }
}
</script>

<template>
    <div class="mt-4 flex justify-content-center">
        <div class="cp_main">
            <label for="password1" class="block text-900 font-medium text-xl mb-2">旧密码</label>
            <Password id="password1" v-model="changeForm.old_user_pass" placeholder="请输入旧密码" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
            <label for="password2" class="block text-900 font-medium text-xl mb-2">新密码</label>
            <Password id="password2" v-model="changeForm.new_user_pass" placeholder="请输入新密码" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
            <Button @click="doChangePass()" label="提交" class="w-full p-3 text-xl"></Button>
        </div>
    </div> 
</template>

<style lang="scss">
.cp_main {
    width: 300px;
}
</style>