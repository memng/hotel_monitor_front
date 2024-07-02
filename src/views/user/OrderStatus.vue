<script setup>
import { ref, onMounted } from 'vue';
import { useMessage } from '@/layout/global_state/message_show';
import HttpService from '@/service/HttpService';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import SessionStorageService from '@/service/SessionStorageService';
const { message } = useMessage();
const toast = useToast();
const showMessage = ref();
const sssObj = new SessionStorageService();

onMounted(async () => {
    await getOrderStatus();
});

async function getOrderStatus() {
    try {
        const searchParams = new URLSearchParams(window.location.search);
        const orderNo = searchParams.get('out_trade_no');
        const fetchResultData = await HttpService.get('/api/orderStatus', toast, { order_no: orderNo });
        if (fetchResultData) {
            message.value = '您已支付成功,请重新登录刷新您的权限';
            sssObj.clearAll();
            router.push({ name: 'login' });
        } else {
            showMessage.value = '订单支付失败，如果您已完成支付，请稍后去订单列表查看订单状态或联系客服';
        }
    } catch (error) {
        showMessage.value = '订单支付失败，如果您已完成支付，请稍后去订单列表查看订单状态或联系客服';
        console.error('errer fetch order status' + error.message);
    } 
}
</script>

<template>
    <div id="pricing" class="py-4 px-4 lg:px-8 my-2 md:my-4">
        <div class="grid justify-content-center mt-8 md:mt-0">
            <div>{{ showMessage }}</div>
        </div>
    </div>
</template>