<template>
    <div
        id="hero"
        class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-4 md:mx-8 mt-0 md:mt-4">
            <h1 class="text-6xl font-bold text-gray-900 line-height-2">精准、可靠、稳定的必发交易所数据</h1>
            <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">精准还原每一笔必发交易，精确到毫秒</p>
            <Button label="免费体验" class="p-button-rounded text-xl border-none mt-5 bg-green-500 font-normal text-white line-height-3 px-3"></Button>
        </div>
        <div class="flex justify-content-center md:justify-content-end">
            <img style="width: 609px; height: 420px;" src="/demo/bf/raw_graph.png" alt="Hero Image" class="w-9 md:w-auto" />
        </div>
    </div>

    <div id="highlights" class="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8">
        <div class="text-center">
            <h2 class="text-900 font-normal mb-2">专业图表数据</h2>
            <span class="text-600 text-2xl">祝你一臂之力</span>
        </div>

        <div class="grid mt-8 pb-2 md:pb-8">
            <div class="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0" style="border-radius: 8px">
                <img src="/demo/bf/k_line.png" class="w-11" style="width: 530px; height: 512px" alt="mockup mobile" />
            </div>

            <div class="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
                <div class="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">成交挂单图</h2>
                <span class="text-700 text-2xl line-height-3 ml-0 md:ml-2" style="max-width: 650px"
                    >精确还原订单成交时的挂单现场，对于分析主力意图和玩家态度具有重要意义</span
                >
            </div>
        </div>

        <div class="grid my-8 pt-2 md:pt-8">
            <div class="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                <div class="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">北单偏离</h2>
                <span class="text-700 text-2xl line-height-3 mr-0 md:mr-2" style="max-width: 650px"
                    >比较北单玩家对打出支持百分比和欧赔公司设定的支持百分比，从而得出欧赔公司对打出态度。适用次级联赛</span
                >
            </div>

            <div class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style="border-radius: 8px">
                <img src="/demo/bf/bd.png" class="w-11" style="width: 530px; height: 512px" alt="mockup" />
            </div>
        </div>

        <div class="grid mt-8 pb-2 md:pb-8">
            <div class="flex justify-content-center col-12 lg:col-6 bg-purple-100 p-0 flex-order-1 lg:flex-order-0" style="border-radius: 8px">
                <img src="/demo/bf/raw_graph_stat.png" class="w-11" alt="mockup mobile" />
            </div>

            <div class="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
                <div class="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-mobile text-5xl text-purple-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">自定义时间段原图统计</h2>
                <span class="text-700 text-2xl line-height-3 ml-0 md:ml-2" style="max-width: 650px"
                    >自定义时间段统计原图买卖双方的量和差值，对分析玩家态度有重要意义。适用于五大联赛等成交量较大比赛</span
                >
            </div>
        </div>

        <div class="grid my-8 pt-2 md:pt-8">
            <div class="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                <div class="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                    <i class="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
                </div>
                <h2 class="line-height-1 text-900 text-4xl font-normal">欧赔走势图表</h2>
                <span class="text-700 text-2xl line-height-3 mr-0 md:mr-2" style="max-width: 650px"
                    >结合玩家态度，可分析欧赔公司的调整方向和目的</span
                >
            </div>

            <div class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style="border-radius: 8px">
                <img src="/demo/bf/odds.png" class="w-11" alt="mockup" />
            </div>
        </div>
    </div>

    <div id="pricing" class="py-4 px-4 lg:px-8 my-2 md:my-4">
        <div class="text-center">
            <h2 class="text-900 font-normal mb-2">Matchless Pricing</h2>
            <span class="text-600 text-2xl">Amet consectetur adipiscing elit...</span>
        </div>

        <div class="grid justify-content-between mt-8 md:mt-0">
            <div class="col-12 lg:col-4 p-0 md:p-3">
                <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                    <h3 class="text-900 text-center my-5">Free</h3>
                    <img src="/demo/images/landing/free.svg" class="w-10 h-10 mx-auto" alt="free" />
                    <div class="my-5 text-center">
                        <span class="text-5xl font-bold mr-2 text-900">$0</span>
                        <span class="text-600">per month</span>
                        <Button label="Get Started" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                    </div>
                    <Divider class="w-full bg-surface-200"></Divider>
                    <ul class="my-5 list-none p-0 flex text-900 flex-column">
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Responsive Layout</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Unlimited Push Messages</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">50 Support Ticket</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Free Shipping</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                    <h3 class="text-900 text-center my-5">Startup</h3>
                    <img src="/demo/images/landing/startup.svg" class="w-10 h-10 mx-auto" alt="startup" />
                    <div class="my-5 text-center">
                        <span class="text-5xl font-bold mr-2 text-900">$1</span>
                        <span class="text-600">per month</span>
                        <Button label="Try Free" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                    </div>
                    <Divider class="w-full bg-surface-200"></Divider>
                    <ul class="my-5 list-none p-0 flex text-900 flex-column">
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Responsive Layout</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Unlimited Push Messages</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">50 Support Ticket</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Free Shipping</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                    <h3 class="text-900 text-center my-5">Enterprise</h3>
                    <img src="/demo/images/landing/enterprise.svg" class="w-10 h-10 mx-auto" alt="enterprise" />
                    <div class="my-5 text-center">
                        <span class="text-5xl font-bold mr-2 text-900">$999</span>
                        <span class="text-600">per month</span>
                        <Button label="Get a Quote" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                    </div>
                    <Divider class="w-full bg-surface-200"></Divider>
                    <ul class="my-5 list-none p-0 flex text-900 flex-column">
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Responsive Layout</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Unlimited Push Messages</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">50 Support Ticket</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl line-height-3">Free Shipping</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>