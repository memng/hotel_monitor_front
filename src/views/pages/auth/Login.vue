<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import OpenHttpService from '@/service/OpenHttpService';
import SessionStorageService from '@/service/SessionStorageService';
import { useMessage } from '@/layout/global_state/message_show';
const { message } = useMessage();

const captchaUrl = ref('');
const loginForm = ref({
    user_phone: '',
    user_pass: '',
    verify_code: '',
});

const sessionStorageObj = new SessionStorageService();
const router = useRouter();
const toast = useToast();

const fetchCaptcha = async () => {
    try {
        const response = await OpenHttpService.get('/open/getCaptcha', { scene: 'login' });
        if (response.ret === 200) {
            captchaUrl.value = response.data.captcha;
            sessionStorageObj.setSessionId(response.data.session_id);
        } else {
            console.error('获取验证码失败:', response.ret, response.msg);
        }
    } catch (error) {
        console.error('获取验证码失败:', error.message);
    }
};

async function doLoginIn() {
    try {
        const data = await OpenHttpService.post('/open/doLogin', { ...loginForm.value });
        if (data.ret === 200) {
            sessionStorageObj.setUserInfo(data.data.user_info);
            sessionStorageObj.setRfToken(data.data.refresh_token);
            sessionStorageObj.setToken(data.data.access_token);
            router.push({ name: 'maindash' });
        } else {
            throw new Error(data.msg);
        }
    } catch (error) {
        fetchCaptcha();
        // 错误处理逻辑
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: error.message, // 假设返回的数据中包含错误消息
            life: 8000
        });
    }
}

onMounted(() => {
    fetchCaptcha();
    //console.log(message.value);
    nextTick(() => {
        if (message.value !== undefined) {
            // 错误处理逻辑
            toast.add({
                severity: 'info',
                summary: '提醒',
                detail: message.value, // 假设返回的数据中包含错误消息
                life: 20000
            });
            message.value = undefined;
        }
    });
});

</script>

<template>
    <Toast />
    <div class="surface-ground flex align-items-center justify-content-center mt-6 main_h_screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">用户登录</div>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">用户名</label>
                        <InputText id="email1" type="text" placeholder="请输入用户名" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="loginForm.user_phone" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">密码</label>
                        <Password id="password1" v-model="loginForm.user_pass" placeholder="密码" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        <div class="captcha-container">
                            <label for="captcha" class="block text-900 text-xl font-medium mb-2">验证码</label>
                            <div class="captcha-row">
                                <InputText v-model="loginForm.verify_code" id="captcha" placeholder="输入右侧数字" />
                                <img :src="captchaUrl" @click="fetchCaptcha" alt="点击刷新验证码" class="captcha-image">
                            </div>
                        </div>
                        <Button @click="doLoginIn()" label="登录" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}

.captcha-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 20px;
}

.captcha-row {
    display: flex;
    align-items: center;
}

.captcha-image {
    margin-left: 1rem;
    cursor: pointer;
    width: 100px;
    height: auto;
}
.main_h_screen {
    min-height: 70vh;
}
</style>
