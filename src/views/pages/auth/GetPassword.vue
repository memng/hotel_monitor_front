<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import SessionStorageService from '@/service/SessionStorageService';
import OpenHttpService from '@/service/OpenHttpService';
import { useMessage } from '@/layout/global_state/message_show';

const { message } = useMessage();
const captchaUrl = ref('');
const verify_code = ref();
const getPasswordForm = ref({
    user_phone: '',
    user_pass: '',
    phone_code: '',
});
const sessionStorageObj = new SessionStorageService();
const router = useRouter();
const toast = useToast();

const isButtonDisabled = ref(false);
const countdown = ref(0);

const buttonLabel = computed(() => {
  return isButtonDisabled.value ? `${countdown.value}秒后重试` : '获取验证码';
});

const fetchCaptcha = async () => {
    try {
        const response = await OpenHttpService.get('/open/getCaptcha', { scene: 'get_password' });
        if (response.ret === 200) {
            captchaUrl.value = response.data.captcha;
            sessionStorageObj.setSessionId(response.data.session_id);
        } else {
            console.error('获取验证码失败:', response.ret, response.msg);
        }
    } catch (error) {
        console.error('获取验证码失败:', error);
    }
};

const checkCaptcha = async () => {
    try {
        const response = await OpenHttpService.post('/open/checkCaptcha', { scene: 'get_password', value: verify_code.value });
        if (response.ret === 200 && response.data) {
            return true;
        } else {
            throw new Error(response.msg);
        }
    } catch (error) {
        fetchCaptcha();
        // 错误处理逻辑
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: '图像验证码错误', // 假设返回的数据中包含错误消息
            life: 8000
        });
        return false;
    }
};

const sendMessageCode = async () => {
    try {
        const response = await OpenHttpService.post('/open/sendCode', { scene: 'get_password', user_phone: getPasswordForm.value.user_phone });
        if (response.ret === 200 && response.data) {
            toast.add({
                severity: 'success',
                summary: '成功',
                detail: '验证码已发送', // 假设返回的数据中包含错误消息
                life: 8000
            });
            return true;
        } else {
            throw new Error(response.msg);
        }
    } catch (error) {
        // 错误处理逻辑
        toast.add({
            severity: 'error',
            summary: '错误',
            detail: error.message, // 假设返回的数据中包含错误消息
            life: 8000
        });
        return false;
    }
};

const handleButtonClick = async () => {
    if (isButtonDisabled.value) return;
    const checkResult = await checkCaptcha();
    if (!checkResult) return;
    const sendResult = await sendMessageCode();
    if (!sendResult) return;
    isButtonDisabled.value = true;
    countdown.value = 60;
    const interval = setInterval(async () => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(interval);
            await fetchCaptcha();
            isButtonDisabled.value = false;
        }
    }, 1000);
};

onMounted(() => {
    fetchCaptcha();
});


async function doGetPassword() {
    try {
        const data = await OpenHttpService.post('/open/getPassword', { ...getPasswordForm.value });
        if (data.ret === 200 && data.data) {
            message.value = '您的密码已重置成功，现在可以直接登录!';
            router.push('/index/login');
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

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center py-6 main_h_screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">找回密码</div>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">手机号</label>
                        <InputText id="email1" type="text" placeholder="请输入手机号" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="getPasswordForm.user_phone" />

                        <div class="captcha-container">
                            <label for="captcha" class="block text-900 text-xl font-medium mb-2">图片验证码</label>
                            <div class="captcha-row">
                                <InputText v-model="verify_code" id="captcha" placeholder="输入右侧数字" />
                                <img :src="captchaUrl" @click="fetchCaptcha" alt="点击刷新验证码" class="captcha-image">
                            </div>
                        </div>

                        <div class="captcha-container">
                            <label for="verify_code" class="block text-900 text-xl font-medium mb-2">手机验证码</label>
                            <div class="captcha-row">
                                <InputText class="mr-2" v-model="getPasswordForm.phone_code" id="verify_code" placeholder="输入手机验证码" />
                                <Button :label="buttonLabel" :disabled="isButtonDisabled" @click="handleButtonClick" :class="{ 'p-button-secondary': isButtonDisabled, 'p-button-primary': !isButtonDisabled }" />
                            </div>
                        </div>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">新密码</label>
                        <Password id="password1" v-model="getPasswordForm.user_pass" placeholder="新密码" :toggleMask="true" :feedback="false" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer" href="/index/login" style="color: var(--primary-color)">登录</a>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" href="/index/reg" style="color: var(--primary-color)">没有账号？注册</a>
                        </div>
                        <Button @click="doGetPassword" label="提交" class="w-full p-3 text-xl"></Button>
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
