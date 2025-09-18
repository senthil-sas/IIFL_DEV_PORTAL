<template>
    <div class="h-auto w-full sm:w-[500px] border rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D]">
        <div class="px-5 py-6 lg:p-[50px] sm:space-y-[40px]">
            <div class="flex justify-start sm:flex-none">
                <img class="mx-auto hidden sm:block" :src="store.state.clientLogo" alt="IIFL-Logo">
                <img class="sm:hidden" @click="backToStage()" src="../../assets/img/login/backNavigation.svg" alt="navigation">
            </div>
            <div class="">
                <div class="font-bold login-header text-[20px] sm:text-[28px]  sm:pt-0 text-center text-[#282828]">Welcome to Partner Portal!</div>
                <div class="font-medium text-center text-[#919191] text-[14px] px-[40px] sm:px-0 lg:text-[16px] pt-4 sm:pt-[20px]">Enter details below to access your account</div>
            </div>
            <form @submit.prevent="onSubmit">
                <div class="mt-[40px] sm:mt-[50px]">
                    <label for="password" class="block text-[12px] sm:text-[14px] font-medium leading-[14px] text-secondary">Password</label>
                    <div class="relative mt-[13px] rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <img class="size-5 md:size-6" src="../../assets/img/login/lockPassword.svg" alt="sms-logo">
                        </div>
                        <input :type="showPassword ? 'text' : 'password'" name="password" id="password" ref="passwordRef" v-model="password"
                            class="block w-full rounded-lg md:rounded-[10px] border-0 px-12 h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm focus:ring-[#83838B]  focus-visible:outline-none" placeholder="" @input="resetError()" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
                            <button @click="viewPassword()" type="button">
                                <img src="../../assets/img/login/HidePassword.svg" class=" cursor-pointer"
                                    v-if="!showPassword" alt="sms-logo">
                                <img src="../../assets/img/login/ShowPassword.svg" class=" cursor-pointer"
                                    v-else alt="sms-logo">
                            </button>
                        </div>
                    </div>
                    <div class="text-end pt-[10px]">
                        <span @click="navigateForgetOtp()"
                        class="text-[#633EE3] text-[11px] sm:text-[14px] font-semibold leading-[16px] cursor-pointer">Forgot Password ?</span>
                    </div>
                </div>
                <div class="mt-1 error-msg" v-if="errorMsg">
                    {{ errorMsg }}
                </div>
                <div class="mt-[32px]">
                    <button type="submit" :disabled="submitEnable || loader" :class="password?.length && !loader ? 'bg-[#FAAA38]' : 'bg-[#DEDEDE] cursor-not-allowed'" class="w-full  text-white h-[40px] sm:h-[50px] rounded-lg md:rounded-[10px] font-bold text-[16px] sm:text-[20px] ">
                        <span class="leading-[21px] sm:leading-[27px]">
                            <spinner  v-if="loader" />    
                            <span class="text-white font-semibold" v-if="!loader" >Proceed</span>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from "vuex";
const store = useStore();
const password = ref('');
let showPassword = ref<Boolean>(false);
const submitEnable = computed(() => password.value.length == 0);
const loader: any = computed(() => store.getters["auth/getIsLoader"]);
const errorMsg: any = computed(() => store.getters["auth/getErrorMsg"]);
const viewPassword = () => {
    showPassword.value = !showPassword.value;
}

const onSubmit = () => {
    // store.commit('setLoginStage', 'otpVerification');
    store.dispatch('auth/passwordVerify', password.value);
}

const backToStage=()=> store.commit('setLoginStage', 'mobile');

const navigateForgetOtp = async () => {
    resetError()
    await store.dispatch('auth/sendForgetOtp', password.value)    
}
const passwordRef = ref()
onMounted(()=>{
    passwordRef.value ? passwordRef.value.focus():''
})

const resetError = () => {
    store.commit('auth/setErrMsg', '')
}
</script>