<template>
    <div v-if="isSSO && ssoLoader" class="h-screen flex justify-center items-center">
        <BigSpinner/>
    </div>
    <div v-else class="mx-auto max-w-7xl h-dvh sm:h-screen" >
        <div class="w-full sm:h-full flex sm:flex-col pt-20 sm:pt-0 justify-center items-center">
            <div v-if="getstageMsg == null" class="grid xl:grid-cols-2 item-center sm:justify-center w-full">
                <div class="flex sm:items-start mx-5">
                    <LoginView v-if="stage == 'mobile'" />
                    <Password v-else-if="stage == 'password'"/>
                    <OtpVerification v-else-if="stage == 'otpVerification'|| stage == 'mobileOtpVerification' || stage == 'forgetPasswordOtp' || stage == 'newAccountPasswordOtp' || stage =='emailOtpVerify'" />
                    <!-- <ForgetPassword  /> -->
                    <SetNewPassword v-else-if="stage == 'setNewPassword' || stage == 'newPasswordForPartner'" />
                    <PartnerNotFound v-else-if="stage == 'partnerNotFound'" />
                    <CreateNewAccount v-else-if="stage == 'createNewPartner'" />
                    <BusinessType v-else-if="stage == 'businessType'" />
                    <EmailVerify v-else-if="stage == 'emailVerify'" />
                </div>
                <div class="hidden xl:flex flex-col justify-center items-center space-y-10 ">
                    <div class="h-[380px] flex justify-center">
                        <img src="../assets/img/login/login-banner.svg" alt="IIFL-Logo">
                    </div>
                    <div class="grid">
                        <span class="font-bold text-center text-[22px] mb-4">Let's build something extraordinary together</span>
                        <span class="text-center text-[#919191] text-[16px] font-medium h-[36px]">
                            Unlock new possibilities by seamlessly integrating with our cutting-edge trading and market
                            feed APIs.</span>
                    </div>
                </div>
            </div>
            <SuccessMessage v-else />
        </div>
        <div>
            <div class="absolute w-full sm:hidden left-0 bottom-0 right-0 flex justify-end">
                <img src="../assets/img/login/mobileRightPattern.svg" alt="left-pattern">
            </div>
            <div class="absolute w-full hidden sm:block left-0 bottom-0">
                <img src="../assets/img/login/pattern-left.svg" alt="left-pattern">
            </div>
            <div class="absolute w-full hidden  top-0 right-0 sm:flex justify-end">
                <img src="../assets/img/login/pattern-right.svg" alt="left-pattern">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import { computed, defineAsyncComponent, onMounted } from 'vue';
import { useRoute } from "vue-router";
const route = useRoute()

const LoginView = defineAsyncComponent(() => import("@/components/login/Login.vue"))
const Password = defineAsyncComponent(() => import("@/components/login/Password.vue"))
const OtpVerification = defineAsyncComponent(() => import("@/components/login/OtpVerification.vue"))
// const ForgetPassword = defineAsyncComponent(() => import("@/components/login/ForgetPassword.vue"))
const SetNewPassword = defineAsyncComponent(() => import("@/components/login/SetNewPassword.vue"))
const SuccessMessage = defineAsyncComponent(() => import("@/components/login/SuccessMessage.vue"))
const PartnerNotFound = defineAsyncComponent(() => import("@/components/login/CreateNewPartner.vue"))
const CreateNewAccount = defineAsyncComponent(() => import("@/components/login/CreateNewAccount.vue"))
const BusinessType = defineAsyncComponent(() => import("@/components/login/BusinessType.vue"))
const EmailVerify = defineAsyncComponent(() => import("@/components/login/EmailVerify.vue"))
const BigSpinner = defineAsyncComponent(() => import("@/components/common/big-spinner.vue"))

const store = useStore();
const stage = computed(() => store.getters["getLoginStage"]);
const getstageMsg = computed(() => store.getters['getstageMsg']);
const ssoLoader = computed(() => store.getters["auth/getSsoLoader"])

// eslint-disable-next-line no-prototype-builtins
const isSSO = computed(() => route?.query?.hasOwnProperty('authcode') && route?.query?.hasOwnProperty('clientid'))

onMounted(() => {
    store.commit("resetState")
    store.commit("auth/resetState")
    if(isSSO.value) {
        store.commit("auth/setSsoQuery", route?.query)
        const authcode = route?.query.authCode || route?.query.authcode
        const clientid = route?.query.clientid
        store.dispatch("auth/getSsoSession", { clientid: clientid, authcode : authcode, APPSECRET: import.meta.env.VITE_APPSECRET })
    }
})

</script>
<style scoped>

</style>