<script setup>
import { ref, onMounted } from 'vue';

const testHtml = `<form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=UTF-8' method='POST'>
<input type='hidden' name='method' value='alipay.trade.page.pay'/>
<input type='hidden' name='app_id' value='2021004157615372'/>
<input type='hidden' name='timestamp' value='2024-07-01 23:37:11'/>
<input type='hidden' name='format' value='json'/>
<input type='hidden' name='version' value='1.0'/>
<input type='hidden' name='alipay_sdk' value='alipay-easysdk-php-2.2.3'/>
<input type='hidden' name='charset' value='UTF-8'/>
<input type='hidden' name='sign_type' value='RSA2'/>
<input type='hidden' name='biz_content' value='{"subject":"专业版","out_trade_no":"LKQ202407012337119013","total_amount":"1.00","product_code":"FAST_INSTANT_TRADE_PAY"}'/>
<input type='hidden' name='return_url' value='https://bf-data.cn/pay-status'/>
<input type='hidden' name='notify_url' value='https://api.bf-data.cn/handlePayNotify'/>
<input type='hidden' name='sign' value='GXWniswR/6lB3bgRupVLGWTX1ySBkh679XbdlIa146LVeH4gziUZJMXabOOzszaFiLHGTXIOHvezrCtZ212R0XlgWOpjFpqochlQZ/7oofpeHGObqPCWrDBRCqLHzPFcoGCjhrN3rrIm6RwwxC6dYSYEOQS+CUUM79SEcTgwsMC/zizxmy9+QmgtggDo/n+6C/OZVeqS2WRixTQl1UlFxXmnGmxzaLxn2j/dzQ9+xk/5vq7C054/jsZtS9S7nx2RPWyBakgY/dsIeD90UXCc0nAfISqCKZKd5Mtpsw2+Bxl6TElkJgfxb3RHZk5sDplpFuOiwh8UsikNwZs3KMt2KA=='/>
<input type='submit' value='ok' style='display:none;'>
</form>`;

const container = ref(null);

onMounted(() => {
    container.value.innerHTML = testHtml;
    container.value.querySelector('form').submit();
});
</script>

<template>
    <div id="pricing" class="py-4 px-4 lg:px-8 my-2 md:my-4">
        <div class="grid justify-content-center mt-8 md:mt-0">
            <div ref="container">支付跳转中，请稍候...</div>
        </div>
    </div>
    <div>
        https://bf-data.cn/pay-status?charset=UTF-8&out_trade_no=LKQ202407012337119013&method=alipay.trade.page.pay.return&total_amount=1.00&sign=d8%2Fr2QdEexu2YPkL1Cws%2FkzF9%2BvRPLoA5PXqjlA%2B0Sw7srjQYT0fZ%2BYd9QD1CFM9l7yqn0q3UWwSaoqEiqFHouHyHbzkRqAGu1V2n8qpBDgOS%2FOciwYtDBvEOBYZJUFH75d%2BX3iUktWtXtTAxTGq9a86KYuuHW81jm8xQzBhwPvbnY4FpZ5KcUbp1LY3Awjl2LKY97UF4a1aUab8RpH7gyG7%2BW2K35nzpUQViLYtE4nYyAT1XPMVWXXmxFGd5oOjpgI7N8KkIh3p1bdivOBqwIV%2FZIkEdrWFztp8rb6whm%2FgnfFExS9qn3BA8ekRDMZspLY30DefGUO8ELTMpi9gCA%3D%3D&trade_no=2024070222001478001444409057&auth_app_id=2021004157615372&version=1.0&app_id=2021004157615372&sign_type=RSA2&seller_id=2088741254382587&timestamp=2024-07-02+00%3A12%3A01
    </div>
</template>