<template>
    <div class=" md:mt-[300px]">
        <p class="font-bold px-5 lg:px-0 text-[22px] lg:text-[40px] text-[#282828] text-center capitalize">What sets our trading APIs apart</p>
    </div>
    <div class="mt-[50px]">
        <div class="lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
            <div class="grid px-5 lg:px-0 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] ">
                <div v-for="data in apiCards" :key="data.id" class="h-auto sm:hidden bg-[#F4F5FA] rounded-[20px] py-[30px]  md:py-12 px-12">
                    <div>
                        <img class="mx-auto" :src="data.img" :alt="data.name">
                    </div>
                    <div class="py-2 md:py-3 font-bold text-center text-[18px] text-[#363636] ">
                        {{ data.name }}
                    </div>
                    <div class="text-center text-[16px] text-[#565656] font-medium">{{ data.line }}
                    </div>
                </div>
                <div v-for="data in apiApart" :key="data.id" class="h-auto hidden sm:block bg-[#F4F5FA] rounded-[20px] p-12">
                    <div>
                        <img class="mx-auto" :src="data.img" :alt="data.name">
                    </div>
                    <div class="py-3 font-bold text-center text-[18px] text-[#363636]">{{ data.name }}
                    </div>
                    <div class="text-center text-[16px] text-[#565656] font-medium">
                        {{ data.line }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="sm:hidden  flex items-center justify-center mt-[21px]">
            <button class="flex items-center justify-center" type="button" @click="showAll = !showAll">
                <span class="text-[#633EE3] text-[16px] font-semibold mr-[6px]">View {{ !showAll ? "All 6":'Less' }} </span>
                <svg v-if="showAll" xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
<path d="M13 7L7 1L1 7" stroke="#633EE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
<path d="M13 1L7 7L1 1" stroke="#633EE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import ZeroCost from '@/assets/img/Apart_API/zero_cost.svg';
import Unlimited from '@/assets/img/Apart_API/unlimited.svg';
import ExceptionalLimit from '@/assets/img/Apart_API/exceptional_limit.svg';
import UltraLow from '@/assets/img/Apart_API/ultra_low.svg';
import Secure from '@/assets/img/Apart_API/secure.svg';
import IntegrationMinutes from '@/assets/img/Apart_API/integrate_minutes.svg';

import { computed, ref } from 'vue';
const showAll = ref(false);
const apiApart:any = ref([
    {
        id: 0,
        name: 'ZERO Cost',
        img: ZeroCost,
        line: 'Deploy your trading strategies with IIFL Markets APIs for free '
    },
    {
        id: 1,
        name: 'Ultra-Low Latency',
        img: UltraLow,
        line: "Experience industry's one of the fastest order execution speeds"
    },
    {
        id: 2,
        name: 'Integrate In Minutes',
        img: IntegrationMinutes,
        line: 'Get market feed and place your first trade in minutes'
    },
    {
        id: 3,
        name: 'Exceptional Rate Limits',
        img: ExceptionalLimit,
        line: 'Forget execution failures with our 20 requests per second rate limit'

    },
    {
        id: 4,
        name: 'Robust Instrument Subscriptions',
        img: Unlimited,
        line: 'Subscribe to up to 4,000 instruments per client with our advanced and reliable market data feed.'
    },
    {
        id: 5,
        name: 'Secure. Encrypted. Protected.',
        img: Secure,
        line: 'No more security woes with our advanced encryption and robust protocols'
    }
]);

const apiCards = computed(() =>  showAll.value ? apiApart.value : apiApart.value.slice(0, 3));
</script>
<style></style>