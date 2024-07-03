<script setup>
import HttpService from '@/service/HttpService';
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';

const step1 = ref(true);
const step2 = ref(false);

const goods1Disable = ref(false);
const goods2Disable = ref(false);
const submitDisable = ref(false);
const container = ref(null);
const toast = useToast();

const goodsId = ref(1);
const goodsName = ref('专业版');
const goodsPrice = ref(288);
const goodsNumber = ref(1);
const totalPrice = computed(() => {
    return goodsPrice.value * goodsNumber.value;
});
onMounted(async () => {
    await initGoodsStatus();
});
async function initGoodsStatus() {
    try {
        goods1Disable.value = false;
        goods2Disable.value = false;
        const currentOrderInfo = await HttpService.get('/api/getCurrentOrderType', toast);
        const goodsId = currentOrderInfo.goods_id;
        if (goodsId === 1) {
            goods2Disable.value = true;
        } else if (goodsId === 2) {
            goods1Disable.value = true;
        }
    } catch (error) {
        console.error('getCurrentOrderType error:' + error.message);
    }
}

function handlePurchase(gid) {
    if (gid === 1) {
        goodsId.value = 1;
        goodsName.value = '专业版';
        goodsPrice.value = 288;
    } else if (gid === 2) {
        goodsId.value = 2;
        goodsName.value = '高级版';
        goodsPrice.value = 388;
    } else {
        console.error('商品id选择错误:' + gid);
    }
    step1.value = false;
    step2.value = true;
}

async function doCreateOrder() {
    submitDisable.value = true;
    try {
        const fetchResultData = await HttpService.post('/api/createOrder', toast, { goods_id: goodsId.value, goods_number: goodsNumber.value });
        container.value.innerHTML = fetchResultData['pay_html'];
        container.value.querySelector('form').submit();
    } catch (error) {
        console.error('errer fetch raw data' + error.message);
    } finally {
        setTimeout(() => {
            submitDisable.value = false;
        }, 3000); // 10秒后执行
    }
}

async function doReSelect() {
    await initGoodsStatus();
    step2.value = false;
    step1.value = true;
}

</script>
<template>
    <div id="pricing" v-if="step1" class="py-4 px-4 lg:px-8 my-2 md:my-4">
        <div class="text-center">
            <h2 class="text-900 font-normal mb-2">购买会员</h2>
            <span class="text-600 text-2xl">点击购买/续费会员</span>
        </div>

        <div class="grid justify-content-center mt-8 md:mt-0">
            <div class="col-12 lg:col-4 p-0 mr-5 md:p-3 mt-4 md:mt-0">
                <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                    <h3 class="text-900 text-center my-5">专业会员</h3>
                    <img src="/demo/images/landing/startup.svg" class="w-10 h-10 mx-auto" alt="startup" />
                    <div class="my-5 text-center">
                        <span class="text-5xl font-bold mr-2 text-900">￥288</span>
                        <span class="text-600">/月</span>
                        <Button label="购买" :disabled="goods1Disable" @click="handlePurchase(1)" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-green-500 text-white"></Button>
                    </div>
                    <Divider class="w-full bg-surface-200"></Divider>
                    <ul class="my-5 list-none p-0 flex text-900 flex-column">
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">24/05/21-24/07/15期间收录比赛的全部数据</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">实时比赛的全部数据和近一月的比赛数据回查</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">网站系统使用技术支持和答疑</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                    <h3 class="text-900 text-center my-5">高级会员</h3>
                    <img src="/demo/images/landing/enterprise.svg" class="w-10 h-10 mx-auto" alt="enterprise" />
                    <div class="my-5 text-center">
                        <span class="text-5xl font-bold mr-2 text-900">￥388</span>
                        <span class="text-600">/月</span>
                        <Button label="购买" :disabled="goods2Disable" @click="handlePurchase(2)" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-green-500 text-white"></Button>
                    </div>
                    <Divider class="w-full bg-surface-200"></Divider>
                    <ul class="my-5 list-none p-0 flex text-900 flex-column">
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">从2023/11/1至今收录的比赛的全部数据回查</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">实时比赛的全部数据</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">网站系统使用技术支持和答疑</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">新增联赛需求申请</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div v-if="step2" class="flex justify-content-center">
        <div class="flex flex-column order_main gap-5 text-lg">
            <div>
                <span>名称: {{ goodsName }}</span>
            </div>
            <div>
                <InputNumber v-model="goodsNumber" suffix="个月" inputId="horizontal-buttons" inputClass="order_input_number" :min="1" :max="99" showButtons buttonLayout="horizontal">
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
            </div>
            <div>总价: {{ totalPrice }}</div>
            <div class="flex flex-row align-items-center">
                <div>支付方式：</div>
                <div><img class="order_alipay_logo" src="/demo/bf/alipay_logo.png" /></div>
            </div>
            <div class="flex flex-row">
                <div>
                    <Button label="提交" :disabled="submitDisable" @click="doCreateOrder" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-green-500 text-white"></Button>
                </div>
                <div class="ml-2">
                    <Button label="返回重选" @click="doReSelect" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-green-500 text-white"></Button>
                </div>
            </div>
            <div v-show="false" ref="container"></div>
        </div>
    </div>
</template>

<style lang="scss">
.order_main {
    width: 992px;
}
.order_input_number {
    width: 100px;
}
.order_alipay_logo {
    width: 100px;
    height: auto;
}
</style>
