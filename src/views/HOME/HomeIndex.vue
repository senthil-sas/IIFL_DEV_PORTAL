<template>
    <div v-if="isSSO" class="h-screen flex items-center justify-center">
        <BigSpinner v-if="ssoLoader"/>
        <span class="text-red-500" v-else>{{ errorMsg }}</span>
    </div>
    <section v-else>
        <div class="shadow-[0px_8px_10px_10px_#0000000A] sticky top-0 z-30 bg-white">
            <NavBar />
        </div>
        <div class="bg-[#F6F6F6] ">
            <BannerView class="w-full bannerHg" />
            <div id="api"></div>
        </div>
        <div class="mx-auto max-w-7xl">
            <AllApi />
        </div>
        <div class="bg-[#242056] my-[50px]">
            <TradingCards class="mx-auto max-w-7xl h-full md:h-[445px]" />
            <div id="community"></div>
        </div>
        <div class="mx-auto max-w-7xl">
            <ApisApart />
        </div>
        <div class="mx-auto max-w-7xl">
            <KeyPartners />
        </div>
        <div class="bg-[#F4F5FA] mt-[60px] sm:mt-[100px]">
            <SdkDoc />
        </div>
        <div class="mx-auto max-w-7xl mt-[50px] md:mb-[60px] mb-[60px]">
            <FaqQuestions />
        </div>
        <div class="bg-[#242056] w-full">
            <FooterCard class="mx-auto " />
        </div>
        <div>
            <Footer />
        </div>
    </section>
</template>

<script setup lang="ts">
import NavBar from '@/components/LandingPage/NavBar.vue';
import BannerView from '@/components/LandingPage/bannerView.vue';
import AllApi from '@/components/LandingPage/AllApi.vue';
import TradingCards from '@/components/LandingPage/TradingCards.vue';
import ApisApart from '@/components/LandingPage/ApisApart.vue';
import KeyPartners from '@/components/LandingPage/KeyPartners.vue';
import SdkDoc from '@/components/LandingPage/SdkDoc.vue';
import FaqQuestions from '@/components/LandingPage/FaqQuestions.vue';
import FooterCard from '@/components/LandingPage/FooterCard.vue';
import Footer from '@/components/LandingPage/Footer.vue';
const BigSpinner = defineAsyncComponent(() => import("@/components/common/big-spinner.vue"))

import { onMounted, computed, defineAsyncComponent } from "vue"
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute();

const store = useStore();
    
// eslint-disable-next-line no-prototype-builtins
const isSSO = computed(() => route?.query?.hasOwnProperty('authcode') && route?.query?.hasOwnProperty('clientid'))
const ssoLoader = computed(() => store.getters["auth/getSsoLoader"])

onMounted(() => {
    if(isSSO.value) {
        store.commit("auth/setSsoQuery", route?.query)
        const authcode = route?.query.authCode || route?.query.authcode
        const clientid = route?.query.clientid
        store.dispatch("auth/getSsoSession", { clientid: clientid, authcode : authcode, APPSECRET: import.meta.env.VITE_APPSECRET })
    }
})

const errorMsg = computed(() => store.getters['auth/getErrorMsg']);
</script>
<style> 
@media (min-width: 320px) and (max-width: 654px) {
    .bannerHg{
        height: 398px;
    }
}
@media screen and (min-width: 1024px) {
    .bannerHg{
        height: 520px;
    }
}
@media (min-width: 655px) and (max-width:1023px) {
    .bannerHg{
        height: 377px;
    }
} 
</style>