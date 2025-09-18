<template>
    <div class="h-auto w-full sm:w-[500px] border rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D]">
        <div class="px-5 py-6 md:p-[50px]">
            <div class="flex justify-start ">
                <img class="mx-auto hidden sm:block" :src="store.state.clientLogo" alt="IIFL-Logo">
                <img @click="backToStage()" class="sm:hidden" src="../../assets/img/login/backNavigation.svg" alt="navigation">
            </div>
            <div v-if="stage == 'otpVerification'">
                <div class="font-bold login-header text-[20px] sm:text-[30px] text-center leading-[40px] mt-[24px] sm:mt-[50px] text-[#282828]">Welcome to Partner
                    Portal!</div>
                <div class="font-medium text-center text-[#919191] text-[14px] leading-[19px] sm:text-[16px] mt-4 md:mt-5 sm:leading-[21px]">Verify by entering the OTP
                    Sent to <span class="font-bold">{{ getAvatarDetails && getAvatarDetails.Mobile ? getAvatarDetails.Mobile : ''}}</span> & <span class="font-bold">{{ getAvatarDetails && getAvatarDetails.Email ? getAvatarDetails.Email : ''}}</span></div>
            </div>
            <div v-if="stage == 'mobileOtpVerification'">
                <div class="font-bold login-header text-[20px] sm:text-[30px] text-center leading-[40px] mt-[24px] sm:mt-[50px] text-[#282828]">Verify Mobile Number</div>
                <div class="font-medium text-center text-[#919191] text-[14px] leading-[19px] sm:text-[16px] mt-4 md:mt-5 sm:leading-[21px]">Verify by entering the OTP
                    Sent to <span class="font-bold">{{ maskedMobile }}</span> 
                <!-- <span class="font-bold" v-if="!userId"> & {{ "NA" }}</span> -->
            </div>
            </div>
            <div v-else-if="stage == 'forgetPasswordOtp'">
                <div class="font-bold login-header text-[20px] sm:text-[30px] text-center leading-[40px] mt-[24px] sm:mt-[50px]">Forgot Password?
                </div>
                <div class="font-medium text-center text-[#919191] text-[14px] leading-[19px] sm:text-[16px] sm:leading-[21px] mt-4 md:mt-5">Enter OTP Sent to
                    <span class="font-bold">{{ getAvatarDetails && getAvatarDetails.Mobile ? getAvatarDetails.Mobile : ''}}</span> & <span class="font-bold">{{ getAvatarDetails && getAvatarDetails.Email ? getAvatarDetails.Email : ''}}</span></div>
            </div>
            <div v-else-if="stage == 'newAccountPasswordOtp'">
                <div class="font-bold login-header text-[20px] sm:text-[30px] text-center leading-[40px] mt-[24px] sm:mt-[50px]">Create New Account
                </div>
                <div class="font-medium text-center text-[#919191] mt-4 md:mt-5 text-[14px] leading-[19px] sm:text-[16px] sm:leading-[21px]">Verify by entering the OTP
                    Sent to <span class="font-bold">99XXXXXX68</span></div>
            </div>
            <div v-else-if="stage == 'emailOtpVerify'">
                <div class="font-bold login-header text-[20px] sm:text-[30px] text-center leading-[40px] mt-[24px] sm:mt-[50px]">Verify Email Id
                </div>
                <div class="font-medium text-center text-[#919191] mt-4 md:mt-5 text-[14px] leading-[19px] sm:text-[16px] sm:leading-[21px]">Verify by entering the OTP Sent
                    to <span class="font-bold">{{ maskedEmail }}</span> </div>
            </div>
            
            <form @submit.prevent="onSubmit()">
                <div class="mt-[40px] sm:mt-[50px]">
                    <div class="relative mt-[13px] rounded-md">
                        <!-- space-x-[4px] max-[338px]:space-x-[8px] sm:space-x-[20px] -->
                        <!-- <v-otp-input ref="otpInput" class="max-[338px]:gap-1 max-[360px]:gap-2 min-[360px]:gap-3 gap-5 focus:outline-none justify-between" input-classes="otp-input"
                            v-model:value="mobileOtp" id="otp_input`" :num-inputs="6"
                            :should-auto-focus="true"
                            pattern="[0-9]"
                            inputmode="numeric"
                            input-type="number"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
                            :is-input-num="true"
                            :placeholder="['', '', '', '', '', '']" /> -->
                            <v-otp-input
              ref="otpInput"
              class="max-[338px]:gap-1 max-[360px]:gap-2 min-[360px]:gap-3 gap-5 focus:outline-none justify-between no-spinners"
              input-classes="otp-input no-spinners"
              separator=""
              v-model:value="mobileOtp"
              @input="resetError()"
              id="otp_input"
              :num-inputs="6"
              :should-auto-focus="true"
              pattern="[0-9]"
              inputmode="numeric"
              input-type="number"
              :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
              :placeholder="['', '', '', '', '', '']"
            />
                    </div>
                    <div class="flex justify-end">
                        <button type="button" @click="resentOtp()" :disabled="!resendEnable"
                            class="font-semibold ml-auto text-end pt-[10px] leading-[14px] text-[11px] " :class="{ 'text-[#B6B6B6]' : !resendEnable, 'text-[#633EE3]' : resendEnable}">Resend OTP <span v-if="!resendEnable">in</span>
                            <span class="text-[#633EE3] text-[11px] font-semibold" v-if="!resendEnable">&nbsp; {{ otpTime }} sec</span>
                        </button>
                    </div>
                </div>
                <div class="mt-[11px] h-[11px] text-[11px] text-[#EB1414]">
                    <span v-if="errorMsg">{{ errorMsg }}</span>
                </div>
                <div class="mt-[30px] sm:mt-[32px]">
                    <button type="submit" :disabled="!verifyEnable || loader"
                        :class="mobileOtp.length == 6 && !loader ? 'bg-[#FAAA38] cursor-pointer' : 'bg-[#DEDEDE] cursor-not-allowed'"
                        class="w-full text-white h-[40px] sm:h-[50px] rounded-lg md:rounded-[10px]  text-[16px] sm:text-[20px]">
                        <spinner  v-if="loader" />    
                        <span
            class="leading-[27px] font-bold"
            v-if="!loader"
            >Verify</span
          >
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from "vuex";
// import { useRouter } from 'vue-router'
// const router = useRouter()
const store = useStore();
const otpInput = ref(null);
// const bindValue = ref("");
const mobileOtp = ref("");
const otpTime = ref(15);
const stage = computed(() => store.getters['getLoginStage']);
const loader: any = computed(() => store.getters["auth/getIsLoader"]);
const errorMsg = computed(() => store.getters["auth/getErrorMsg"]);
const userId = computed(() => store.getters["auth/getUserId"]);
const maskedEmail = computed(() => store.getters["auth/getMaskedEmail"]);
const getAvatarDetails = computed(() => store.getters["auth/getAvatarDetails"]);
const maskedMobile = computed(() => store.getters["auth/getMaskedMobile"]);
const userMailId = computed(() => store.getters["auth/getUserMailId"]);

let timer: any = null;
// const isEnable = ref(true);
const isDisabled = ref(false);

watch(mobileOtp, (newVal) => {
    if (newVal) {
        resetError()
    }
})
const verifyEnable = computed(() => mobileOtp.value.length == 6 ? true : false);
const resendEnable = computed(() => otpTime.value == 15 ? true : false);
const onSubmit = () => {
    if (stage.value == 'forgetPasswordOtp') {
        store.dispatch('auth/verifyForgetOtp', mobileOtp.value ).finally(()=>{
            mobileOtp.value = ''
        })
    }
    else if (stage.value == 'newAccountPasswordOtp') {
        store.commit('setLoginStage', 'createNewPartner');
    }
    else if(stage.value=='emailOtpVerify'){
        // store.commit('setLoginStage', 'createNewPartner');
        store.dispatch("auth/verifyPartnerEmailOtp", mobileOtp.value)
    }
    else if(stage.value=='mobileOtpVerification'){
        store.dispatch("auth/verifyPartnerMobilOtp", mobileOtp.value)
    }
    else if(stage.value=='otpVerification'){
        // router.push({ name: 'myapps' });
        store.dispatch('auth/otpVerify', mobileOtp.value );
    }
    
}

const backToStage=()=>{
    if (stage.value == 'forgetPasswordOtp') {
        store.commit('setLoginStage', 'password');
    }
    else if (stage.value == 'newAccountPasswordOtp') {
        store.commit('setLoginStage', 'createNewPartner');
    }
    else if(stage.value=='otpVerification'){
        store.commit('setLoginStage', 'otpVerification');
    }
    else if(stage.value=='emailOtpVerify'){
        store.commit('setLoginStage', 'emailVerify');
    }
    else if(stage.value == 'mobileOtpVerification'){
        store.commit('setLoginStage', 'partnerNotFound');
    }
}

const updateTimer = () => {
    if (otpTime.value > 1) {
        otpTime.value = --otpTime.value;
    }
    else {
        clearInterval(timer);
        otpTime.value = 15;
        timer = null;
        isDisabled.value = false
    }
}

const resentOtp = async() => {
    resetError()
    if(stage.value == 'mobileOtpVerification') {
        store.dispatch("auth/sendPartnerMobilOtp", userId.value).finally(() => initiateTimer())
    } else if(stage.value == "otpVerification") {
        store.dispatch("auth/resendOtp").finally(() => initiateTimer())
    } else if(stage.value == "emailOtpVerify") {
        store.dispatch("auth/sendPartnerEmailOtp", userMailId.value).finally(() => initiateTimer())
    }else if(stage.value == "forgetPasswordOtp") {
        store.dispatch("auth/sendForgetOtp", userId.value).finally(() => initiateTimer())
    }
}

const initiateTimer = ()  => {
    if (isDisabled.value) return ;
    isDisabled.value = true;
    timer = setInterval(updateTimer, 1000);
}

onMounted(() => {
    initiateTimer();
})

const resetError = () => {
    store.commit("auth/setErrMsg", "")
}

</script>