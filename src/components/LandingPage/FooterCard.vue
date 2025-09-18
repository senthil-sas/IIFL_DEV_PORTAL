<template>
    <div class="w-full relative">
        <div class="relative h-[282px]  lg:h-[430px] mx-auto max-w-7xl">
            <div class="grid items-center h-full">
                <div class="flex z-20 flex-col items-center justify-center ">
                    <img class="w-[154px] lg:w-auto" src="../../assets/img/clientFootLogo.svg" alt="clientFootLogo">
                    <p class="text-white px-5 lg:px-0 text-center text-[36px] lg:text-[55px] leading-10 font-semibold md:mt-[30px] mt-4 md:mb-[50px] mb-[30px]">Power In Your Hands</p>
                    <button @click="individualUserLogin" class="bg-[#FAAA38] text-[16px] lg:text-[20px] text-white w-[130px] h-[40px] lg:w-[180px] lg:h-[50px] font-bold rounded-[10px]">
                        Get Access
                    </button>
                </div>
            </div>
        </div>
        <div class="absolute top-0 -left-6  md:left-0">
            <img class="w-[100px] h-[90px] md:w-[120px] md:h-[90px]" src="../../assets/img/Footer/LeftPattern.svg" alt="pattern">
        </div>
        <div class="absolute bottom-0 right-0 md:right-0">
            <img class="w-[100px] h-[90px] md:w-[120px] md:h-[90px]" src="../../assets/img/Footer/RightPattern.svg" alt="pattern">
        </div>
    </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()

const webPortalRedirectUrl = store.state.webPortalRedirectUrl

const individualUserLogin = () => {
    window.open(webPortalRedirectUrl, "_blank")
}
</script>