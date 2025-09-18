<template>
    <div class="h-auto w-[500px] border rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D]">
        <div class="p-[50px]">
            <div>
                <img class="mx-auto" src="../../assets/img/login/Logo.svg" alt="IIFL-Logo">
            </div>
            <div>
                <div class="font-bold text-nowrap text-[30px] text-center leading-[40px] mt-[50px] text-[#282828]">Forgot Password?</div>
                <div class="text-center text-[#919191] text-[16px] mt-[20px] leading-[21px]">Enter OTP Sent to 99XXXXXX68 & ajxx02@gmail.com</div>
            </div>
            <div>
                <div class="mt-[50px]">

                    <div class="relative mt-[13px] rounded-md">
                        <v-otp-input ref="otpInput" class="space-x-[20px] focus:outline-none" input-classes="otp-input"
                            separator=""
                             @input="handleInput" 
                             v-model:value="mobileOtp"
                             id="otp_input`" 
                             :num-inputs="6"
                             :should-auto-focus="true"
                             pattern="[0-9]"
                             inputmode="numeric"
                             input-type="number"
                             :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
                             :placeholder="['', '', '', '', '', '']"
                        />

                    </div>
                    <p class="text-end text-[#B6B6B6] font-semibold pt-[10px] leading-[14px] text-[11px]"> 
                        Resend OTP in
                        <span class="text-[#633EE3] font-semibold">15 sec</span>
                        
                    </p>
                </div>
                <div class="mt-[32px]">
                    <button :class="mobileOtp.length ==6 ? 'bg-[#FAAA38] cursor-pointer' : 'bg-[#DEDEDE] cursor-not-allowed'"
                        class="w-full  text-white h-[50px] rounded-lg md:rounded-[10px] font-bold text-[20px]">
                        <span class="leading-[27px]">Verify</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// import Vue3OtpInput from ".";
const otpInput = ref(null);
const bindValue = ref("");
const mobileOtp = ref("");
const password = ref('')
let showPassword = ref<Boolean>(false);
const viewPassword = (value: boolean) => {
    showPassword.value = value;
}

const handleInput = (value: any) => {
    //   resetError();
    // console.log(value.data, "string")
};
</script>