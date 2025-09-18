<template>
    <div class="h-auto border w-full sm:w-[500px] rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D]">
        <div class="px-5 py-6 lg:p-[50px] sm:space-y-[40px]">
            <div class="flex justify-start sm:flex-none">
                <img class="mx-auto hidden sm:block" :src="store.state.clientLogo" alt="IIFL-Logo">
                <img @click="backToStage()" class="sm:hidden" src="../../assets/img/login/backNavigation.svg" alt="navigation">
            </div>
            <div>
                <p class="font-bold login-header text-[20px] sm:text-[28px] leading-[40px] pt-[24px] sm:pt-0 text-center text-[#282828]">Enter Company Details</p>
            </div>
            <form @submit.prevent="OnSubmit()">
                <div class="mt-[11px]  text-[11px] h-[11px] text-[#EB1414]"><span v-if="email.length !=0 && !validateEmail">Please Provide Valid Email Id</span></div>
                <div class="mt-[20px]">
                    <label for="company" class="block text-[12px] sm:text-[14px] font-medium leading-[14px] text-secondary">Company Name <span class="text-red-500">*</span></label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <!-- <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
                            <img class="size-5 md:size-6" src="../../assets/img/login/companyLogo.svg"  alt="sms-logo">
                        </div>
                        <input type="text" name="company" id="company" v-model="companyName" required
                            class="block w-full rounded-lg md:rounded-[10px] border-0 py-5 pl-12 h-[40px] sm:h-[50px]  text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm focus:ring-[#83838B] sm:leading-[21px] focus-visible:outline-none"
                            placeholder="" />
                    </div>
                </div>
                <!-- <div class="mt-[11px] h-[11px] text-[11px] text-[#EB1414]"><span  >Please Provide Company Name</span></div> -->
                <div class="mt-[30px]">
                    <label for="website" class="block text-[12px] sm:text-[14px] font-medium leading-[14px] text-secondary">Company Website</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <!-- <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
                             <img class="size-5 md:size-6" src="../../assets/img/login/websiteLogo.svg"  alt="sms-logo">
                        </div>
                        <input type="text" required name="website" id="website" v-model="websiteName"
                            class="block w-full rounded-lg md:rounded-[10px] border-0 py-5 pl-12 h-[40px] sm:h-[50px]  text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm focus:ring-[#83838B] sm:leading-[21px] focus-visible:outline-none"
                            placeholder="" />
                    </div>
                </div>
                <div class="mt-[11px]  text-[11px] h-[11px] text-[#EB1414]" v-if="websiteName.length !=0 && !validateURL" ><span v-if="websiteName.length !=0 && !validateURL" >Please Provide Valid Website</span></div>
                <div class="mt-[30px]">
                    <button type="submit" :class="companyName.length && websiteName.length? 'bg-[#FAAA38]':'bg-[#DEDEDE]'" class="w-full text-white h-[40px] sm:h-[50px] rounded-lg md:rounded-[10px] font-bold text-[16px] sm:text-[20px]">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from "vuex";
const store =useStore();
const email=ref('');
const companyName=ref('');
const websiteName=ref('');
const regexEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const regexFirmName=/^\s*$/;
const regexUrl=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const validateEmail=computed(()=>regexEmail.test(email.value) ? true:false);
// const validateFirm=computed(()=>regexFirmName.test(companyName.value) ? true :false);
const validateURL=computed(()=>regexUrl.test(websiteName.value)? true :false);
const backToStage = ()=> {
    store.commit("setLoginStage","emailOtpVerify");
}
const OnSubmit= async () => {
    const json =  {
        name: companyName.value,
        website: websiteName.value
    }
    await store.commit('auth/setCompanyDetails', json);
    await store.commit('setLoginStage','businessType');
}
</script>