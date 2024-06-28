<script setup>
import { onMounted, ref } from 'vue';
import HttpService from '@/service/HttpService';

const orderData = ref();

const fetchOrderData = async () => {
    try {
        orderData.value = await HttpService.get('/api/getOrderList');
    } catch (error) {
        console.error('获取订单数据失败:', error);
    }
}

onMounted(() => {
    fetchOrderData();
});

</script>

<template>
    <div>
        <DataTable v-if="orderData !== undefined" :value="orderData" paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50]" showGridlines tableStyle="min-width: 50rem">
            <Column field="order_no" header="订单号"></Column>
            <Column field="goods_name" header="商品名"></Column>
            <Column field="goods_number" header="数量"></Column>
            <Column field="real_price" header="支付金额"></Column>
            <Column field="goods_status_name" header="支付状态"></Column>
            <Column field="create_time" header="创建时间"></Column>
            <Column field="pay_time" header="支付时间"></Column>
        </DataTable>
    </div>
</template>

<style lang="scss"></style>