<template>
    <div class="h-auto border w-full sm:w-[500px] rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D] z-40 bg-white">
        <div class="px-5 py-6 lg:p-[50px] sm:space-y-[40px]">
            <div class="flex justify-start sm:flex-none">
                <img class="mx-auto hidden sm:block" :src="store.state.clientLogo" alt="IIFL-Logo">
                <img @click="backToStage()" class="sm:hidden" src="../../assets/img/login/backNavigation.svg" alt="navigation">
            </div>
            <div>
                <p class="font-bold login-header text-[20px] sm:text-[28px] leading-[40px] pt-[24px] sm:pt-0 text-center text-[#282828]">Verify Email Id</p>
                <p class="font-medium text-center text-[#919191] text-[14px] px-[40px] sm:px-0 lg:text-[16px] pt-[4px] sm:pt-[20px] leading-[21px]">Enter Email ID associated with
                    your business</p>
            </div>
            <form @submit.prevent="onSubmit" autocomplete="off">
                <div class="mt-[40px] sm:mt-0">
                    <label for="email" class="block text-[12px] sm:text-[14px] font-medium leading-[14px] text-secondary">Email ID<span class=" text-[#EB1414]">*</span> </label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <!-- <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
                             <img src="../../assets/img/login/sms.svg"  alt="sms-logo" >
                        </div>
                        <input type="text" name="email" id="email" ref="emailRef" v-model="userDetails" :class="!validateEmailMobile && userDetails !='' ? '' : ''" 
                            class="block w-full rounded-lg md:rounded-[10px] border-0 py-5 pl-12 h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                            placeholder="" @input="resetError()" maxlength="50"/>
                    </div>
                </div>
                <div class="mt-[11px] h-[11px] text-[11px] text-[#EB1414]">
                    <span v-if="errorMsg">{{ errorMsg }}</span>
                    <!-- <span v-if="!validateEmailMobile && userDetails.length">Please Provide Valid Credentials</span> -->
                </div>
                <div class="mt-[8px] sm:mt-[40px]">
                    <button type="submit" :disabled="!validateEmailMobile || loader"  :class="userDetails.length && validateEmailMobile && !loader ? 'bg-[#FAAA38]':'bg-[#DEDEDE] cursor-not-allowed'" class="w-full text-white h-[40px] sm:h-[50px] rounded-lg md:rounded-[10px] text-[16px] sm:text-[20px]">
                        <spinner  v-if="loader" />    
                        <span class="leading-[27px] font-bold" v-if="!loader" >Proceed</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref , onMounted} from 'vue';
import { useStore } from "vuex";
const store =useStore();
const userDetails=ref('');
const regexEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const validateEmailMobile=computed(()=>regexEmail.test(userDetails.value) ? true:false);
const errorMsg = computed(() => store.getters["auth/getErrorMsg"]);
const loader = computed(() => store.getters["auth/getIsLoader"]);
const emailRef = ref()
const onSubmit=()=>{ 
    if(validateEmailMobile.value) {
        store.dispatch("auth/sendPartnerEmailOtp", userDetails.value)
    } else {
        store.commit("auth/setErrMsg", "Invalid Mobile no or Email ID")
    }
    
}

const backToStage=()=>{
    store.commit('setLoginStage','mobileOtpVerification'); 
}
onMounted(()=>{
    emailRef.value ? emailRef.value.focus() : ''
})

const resetError = () => {
    store.commit("auth/setErrMsg", "")
}
</script>
<style>

</style>