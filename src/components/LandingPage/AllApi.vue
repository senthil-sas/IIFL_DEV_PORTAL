<template>
   <div class="px-4">
    <div  class="mt-[240px] lg:mt-[159px]">
        <p class="text-[#282828] font-bold text-[22px] lg:text-[40px] text-center">APIs For All Your Needs</p>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[25px] mt-[30px] mx-auto lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <div v-for="data in displayedApiCards" :key="data.name" :class="data.hover_colour" class="h-auto w-full block sm:hidden p-[20px] md:p-[30px] rounded-[20px]  shadow-[0px_0px_70px_0px_#E2E2E280] mx-auto">
            <div class="grid place-content-between h-full gap-[20px] md:gap-[30px]">
                <div>
                    <div>
                    <img :src="data.img" :alt="data.name">
                </div>
                <div class="mt-5">
                    <p class="text-[#363636] font-bold text-[18px] lg:text-[20px] ">{{ data.name }}</p>
                    <p class="text-[16px] text-[#565656] font-medium">{{ data.line }}</p>
                </div>
                </div>
                <!-- <div class="flex items-center">
                    <p class="text-[#633EE3] inline-block text-[16px] font-semibold">Explore</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none" class="ml-2">
<path d="M1 11.5L6 6.4997L1 1.5" stroke="#633EE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </div> -->
            </div>
        </div>
        <div v-for="data in apiCards" :key="data.name" :class="data.hover_colour" class="h-auto w-full hidden sm:block p-[30px] rounded-[20px]  shadow-[0px_0px_70px_0px_#E2E2E280] mx-auto">
            <div class="grid place-content-between h-full gap-[30px]">
                <div>
                    <div>
                    <img :src="data.img" :alt="data.name">
                </div>
                <div class="mt-5">
                    <p class="text-[#363636] font-bold text-[18px] lg:text-[20px] ">{{ data.name }}</p>
                    <p class="text-[16px] text-[#565656] font-medium">{{ data.line }}</p>
                </div>
                </div>
                <!-- <div class="flex items-center">
                    <p class="text-[#633EE3] inline-block text-[16px] font-semibold">Explore</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none" class="ml-[6px]">
<path d="M1 11.5L6 6.4997L1 1.5" stroke="#633EE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </div> -->
            </div>
        </div>
    </div>
        <div class="sm:hidden  flex items-center justify-center mt-[21px]">
            <button class="flex items-center justify-center" type="button" @click="showAll = !showAll">
                <span class="text-[#633EE3] text-[16px] font-semibold mr-[6px]">View {{ !showAll ? "All 6":'Less' }} </span>
                <svg v-if="showAll" xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
<path d="M13 7L7 1L1 7" stroke="#633EE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                <svg v-else  xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
<path d="M13 1L7 7L1 1" stroke="#633EE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
        </div>
   </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import OrederManagement from '@/assets/img/orderManagement.svg';
import MarketData from '@/assets/img/realTimeMarket.svg';
import HistoricData from '@/assets/img/historic.svg';
import OrederTracking from '@/assets/img/orderTracking.svg';
import OrederPortfolio from '@/assets/img/portfolio.svg';
import TakesBills from '@/assets/img/taxesBills.svg';

const apiCards = ref([{
    id: 0,
    name: 'Order Management',
    img: OrederManagement,
    line: 'Place, modify and cancel orders in real-time.',
    hover_colour: 'hover:border-[#F56B8C] border-2 border-[#ffffff]'
},
{
    id: 1,
    name: 'Real-Time Market Data',
    img: MarketData,
    line: 'Access live market data, including prices, volumes and depth.',
    hover_colour: 'hover:border-[#76E270] border-2 border-[#ffffff]'
},
{
    id: 2,
    img: HistoricData,
    name: 'Historical Data',
    line: 'Back-test your algo strategies with our historical candlestick data API.',
    hover_colour: 'hover:border-[#FDA50D] border-2 border-[#ffffff]'
},
{
    id: 3,
    name: 'Order Tracking',
    img: OrederTracking,
    line: 'Track the order status either via APIs or Feed in real-time.',
    hover_colour: 'hover:border-[#5FCBFF] border-2 border-[#ffffff]'
},
{
    id: 4,
    name: 'Portfolio Management',
    img: OrederPortfolio,
    line: 'Get current portfolio holdings and positions',
    hover_colour: 'hover:border-[#F37921] border-2 border-[#ffffff]'
}, 
{
    id: 5,
    name: 'Taxes and Bills',
    img: TakesBills,
    line: 'Access tax statements, billing information, and transaction summaries.',
    hover_colour: 'hover:border-[#05C5BC] border-2 border-[#ffffff]'
}
])
const showAll = ref(false);

const displayedApiCards = computed(() => {
    return showAll.value ? apiCards.value : apiCards.value.slice(0, 3);
});

</script>
<style></style>