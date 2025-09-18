<template>
    <div class=" relative lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl pt-[50px] pb-[30px] md:pb-[50px] md:py-0">
        <div class="flex justify-center">
            <p class="text-white font-bold text-center text-[22px] lg:text-[40px] md:absolute md:top-[80px]">APIs For Everyone</p>
        </div>
        <div class="pt-[30px] md:pt-[50px] md:pt-0">
            <div class="grid lg:px-0 px-5 gap-y-5 md:grid-cols-2 gap-x-[40px] md:absolute md:top-[180px] place-items-center md:left-[17%] ">
                <div @click="handleNavigation(data)" v-for="data in tradersCards" :key="data.name" class="cursor-pointer bg-white px-[20px] pt-[20px] pb-[30px] rounded-[20px] shadow-[0px_06px_18px_0px_#6A669C1A] max-w-[400px]">
                   <div class="grid place-content-between h-full gap-[20px] md:gap-[30px]">
                    <div>
                        <div>
                        <img class="mx-auto w-full" :src="data.img" alt="">
                    </div>
                    <div class="mt-[20px] md:mb-[20px] mb-[16px]">
                        <p class="text-[#363636] text-[18px] lg:text-[20px] font-bold">{{ data.name }} </p>
                    </div>
                    <div>
                        <p class="text-[16px] leading-6 text-[#565656] font-medium">{{ data.line }} </p>
                    </div>
                    </div>

                    <div>
                        <div class="flex items-center">
                            <p class="text-[#633EE3] inline-block font-semibold">Get Access</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none" class="ml-2">
<path d="M1 11.5L6 6.4997L1 1.5" stroke="#633EE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        </div>
                    </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InduatualTraders from '@/assets/img/individual_traders.svg';
import AlgoTraders from '@/assets/img/algo-traders.svg';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import NonTraders from '../../assets/img/non-traders.svg'

const store = useStore()

const webPortalRedirectUrl = store.state.webPortalRedirectUrl
const tradersCards = ref([
    {
        id: 0,
        img: InduatualTraders,
        name: 'Individual Trader',
        line: 'For tech-savvy, methodical traders who actively trade on a personal level.',
        link: webPortalRedirectUrl
    },
    {
        id: 1,
        img: AlgoTraders,
        name: 'Trading Platforms',
        line: 'For platforms offering algo strategy marketplaces, DIY strategies, back testing, charting, and other trading services.',
        link: store.state.devPortalRedirectUrl
    },
    // {
    //     id: 2,
    //     img: NonTraders,
    //     name: 'Non-Trading Platforms',
    //     line: 'For platforms that manage client portfolios, offer tax filing services, or handle other financial reporting needs.',
    // }
]);

// const router = useRouter()
const handleNavigation = (data:any) => {
    // if(data.id == 0) {
    //     window.open(data.link, "_blank")
    // } else {
    //     router.push(data.link)
    // }
    window.open(data.link, "_blank")
}
</script>
<style></style>