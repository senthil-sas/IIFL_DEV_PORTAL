<style>
@media screen and (max-width:346px) {
    .bannerCardWd{
        top: 234px
    }
}
@media (min-width:347px) and (max-width:654px) {
    .bannerCardWd{
        top: 214px
    }
}
@media (min-width:655px) and (max-width:1023px) {
    .bannerCardWd{
        top: 193px
    }
}
@media (min-width:1024px){
    .bannerCardWd{
        top: 449px
    }
}
/* 347 - 214
.bannerCardWd{
    top: ;
} */
/* top-[234px] md:top-[204px] lg:top-[449px] */
</style>
<template>
    <div class="mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl relative">
        <div class="flex justify-center px-4 lg:px-0  lg:justify-between items-start pt-[30px]  lg:items-center h-full relative">
            <div class="text-[#57585B] lg:w-1/2">
                <p class="font-bold  text-[#363636] text-[32px] leading-[43px] lg:leading-[81px] lg:text-[60px]">IIFL Markets’ APIs</p>
                <p class="text-[14px] lg:text-[20px] leading-[20px] lg:leading-[30px] font-normal">Kickstart your algorithmic trading journey within
                    minutes using IIFL Markets’ APIs, at <span
                        class="font-bold">ZERO
                        cost.</span></p>
                <!-- <p class="text-[14px] leading-[20px] lg:text-[20px] lg:leading-[30px] font-normal"> 
                </p> -->
                <button @click="individualUserLogin" type="button"
                    class="inline-flex w-[150px] my-[30px] h-[40px] font-bold justify-center items-center text-white gap-x-1.5 rounded-lg md:rounded-[10px] bg-[#FAAA38] px-3 py-2 text-sm  shadow-sm ring-1 ring-inset ring-[#FAAA38] hover:bg-[#FAAA38]">
                    Get Access
                </button>
            </div>
            <div class="lg:flex item-center justify-center hidden w-1/2">
                <img src="/src/assets/img/New_Banner.gif" class="pb-5 h-[540px] w-[540px] relative top-[-40px]" alt="Banner-Image">
            </div>
        </div>
            <div class="absolute w-full lg:h-[130px] bannerCardWd">
                <div
                    class="h-full mx-4 md:mx-0 bg-white rounded-[20px] shadow-[0px_8px_60px_0px_#E2E2E2B2] p-[30px] lg:py-0 grid sm:grid-cols-1 grid-cols-1 lg:grid-cols-3 justify-evenly divide-y  gap-y-8">
                    <div class="flex  justify-center items-center space-x-5 lg:space-x-4 relative">
                        <div>
                            <img class="w-[40px] lg:auto" src="@/assets/img/secure.svg" alt="secure">
                        </div>
                        <div>
                            <p class="font-bold text-[22px] text-[#282828] lg:text-[24px]">25+ Years</p>
                            <p class="text-[16px] text-[#919191] font-semibold">Trust & Service</p>
                        </div>
                        <span class="h-[51px] lg:border right-0 absolute"></span>
                    </div>
                    <div class="flex pt-[30px] lg:py-0 justify-center items-center space-x-5 lg:space-x-4 relative">
                        <div>
                            <img class="w-[40px] lg:auto" src="@/assets/img/profile.svg" alt="profile">
                        </div>
                        <div>
                            <p class="font-bold text-[22px] text-[#282828] lg:text-[24px]">25 Lakhs+</p>
                            <p class="text-[16px] text-[#919191] font-semibold">Active Customers</p>
                        </div>
                        <span class="h-[51px] lg:border right-0 absolute"></span>
                    </div>
                    <div class="flex pt-[30px] lg:py-0 justify-center items-center space-x-5 lg:space-x-4">
                        <div>
                            <img class="w-[40px] lg:auto" src="@/assets/img/review.svg" alt="reviews">
                        </div>
                        <div>
                            <p class="font-bold text-[22px] text-[#282828] lg:text-[24px]">4.4+ </p>
                            <p class="text-[16px] text-[#919191] font-semibold">Average App Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        
    </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
const webPortalRedirectUrl =  store.state.webPortalRedirectUrl
const individualUserLogin = () => {
    window.open(webPortalRedirectUrl, '_blank')
}
</script>
<style></style>