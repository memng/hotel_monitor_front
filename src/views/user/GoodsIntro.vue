<template>
    <div id="pricing" class=" py-4 px-4 lg:px-8 my-2 md:my-4">
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
                        <Button label="购买" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-green-500 text-white"></Button>
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
                        <Button label="购买" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-green-500 text-white"></Button>
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
</template>