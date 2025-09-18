<template>
    <div></div>
    <!-- <div class="mt-[50px] md:mt-[60px] md:mt-[200px] ">
        <div>
            <p class="font-bold px-4 md:px-0 text-[22px] lg:text-[40px] text-center text-[#282828]">Key Partners Powered By IIFL
                Markets’ APIs</p>
        </div>
        <div class="px-2 hidden lg:block lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-x-auto">
            <div class="my-[33px] md:my-[50px] grid grid-cols-5 md:gap-y-8 p-0 relative ">
                <div class="relative  border-r-2 border-[#E4E4E4] last-of-type:border-0"
                    v-for="data in keyPartners" :key="data.id">
                    <div class="w-full">
                        <img class="mx-auto md:h-[30px] xl:h-auto" :src="data.img" alt="client logo">
                    </div>
                </div>
            </div>
        </div>
        <div class="px-4 lg:hidden lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-x-auto">
            <div class="my-[33px] md:my-[50px] grid grid-cols-3 md:gap-y-8 p-0 relative ">
                <div class="relative  border-r-2 border-[#E4E4E4] last-of-type:border-0" v-for="data in mobileKeyPartners" :key="data.id">
                    <div class="w-full">
                        <img class="mx-auto h-[18px] md:h-[30px] xl:h-auto" :src="data.img" alt="client logo">
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <button @click="navigateTo()"
                class="bg-[#FAAA38] text-[16px] lg:text-[20px] text-white w-[170px] lg:w-[280px] font-bold rounded-[10px] h-[50px]">
                View All Partners
            </button>
        </div>
    </div> -->
</template>
<script setup lang="ts">
// import TradingViews from '../../assets/img/PartnerLogo/tradingView.svg';
// import TradingLyne from '../../assets/img/PartnerLogo/TrendLyne.svg';
// import SmallCase from '../../assets/img/PartnerLogo/smallCase.svg';
// import GrowBox from '../../assets/img/PartnerLogo/GroBox Logo.svg';
// import GoldenPi from '../../assets/img/PartnerLogo/goldenPi.svg';
// import { ref } from 'vue';
// import { useRouter } from 'vue-router'
// const router = useRouter();

// const keyPartners = ref([
//     {
//         id: 0,
//         img: TradingViews
//     },
//     {
//         id: 1,
//         img: TradingLyne
//     },
//     {
//         id: 2,
//         img: SmallCase
//     },
//     {
//         id: 3,
//         img: GrowBox
//     },
//     {
//         id: 4,
//         img: GoldenPi
//     },
// ]);

// const mobileKeyPartners = ref([
//     {
//         id: 0,
//         img: TradingViews
//     },
//     {
//         id: 1,
//         img: TradingLyne
//     },
//     {
//         id: 2,
//         img: SmallCase
//     }
// ]);

// const navigateTo = () => {
//     router.push('/key_partners')
// }

</script>
<style></style>