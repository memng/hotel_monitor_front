<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

</script>

<template>
    <Accordion :value="['0']" multiple>
        <AccordionPanel value="0">
            <AccordionHeader>网站数据稳定性如何？</AccordionHeader>
            <AccordionContent>
                <p class="m-0">本网站系统采用最先进系统架构设计，并且有技术团队提供技术支持，能够保证98%以上的网站可用性。</p>
            </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
            <AccordionHeader>网站必发交易原图数据准确度如何</AccordionHeader>
            <AccordionContent>
                <p class="m-0">本站必发原图数据力求做到每一笔交易精准还原，您可以比较本站数据与官网数据，精准度超过99%。</p>
            </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2">
            <AccordionHeader>网站都收录哪些联赛数据？</AccordionHeader>
            <AccordionContent>
                <p class="m-0">包括五大联赛、葡超、荷甲、英冠、西乙、德乙、意乙、法乙联赛; 英足总杯、西班牙国王杯、德国杯、意杯、法国杯；欧冠杯、欧罗巴杯</p>
            </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="3">
            <AccordionHeader>网站收录的比赛为什么相较与其他服务商收录联赛较少</AccordionHeader>
            <AccordionContent>
                <p class="m-0">因为必发分析在成交量较小情况下分析意义不太大，为了节省资源和不过多分散分析者精力，本站舍弃了很多联赛。如果你有研究其他联赛的需求，可以提出申请</p>
            </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="4">
            <AccordionHeader>网站数据是实时的么</AccordionHeader>
            <AccordionContent>
                <p class="m-0">本站原图数据在临场一小时会有5分钟延迟，距离开赛时间越远，延迟越高。这样做的目的是因为，必发分析临场分析的意义更高;而本站的挂单图由于要及时反应出成交现场的挂单情况，都是实时更新的。</p>
            </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="4">
            <AccordionHeader>为什么有些日期显示有比赛，点开却是暂时无比赛数据</AccordionHeader>
            <AccordionContent>
                <p class="m-0">这种原因是你过早打开比赛，通常开始前12小时以内，您可以看到比赛数据，部分联赛6小时以内可以看到数据。因为过早分析必发数据没有意义。</p>
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>