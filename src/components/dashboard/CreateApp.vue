<template>
    <div class="px-5 :px-0">
        <div class="flex items-center space-x-[9px] sm:space-x-4 pt-16 lg:pt-[122px]">
            <div @click="navigateBack()" class="cursor-pointer">
                <img class="w-[14px] h-[10px] sm:w-auto sm:h-auto" src="../../assets/img/Home/leftArrow.svg"
                    alt="left-Arrow">
            </div>
            <div>
                <span class="text-[#282828] font-bold text-[18px] md:text-[22px]">
                    Create App
                </span>
            </div>
        </div>
        <div class="sm:px-5">
            <div class="mt-[8px] sm:mt-[21px] px-4">
                <p class="text-[#919191] text-[12px] sm:text-[16px] font-medium ml-2 md:ml-0">Get App key by providing
                    the below
                    details</p>
            </div>
            <div class="sm:px-4 mt-[30px] sm:mt-[40px]">
                <form @submit.prevent="handleSubmit()">
                    <!-- flex flex-wrap justify-center md:justify-start  gap-x-[42px] gap-y-4 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[42px] gap-y-4">
                        <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                            <div>
                                <p class="text-secondary text-[12px] sm:text-[14px] font-medium">App Name <span
                                        class="text-red-500">*</span></p>
                            </div>
                            <div class="w-full">
                                <input type="text" name="name" id="name" v-model="appName" autocomplete="off"
                                    class="block w-full md:w-[330px] rounded-lg md:rounded-[10px] border-0 py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                    placeholder="" @input="appNameErr = ''" maxlength="50"/>
                                    <div v-if="appNameErr" class="error-msg mt-1">{{ appNameErr }}</div>
                                <div class="mt-[11px]">
                                    <p class="text-[11px] text-[#ACACAC] italic font-medium">Fields with an asterisk
                                        <span class="text-red-500">(*)</span> are required.</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                            <div>
                                <p class="text-secondary text-[12px] sm:text-[14px] font-medium">Redirect URL</p>
                            </div>
                            <input @input="redirectUrlErr= ''" type="text" name="name" id="name" v-model="redirectUrl" autocomplete="off"
                                class="block w-full md:w-[330px] rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                placeholder=""/>
                            <div v-if="redirectUrlErr" class="error-msg mt-1">{{ redirectUrlErr }}</div>
                        </div>
                        <div class="flex flex-col space-y-[10px] md:space-y-[13px] relative">
                            <div>
                                <p class="text-secondary text-[12px] sm:text-[14px] font-medium">Upload App Icon</p>
                            </div>
                            <label
                                class="w-full md:w-[330px] h-[40px] sm:h-[50px] cursor-pointer px-[15px] rounded-lg md:rounded-[10px] border-dashed border border-[#83838B] relative"
                                for="dropzone-file">
                                <input type="file" @click="errorMessage = ''" :onchange="fileUpload" class="hidden"
                                    name="name" id="dropzone-file" placeholder="" autocomplete="off"
                                    accept=".jpg,.png" />
                                <div class="absolute flex items-center h-full">
                                    <img v-if="fileName == ''" src="../../assets/img/Home/uploadIcon.svg"
                                        class="h-4 w-4" alt="upload">
                                    <img v-else src="../../assets/img/Home/greenTick.svg" class="h-4 w-4" alt="upload">
                                    <div v-if="fileName != ''" class="ml-[6px] overflow-hidden w-44 text-nowrap">{{
                                        fileName }}
                                    </div>
                                </div>
                                <div v-if="fileName != ''"
                                    class="absolute right-[18px] h-full  z-20 text-[#633EE3] text-[12px] flex items-center">
                                    Re-Upload
                                </div>
                            </label>
                            <div class="mt-[11px] flex items-center w-full md:w-[330px]" :class="errorMessage ? 'justify-between' : 'justify-end'">
                                <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
                                <p class="text-end text-[#ACACAC] text-[11px]">JPG, PNG up to 1 MB</p>
                            </div>
                        </div>
                        <!-- new added fields -->
                        <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                            <div>
                                <label id="primaryStaticIp" class="text-secondary text-[12px] sm:text-[14px] font-medium">IP Type
                                    <span class="text-red-500">*</span>
                                </label>
                            </div>
                            <selectFilter v-model="ipType" :options="ipTypes" width="md:max-w-[330px]"/>
                            <div class="mt-[11px] invisible">
                                <p class="text-[11px] text-[#ACACAC] italic font-medium">Fields with an asterisk
                                <span class="text-red-500">(*)</span> are required.</p>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                            <div>
                                <label id="primaryStaticIp" class="text-secondary text-[12px] sm:text-[14px] font-medium">Primary Static IP
                                    <span class="text-red-500">*</span>
                                </label>
                            </div>
                            <input @input="primaryIpErr = ''" type="text" name="name" id="primaryStaticIp" v-model="primaryStaticIp" autocomplete="off"
                                class="block w-full md:w-[330px] rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                placeholder="" maxlength="50"/>
                            <div v-if="primaryIpErr" class="error-msg mt-1 whitespace-pre">{{ primaryIpErr }}</div>
                        </div>
                        <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                            <div>
                                <label id="secondaryStaticIp" class="text-secondary text-[12px] sm:text-[14px] font-medium">Secondary Static IP</label>
                            </div>
                            <input @input="secondaryIpErr = ''" type="text" name="name" id="secondaryStaticIp" v-model="secondaryStaticIp" autocomplete="off"
                                class="block w-full md:w-[330px] rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                placeholder="" maxlength="50"/>
                            <div v-if="secondaryIpErr" class="error-msg mt-1 text-left whitespace-pre">{{ secondaryIpErr }}</div>
                        </div>
                        <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                            <div>
                                <label id="algoRegisterType" class="text-secondary text-[12px] sm:text-[14px] font-medium">Algo Registration Type
                                    <span class="text-red-500">*</span>
                                </label>
                            </div>
                            <selectFilter @onChange="handleSelectOnchange" :isDisabled="!isSelf" v-model="algoRegisterType" :options="registerTypes" width="md:max-w-[330px]"/>
                            <div v-if="algoRegisterTypeErr" class="error-msg mt-1 text-left">{{ algoRegisterTypeErr }}</div>
                        </div>
                        <!-- new added fields end -->
                    </div>
                    <div class=" mt-5 sm:mt-[46px] justify-center md:justify-start">
                        <p class="text-[#919191] text-[12px] font-bold">Note:</p>
                        <ol class="list-decimal ml-4">
                            <li class="text-[#919191] text-[12px] pt-2" v-for="(note, index) in notes" :key="index"> {{ note }}</li>
                        </ol>
                    </div>
                    <div class="mt-5 sm:mt-[40px] justify-center md:justify-start">
                        <div class="flex items-center space-x-2">
                            <div class="flex-center">
                                <input id="comments" aria-describedby="comments-description" name="comments"
                                    type="checkbox" v-model="isAgree"
                                    class="h-4 w-4 rounded-sm !border-[#919191] cursor-pointer accent-orange-600" required/>
                            </div>
                            <div>
                                <p class="text-[#B0A9A9] text-[12px] cursor-pointer"><span @click="isAgree = !isAgree"
                                        class="font-semibold">I here by agree to the </span> <a href="./ANNEXURE.pdf" target="_blank"
                                        class="text-[#633EE3] font-semibold">Terms & Conditions</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="pt-[60px] md:pt-[20px] pb-10  sm:mt-[42px] flex justify-center md:justify-start">
                        <button :disabled="(isLoading && algoRegisterType.key == 'Non-Registered (<10 OPS)') || !isAgree" type="submit" class="disabled:bg-[#DEDEDE] disabled:cursor-not-allowed bg-[#FAAA38] w-[130px] h-[40px] md:w-[180px] md:h-[50px] text-[16px] md:text-[20px] font-bold rounded-lg md:rounded-[10px]">
                            <spinner v-if="isLoading" />
                            <span class="text-white font-semibold" v-if="!isLoading"> Create App</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <confirmDialog @confirm="createAppApiCall" @close="closeDialog" :isOpen="isConfirmDialog"/>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent, onUnmounted, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const appName = ref('');
const redirectUrl = ref('');
const isAgree = ref(false);
const fileName = ref('')
const imgUrl = ref()
const errorMessage = ref('')
const appNameErr =ref()
// const isFileNameExist = computed(() => fileName.value != '' ? true : false)
const fileUpload = async (event: any) => {
    resetFile()
    errorMessage.value = ''
    const input = event.target;
    let maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // 1,048,576 bytes

    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size <= maxSizeInBytes) {
            fileName.value = file.name;
            if (event) {
                const convertBase64 = (file: File) => {
                    return new Promise((resolve, reject) => {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = () => resolve(fileReader.result);
                        fileReader.onerror = (error) => reject(error);
                    });
                };
                imgUrl.value = await convertBase64(file);
            }
        } else {
            errorMessage.value = `File size must not exceed ${maxSizeInMB} MB.`;
            event.preventDefault();
            return;
        }
    }
}
const resetFile = () => {
    fileName.value = '';
    errorMessage.value = ''
    imgUrl.value = ''
}
const loginDetails = computed(() => store.getters["auth/getUserDetails"])
const ssoType = computed(() => loginDetails.value?.role == "Partner" ? 'PARTNER' : 'SELF')

const selectFilter = defineAsyncComponent(() => import("./custom-filter.vue"))
const confirmDialog = defineAsyncComponent(() => import("./create-confirmation-dialog.vue"))

const validateStaticIpRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
// const validateIPv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const validateIPv6Regex = /^(?:((?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|((?:[0-9A-Fa-f]{1,4}:){1,7}:)|((?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4})|((?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2})|((?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3})|((?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4})|((?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5})|([0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6}))|:(?:(?::[0-9A-Fa-f]{1,4}){1,7}|:))$/;
const primaryIpErr = ref('')
const secondaryIpErr = ref('')
const algoRegisterTypeErr = ref('')
const redirectUrlErr = ref('')
const handleSubmit = () => { 
    debugger
    appNameErr.value = ''
    primaryIpErr.value = ''
    secondaryIpErr.value = ''
    algoRegisterTypeErr.value = ''
    redirectUrlErr.value = ''
    const currentRegex = ipType.value.key == 'ipv4' ? validateStaticIpRegex : validateIPv6Regex
    const exampleText = ipType.value.key == 'ipv4' ? '(e.g., 192.168.1.1)' : '(e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334)'
    primaryStaticIp.value = primaryStaticIp.value.trim()
    secondaryStaticIp.value = secondaryStaticIp.value.trim()
    if(!currentRegex.test(primaryStaticIp.value)) {
        primaryIpErr.value = `Invalid IP format. Please enter a valid ${ipType.value.name} address\n${exampleText}.`
    }
    if(primaryStaticIp.value == '') {
        primaryIpErr.value = `Please enter a ${ipType.value.name} address`
    }
    if(!appName.value) {
        appNameErr.value = 'App name is required'
    }
    if(secondaryStaticIp.value != '' && secondaryStaticIp.value == primaryStaticIp.value) {
        secondaryIpErr.value = 'Primary and Secondary IPs cannot be the same'
    }
    if(secondaryStaticIp.value != '' && !currentRegex.test(secondaryStaticIp.value)) {
        secondaryIpErr.value = `Invalid IP format. Please enter a valid ${ipType.value.name} address\n(e.g., 192.168.1.1).`
    }
    if(!algoRegisterType.value) {
        algoRegisterTypeErr.value = 'Please select Algo Registration Type'
    }
    
    if(redirectUrl.value && validateUrl(redirectUrl.value) == false) {
        redirectUrlErr.value = 'Please enter a valid URL'
    }
    if(!currentRegex.test(primaryStaticIp.value) || !appName.value || !algoRegisterType.value || secondaryIpErr.value != '' || !algoRegisterType.value || (redirectUrl.value != '' && redirectUrlErr.value != '')) {
        return
    }
    if(algoRegisterType.value.key == 'Registered (>10 OPS)') {
        store.commit("dashboard/setIsConfirmDialog", true)
    } else {
        createAppApiCall()
    }
}

const navigateBack = () => {
    router.push({ path: '/developer/' });
}

const primaryStaticIp = ref("")
const secondaryStaticIp = ref("")
const algoRegisterType = ref()

const notes = [
    "Redirect URL is where users are redirected after completing 2FA web login.",
    "OPS in the Algo Registration Type refers to Orders Per Second",
    "For apps categorized as Registered (>10 OPS), it is mandatory to use an Algo ID registered with the exchange while placing any order.",
    "Apps classified as Non-Registered (<10 OPS) are not required to register an Algo ID with the exchange for order placement."
]

const registerTypes = ref([{ name: "Non-Registered (<10 OPS)", key: 'Non-Registered (<10 OPS)' }, { name: "Registered (>10 OPS)", key: 'Registered (>10 OPS)' }])
const isSelf = computed(() => store.getters["auth/getIsSelf"])

const ipTypes = ref([{ name: "IPv4", key: 'ipv4' }, { name: "IPv6", key: 'ipv6' }])
const ipType = ref(ipTypes.value[0])

const handleSelectOnchange = () => {
    algoRegisterTypeErr.value = ''
}

const isConfirmDialog = computed(() => store.getters["dashboard/getIsConfirmDialog"])

const createAppApiCall = () => {
    let json = {
        "appName": appName.value,
        "redirectUrl": redirectUrl.value,
        "companyLogo": imgUrl.value,
        "ssoType": ssoType.value,
        "ipType": ipType.value.key,
        "ipPrimary": primaryStaticIp.value,
        "ipSecondary": secondaryStaticIp.value,
        "algoRegsType": algoRegisterType.value.key
    }
    store.dispatch('dashboard/createApp', json);
}

onUnmounted(() => {
    closeDialog()
})

onMounted(() => {
    if(!isSelf.value) {
        algoRegisterType.value = registerTypes.value[1]
    }
})

const closeDialog = () => {
    store.commit("dashboard/setIsConfirmDialog", false)
}

const isLoading = computed(() => store.getters["dashboard/getIsLoader"])

function validateUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

watch(() => ipType.value, () => {
    primaryIpErr.value =  ''
    secondaryIpErr.value = ''
})
</script>