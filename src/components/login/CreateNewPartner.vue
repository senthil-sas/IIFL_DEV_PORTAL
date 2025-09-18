<template>
    <div class="h-auto border w-full sm:w-[500px] rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D] z-[999] bg-white">
        <div class="px-5 py-6 lg:p-[50px] sm:space-y-[40px]">
            <div class="flex justify-start sm:flex-none">
                <img class="mx-auto hidden sm:block" :src="store.state.clientLogo" alt="IIFL-Logo">
                <img class="sm:hidden" src="../../assets/img/login/backNavigation.svg" alt="navigation">
            </div>
            <div>
                <p class="font-bold login-header text-lg sm:text-2xl leading-[40px] pt-[24px] sm:pt-0 text-center text-[#282828]">Partner Not Found!</p>
                <p class="font-medium text-center text-[#919191] text-[14px]  lg:text-[16px] pt-4 sm:pt-[20px] leading-[21px]">Your Mobile No./Email ID is
                    not associated with IIFL. Please create a new account or try with different Mobile No./ Email ID</p>
            </div>
            <div>
                <div class="mt-[30px] sm:mt-0">
                    <label for="mobile" class="block text-[12px] sm:text-[14px] font-medium leading-[14px] text-secondary">Mobile Number</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <!-- <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
                            <img src="../../assets/img/login/sms.svg" alt="sms-logo">
                        </div>
                        <input type="text" name="mobile" id="mobile" v-model="userDetails"
                            :class="!validateEmailMobile && errorMsg ? 'focus:ring-[#EB1414]' : ''"
                            class="block w-full rounded-lg md:rounded-[10px] border-0 py-5 pl-12 h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                            placeholder="" maxlength="10" @input="digitKeyOnly($event)"/>
                    </div>
                </div>
                <div class="mt-[11px] h-[11px] text-[11px] text-[#EB1414]">
                    <span v-if="errorMsg">{{ errorMsg }}</span>
                    <!-- <span v-else-if="!validateEmailMobile && userDetails.length">Please Provide Valid Credentials</span> -->
                </div>
                <div class="mt-[30px] sm:mt-[40px]">
                    <button :disabled="loader" type="button" @click="onSubmit"
                        :class="userDetails.length && !loader ? 'bg-[#FAAA38]' : 'bg-[#DEDEDE]'" class="w-full text-white h-[40px] sm:h-[50px] rounded-lg md:rounded-[10px] text-[16px] sm:text-[20px]">
                        <spinner v-if="loader" />    
                        <span class="leading-[27px] font-bold" v-if="!loader" >Create New Account</span>
                    </button>
                </div>
                <div class="text-center pt-[32px]">
                    <span class=" text-[12px] text-[#633EE3] font-semibold cursor-pointer" @click="goBack()">Login with different Mobile No./Email
                        ID</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from "vuex";
const store = useStore();
const userDetails = ref('');
// const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexMobile = /^[0-9]{10}$/;
const validateEmailMobile = computed(() => regexMobile.test(userDetails.value) ? true : false);
const loader = computed(() => store.getters["auth/getIsLoader"]);
const errorMsg = computed(() => store.getters["auth/getErrorMsg"]);
const onSubmit = () => {
    if(validateEmailMobile.value) {
        store.dispatch("auth/sendPartnerMobilOtp", userDetails.value)
    } else {
        store.commit("auth/setErrMsg", "Invalid Mobile no or Email ID")
    }
}

const goBack = () => {
    store.commit('auth/setErrMsg', '')
    store.commit('auth/setUserId', '')
    store.commit('setLoginStage', 'mobile')
}

const digitKeyOnly = (event:any) => {
    // Allow only numeric values in the input field
    event.target.value = event.target.value?.toString()?.replace(/[^0-9]/g, '')
    userDetails.value = event.target.value ? event.target.value : ''
    store.commit("auth/setErrMsg", '')
}

</script>