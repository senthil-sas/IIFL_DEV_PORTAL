<template>
    <div class="h-auto w-full sm:w-[500px] border rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D] z-[999] bg-white">
        <div class="px-5 pt-6 pb-[50px] lg:p-[50px]">
            <div class="flex justify-start sm:flex-none">
                <img class="mx-auto hidden sm:block" :src="store.state.clientLogo" alt="IIFL-Logo">
                <img @click="backToStage()" class="sm:hidden" src="../../assets/img/login/backNavigation.svg"
                    alt="navigation">
            </div>
            <div v-if="stage == 'setNewPassword'">
                <div
                    class="font-bold login-header text-lg sm:text-2xl text-center leading-[40px] mt-2 sm:mt-3 text-[#282828]">
                    Set New Password
                </div>
                <div class="font-medium text-center text-[#919191] text-[16px] mt-3 sm:mt-4 leading-[21px]">Please enter
                    a
                    new password
                </div>
            </div>
            <div v-else-if="stage == 'newPasswordForPartner'">
                <div
                    class="font-bold login-header text-lg sm:text-2xl text-center leading-[40px] mt-[8px] sm:mt-[50px] text-[#282828]">
                    Set New Password
                </div>
                <div class="font-medium text-center text-[#919191] text-[16px] mt-[8px] sm:mt-[20px] leading-[21px]">
                    Please enter a
                    new password
                </div>
            </div>
            <form @submit.prevent="onSubmit()">
                <div class="mt-4 sm:mt-7">
                    <label for="password"
                        class="block text-[12px] leading-[16px] sm:text-[14px] font-medium  text-secondary sm:leading-[19px]">New
                        Password</label>
                    <div class="relative mt-[10px] md:mt-[13px] rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <img class="size-5 md:size-6" src="../../assets/img/login/lockPassword.svg" alt="sms-logo">
                        </div>

                        <input :type="showPassword ? 'text' : 'password'" name="password" id="password"
                            ref="passwordRef" v-model="password"
                            class="block w-full rounded-lg md:rounded-[10px] border-0 px-12 h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm focus:ring-[#83838B]  focus-visible:outline-none"
                            placeholder="" maxlength="12" @input="strengthValidation(), enableButton()"/>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
                            <button type="button" @click="viewPassword()">
                                <img src="../../assets/img/login/HidePassword.svg" class=" cursor-pointer"
                                    v-if="!showPassword" alt="sms-logo">
                                <img src="../../assets/img/login/ShowPassword.svg" class=" cursor-pointer" v-else
                                    alt="sms-logo">
                            </button>
                        </div>
                    </div>
                </div>
                <!-- <div class="flex flex-col mt-2 sm:mt-[14px]">
                    <div class="flex">
                        <div class="flex space-x-[59px]">
                            <div v-if="newPasswordValidation?.validChar" class="flex space-x-[5px]">
                                <img src="../../assets/img/login/enableTick.svg" alt="enable-Icon">
                                <span :class="newPasswordValidation?.validChar ? 'text-[#ACACAC]' : 'text-[#D2D5DF]'"
                                    class="text-[11px]  font-medium">8 - 12 Characters </span>
                            </div>
                            <div v-else class="flex space-x-[5px]">
                                <img src="../../assets/img/login/disableTick.svg" alt="enable-Icon">
                                <span class="text-[11px] text-[#D2D5DF] font-medium">8 - 12 Characters</span>
                            </div>
                            <div v-if="newPasswordValidation?.atleastNo" class="flex space-x-[5px]">
                                <img src="../../assets/img/login/enableTick.svg" alt="enable-Icon">
                                <span :class="newPasswordValidation?.validChar ? 'text-[#ACACAC]' : 'text-[#D2D5DF]'"
                                    class="text-[11px]  font-medium">Atleast 1 Number</span>
                            </div>
                            <div v-else class="flex space-x-[5px]">
                                <img src="../../assets/img/login/disableTick.svg" alt="enable-Icon">
                                <span class="text-[11px] text-[#D2D5DF] font-medium">Atleast 1 Number</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-[8px] sm:mt-[12px]">
                        <div v-if="newPasswordValidation.noSpaceDots" class="flex space-x-[5px]">
                            <img src="../../assets/img/login/enableTick.svg" alt="enable-Icon">
                            <span :class="newPasswordValidation?.noSpaceDots ? 'text-[#ACACAC]' : 'text-[#D2D5DF]'"
                                class="text-[11px]  font-medium">Do not have space & dots</span>
                        </div>
                        <div v-else class="flex space-x-[5px]">
                            <img src="../../assets/img/login/disableTick.svg" alt="enable-Icon">
                            <span class="text-[11px] text-[#D2D5DF] font-medium">Do not have space & dots</span>
                        </div>
                    </div>
                </div> -->
                <div class="grid text-xs text-[#C2BFCD] grid-cols-2 py-1 justify-between min-h-3">
                    <div v-for="(item, index) in validationArray" :key="index" class="mb-1"
                        :class="{ 'col-span-2': index == 4 }">
                        <div class="flex gap-1 items-center">
                            <icons :name="'tick'" :color="item.active ? '#5438A0' : '#C2BFCD'"></icons>
                            <span class="whitespace-nowrap"
                                :class="item.active ? 'font-semibold text-[#9992B1]' : 'text-[#C2BFCD]'">{{ item.name
                                }}</span>
                        </div>
                    </div>
                </div>

                <div class="mt-3 md:mt-5">
                    <label for="newPassword"
                        class="block sm:text-[14px] font-medium  text-secondary sm:leading-[19px] text-[12px] leading-[16px]">Re-enter
                        Password</label>
                    <div class="relative mt-[10px] md:mt-[13px] rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <img class="size-5 md:size-6" src="../../assets/img/login/lockPassword.svg" alt="sms-logo">
                        </div>
                        <input :type="newshowPassword ? 'text' : 'password'" name="newPassword" id="newPassword"
                            v-model="newPassword"
                            :class="!passwordMatch && newPassword != '' ? 'focus:ring-[#EB1414]' : ''"
                            class="block w-full rounded-lg md:rounded-[10px] border-0 px-12 h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm focus-visible:outline-none"
                            placeholder="" maxlength="12" />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
                            <button type="button" @click="newviewPassword()">
                                <img src="../../assets/img/login/HidePassword.svg" class="cursor-pointer"
                                    v-if="!newshowPassword" alt="sms-logo">
                                <img src="../../assets/img/login/ShowPassword.svg" class="cursor-pointer" v-else
                                    alt="sms-logo">
                            </button>
                        </div>
                    </div>

                    <div class="mt-[10px] sm:mt-[12px]">
                        <span v-if="password == newPassword && newPassword != '' && password != ''"
                            class="py-14 text-[#919191] text-[11px]">
                            <img class="inline" src="../../assets/img/login/greenTick.svg" alt="">
                            Password matched!
                        </span>
                        <span v-else-if="!passwordMatch && newPassword != ''"
                            class="text-[11px] text-[#EB1414]">Password does not match</span>
                    </div>

                </div>
                <div class="mt-5 md:mt-6">
                    <button v-if="stage == 'setNewPassword'" type="submit"
                        :disabled="!validationCondition || !passwordMatch"
                        :class="password == newPassword && newPassword != '' && password != '' ? 'bg-[#FAAA38]' : 'bg-[#DEDEDE] cursor-not-allowed'"
                        class="w-full text-white h-[40px] sm:h-[50px] rounded-lg md:rounded-[10px] text-[16px] sm:text-[20px] cursor-pointer">
                        <spinner v-if="loader" />
                        <span class="leading-[21px] sm:leading-[27px] font-bold" v-if="!loader">Set Password</span>
                    </button>
                    <button v-else-if="stage == 'newPasswordForPartner'" type="submit"
                        :disabled="loader"
                        :class="password == newPassword && newPassword != '' && password != '' && !loader ? 'bg-[#FAAA38]' : 'bg-[#DEDEDE] cursor-not-allowed'"
                        class="w-full text-white h-[40px] sm:h-[50px] text-[16px] sm:text-[20px] rounded-lg md:rounded-[10px] cursor-pointer">
                        <spinner v-if="loader" />
                        <span class="leading-[27px] font-bold" v-if="!loader">Set Password</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted,defineAsyncComponent } from 'vue';
import { useStore } from "vuex";
import { passwordValidation } from "../../composables/passwordValidation"
const { containsSpaceOrDot, containsNumber, containsSpecialChar, containsUpperCase, containsLowerCase, validationArrayVal } = passwordValidation()
import type { ValidationType } from "../../composables/passwordValidation"
const store = useStore();
const password = ref<string>('');
const newPassword = ref<string>('');
const showPassword = ref<Boolean>(false);
const newshowPassword = ref<Boolean>(false);
// const isAgree = ref<Boolean>(false);

const newPasswordValidation = ref({
    validChar: false,
    atleastNo: false,
    noSpaceDots: false
});
const validationArray = ref(validationArrayVal)

const stage = computed(() => store.getters["getLoginStage"]);
const passwordMatch = computed(() => password.value == newPassword.value && newPassword.value.length ? true : false);
// const isAgreeSubmit = computed(() => {
//     return passwordMatch.value && isAgree.value ? true : false;
// });
const loader = computed(() => store.getters["auth/getIsLoader"]);
const backToStage = () => {
    if (stage.value == 'setNewPassword') {
        store.commit('setLoginStage', 'forgetPasswordOtp');
    }
    else if (stage.value == 'newPasswordForPartner') {
        store.commit('setLoginStage', 'forgetPasswordOtp');
    }
}

// const passwordValidate = () => {
//     const isNoExit = /(?=.*\d)/;
//     const isnoSpace = /^(?!.*[.\s]).+$/;
//     if (password.value.length >= 8 && password.value.length <= 12) {
//         newPasswordValidation.value.validChar = true;
//     }
//     else {
//         newPasswordValidation.value.validChar = false;
//     }

//     if (isNoExit.test(password.value)) {
//         newPasswordValidation.value.atleastNo = true;
//     }
//     else {
//         newPasswordValidation.value.atleastNo = false;
//     }

//     if (isnoSpace.test(password.value)) {
//         newPasswordValidation.value.noSpaceDots = true;
//     }
//     else {
//         newPasswordValidation.value.noSpaceDots = false;
//     }
// }

const validateForm = () => {
    return password.value == newPassword.value && newPassword.value != '' && password.value != '' && newPasswordValidation.value.validChar && newPasswordValidation.value.atleastNo && newPasswordValidation.value.noSpaceDots
}

// watch(() => password.value, () => {
//     passwordValidate();
// })

const viewPassword = () => {
    showPassword.value = !showPassword.value;
}
const newviewPassword = () => {
    newshowPassword.value = !newshowPassword.value;
}

const onSubmit = () => {
    if(validateForm()) {
        stage.value == 'setNewPassword' ? store.dispatch("auth/resetPassword", newPassword.value) :
        store.dispatch("auth/createPassword", newPassword.value)
    } else {
        store.commit("auth/setErrMsg", "Fields are not valid")
    }
}
const passwordRef = ref()
onMounted(() => {
    passwordRef.value ? passwordRef.value.focus() : ''
})

const strengthValidation = () => {
    store.commit("auth/setErrMsg", "")
    if (password.value == "") {
        validationArray.value.forEach((el: any) => {
            el.active = false;
        });
    }

    const lengthValid =
        password.value.length >= 8 && password.value.length <= 12;
    const hasUpperCase = containsUpperCase(password.value);
    const hasLowerCase = containsLowerCase(password.value);
    const hasSpecialChar = containsSpecialChar(password.value);

    const hasNumber = containsNumber(password.value);

    const hasSpaceOrDot = containsSpaceOrDot(password.value);

    const validations: Record<ValidationType, boolean> = {
        character: lengthValid,
        number: hasNumber,
        spaceAndDots: !hasSpaceOrDot,
        upperCase: hasUpperCase,
        lowerCase: hasLowerCase,
        specialChar: hasSpecialChar,
    };

    validationArray.value.forEach((el: any) => {
        if (validations.hasOwnProperty(el.value)) {
            el.active = validations[el.value as ValidationType];
        }
    });
};

const validationCondition = ref(false)

const enableButton = () => {
    if (password.value != "" && newPassword.value == password.value) {
        let bool = false;
        validationArray.value.forEach((el) => {
            if (!el.active) {
                bool = true;
            }
        });
        validationCondition.value = bool;
    } else {
        validationCondition.value = true;
    }
};

const icons = defineAsyncComponent(() => import('@/components/icons.vue'))
</script>