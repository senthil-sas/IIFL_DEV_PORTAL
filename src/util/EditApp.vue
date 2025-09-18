<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-30" @close="showEdit(false)">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-[#000000] bg-opacity-[70%] transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 w-screen">
                <div class="flex min-h-full items-end justify-center md:p-4 text-center sm:items-center sm:p-4">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform rounded-t-[20px] sm:rounded-[20px] px-[20px] py-[40px] md:px-[40px] md:py-[50px]  bg-white text-left shadow-xl transition-all h-[520px] sm:h-full sm:my-8 w-full sm:w-full sm:max-w-[925px]">
                            <button type="button" @click="showEdit(false)"
                                class="absolute top-6 right-6 cursor-pointer z-30">
                                <img src="../assets/img/Home/close.svg" alt="Close">
                            </button>
                            <div class="relative">
                                <div class="text-center">
                                    <DialogTitle as="h3"
                                        class="text-base font-semibold relative leading-6 text-gray-900 flex flex-col items-center justify-center space-y-[10px] md:space-y-[13px]">
                                        <p class="text-[#282828] text-[16px] md:text-[22px] font-bold">Edit Details</p>
                                        <div class="border-b-4 border-[#F37021] w-[60px] h-[4px]  rounded-sm"></div>
                                    </DialogTitle>
                                    <form @submit.prevent="handleSubmit()" class="max-h-[410px] overflow-y-auto mb-4">
                                        <div
                                            class="grid grid-cols-1 md:grid-cols-2 md:gap-x-[42px] mt-5 md:mt-[40px] gap-y-[30px] md:gap-y-6">
                                            <div>
                                                <div class="flex flex-col space-y-[10px] md:space-y-3">
                                                    <div>
                                                        <p class="text-secondary text-[14px] text-start font-medium">App
                                                            Name <span class="text-red-500">*</span></p>
                                                    </div>
                                                    <div>
                                                        <input type="text" name="name" required id="name"
                                                            autocomplete="off" v-model="appName"
                                                            class="block w-full rounded-lg md:rounded-[10px] border-0 py-5 pl-[15px] h-[40px] md:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                            placeholder="" maxlength="50"/>
                                                        <div v-if="appNameErr" class="error-msg mt-1 text-left">{{ appNameErr }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex flex-col space-y-[10px] md:space-y-3">
                                                    <div>
                                                        <p class="text-secondary text-[14px] text-start font-medium">
                                                            Redirect URL
                                                        </p>
                                                    </div>
                                                    <input @input="redirectUrlErr= ''" type="text" name="name" id="name" autocomplete="off"
                                                        v-model="redirectUrl"
                                                        class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] md:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                        placeholder=""/>
                                                    <div v-if="redirectUrlErr" class="error-msg mt-1 text-left">{{ redirectUrlErr }}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="flex flex-col space-y-[10px] md:space-y-3 relative items-end">
                                                    <div class="w-full">
                                                        <p class="text-secondary text-start text-[14px] font-medium">
                                                            Upload App Icon
                                                        </p>
                                                    </div>
                                                    <label
                                                        class="w-full h-[40px] md:h-[50px] px-[18px] cursor-pointer rounded-lg md:rounded-[10px] border-dashed border border-[#83838B] relative"
                                                        for="dropzone-file">
                                                        <input type="file" @click="errorMessage = '';imgUrl = null"
                                                            @change="fileUpload" class="hidden" autocomplete="off"
                                                            :disabled="isFileNameExist" name="name" id="dropzone-file"
                                                            accept=".jpg,.png" placeholder="" />
                                                        <div class="absolute  flex items-center h-full">
                                                            <img v-if="fileName == ''"
                                                                src="../assets/img/Home/uploadIcon.svg" class="h-4 w-4"
                                                                alt="upload">
                                                            <img v-else src="../assets/img/Home/greenTick.svg"
                                                                class="h-4 w-4" alt="upload">
                                                            <div v-if="fileName != ''"
                                                                class="ml-[6px] overflow-hidden w-44 text-nowrap text-start">
                                                                {{ fileName }}
                                                            </div>
                                                        </div>
                                                        <div v-if="fileName != ''" @click="resetFile()"
                                                            class="absolute right-0 h-full  z-20 px-4 text-[#633EE3] text-[12px] items-center flex">
                                                            Re-Upload
                                                        </div>
                                                    </label>
                                                    <div class="mt-[11px] w-full text-end md:w-[330px]">
                                                        <div class="text-end text-[#ACACAC] text-[11px]">JPG, PNG up to
                                                            1
                                                            MB</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Algo fields -->

                                            <div>
                                                <div class="flex flex-col space-y-[10px] md:space-y-3 justify-start">
                                                    <label id="primaryStaticIp"
                                                        class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">IP Type
                                                        <span class="text-red-500">*</span>
                                                    </label>
                                                    <selectFilter v-model="ipType" :options="ipTypes" width="w-full" />
                                                    <div class="mt-[11px] invisible">
                                                        <p class="text-[11px] text-[#ACACAC] italic font-medium">Fields with an asterisk <span class="text-red-500">(*)</span> are required.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                                                <label id="primaryStaticIp" class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">Primary
                                                    Static IP <span class="text-red-500">*</span>
                                                </label>
                                                <input @input="primaryIpErr = ''" type="text" name="name"
                                                    id="primaryStaticIp" v-model="primaryStaticIp" autocomplete="off"
                                                    class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                    placeholder=""  maxlength="50"/>
                                                <div v-if="primaryIpErr" class="error-msg mt-1 text-left whitespace-pre">{{ primaryIpErr }}</div>
                                            </div>
                                            <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                                                <label id="secondaryStaticIp"
                                                    class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">Secondary
                                                    Static IP</label>
                                                <input @input="secondaryIpErr = ''" type="text" name="name" id="secondaryStaticIp"
                                                    v-model="secondaryStaticIp" autocomplete="off"
                                                    class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                    placeholder="" maxlength="50"/>
                                                <div v-if="secondaryIpErr" class="error-msg mt-1 text-left whitespace-pre">{{ secondaryIpErr }}</div>
                                            </div>
                                            <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                                                <label id="algoRegisterType"
                                                    class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">Algo
                                                    Registration Type
                                                    <span class="text-red-500">*</span>
                                                </label>
                                                <selectFilter :isDisabled="!isSelf" v-model="algoRegisterType" :options="registerTypes" width="w-full" />
                                            </div>
                                        </div>
                                        <div class="pt-10 flex justify-center">
                                            <button type="button"
                                                class=" md:mt-3 inline-flex items-center w-[140px] md:w-[150px] justify-center rounded-lg bg-white  px-3 py-2 font-semibold text-[#7F7F7F] shadow-sm ring-1 ring-inset ring-[#7F7F7F] sm:col-start-1 sm:mt-0"
                                                @click="showEdit(false)" ref="cancelButtonRef">Cancel</button>
                                            <button :disabled="editLoader" type="submit"
                                                class="disabled:bg-[#DEDEDE] disabled:cursor-not-allowed md:mt-3 inline-flex w-[140px] md:w-[150px] ml-[21px] justify-center items-center rounded-lg bg-[#FAAA38] px-3 py-2 shadow-sm hover:bg-[#FAAA38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAAA38] ">
                                                <spinner v-if="editLoader" />
                                                <span class="text-white font-bold" v-if="!editLoader"> Save
                                                    Changes</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, defineAsyncComponent } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useStore } from 'vuex';
const store = useStore();
const appName = ref('');
const redirectUrl = ref('');
const fileName = ref('')

const open = computed(() => store.getters['getEdit']);
const isFileNameExist = computed(() => fileName.value != '' ? true : false);
const editData = computed(() => store.getters["dashboard/getEditData"])
const editLoader = computed(() => store.getters["dashboard/getEditLoader"])
const errorMessage = ref('')
const imgUrl = ref()
const resetFile = () => {
    fileName.value = '';
}
const fileUpload = async (event: any) => {
    errorMessage.value = ''
    const input = event.target;
    let maxSizeInMB = 1
    if (input.files && input.files[0] && input.files[0].size <= maxSizeInMB * 1024 * 102) {
        fileName.value = input.files[0].name;
        if (event) {
            const convertBase64 = (file: any) => {
                return new Promise((resolve, reject) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        resolve(fileReader.result);
                    };
                    fileReader.onerror = (error) => {
                        reject(error);
                    };
                });
            };
            imgUrl.value = await convertBase64(input.files[0]);


        }
    } else if (input.files[0].size > maxSizeInMB * 1024 * 1024) {
        errorMessage.value = `File size must not exceed ${maxSizeInMB} MB.`;
        event.preventDefault();
        return
    }
}

const selectFilter = defineAsyncComponent(() => import("../components/dashboard/edit-custom-filter.vue"))
const appNameErr = ref('')
const primaryIpErr = ref('')
const secondaryIpErr = ref('')
const validateStaticIpRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
// const validateIPv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const validateIPv6Regex = /^(?:((?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|((?:[0-9A-Fa-f]{1,4}:){1,7}:)|((?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4})|((?:[0-9A-Fa-f]{1,4}:){1,5}(?::[0-9A-Fa-f]{1,4}){1,2})|((?:[0-9A-Fa-f]{1,4}:){1,4}(?::[0-9A-Fa-f]{1,4}){1,3})|((?:[0-9A-Fa-f]{1,4}:){1,3}(?::[0-9A-Fa-f]{1,4}){1,4})|((?:[0-9A-Fa-f]{1,4}:){1,2}(?::[0-9A-Fa-f]{1,4}){1,5})|([0-9A-Fa-f]{1,4}:(?:(?::[0-9A-Fa-f]{1,4}){1,6}))|:(?:(?::[0-9A-Fa-f]{1,4}){1,7}|:))$/;
const redirectUrlErr = ref('')
const handleSubmit = () => { 
    appNameErr.value = ''
    primaryIpErr.value = ''
    secondaryIpErr.value = ''
    redirectUrlErr.value = ''
    const currentRegex = ipType.value.key == 'ipv4' ? validateStaticIpRegex : validateIPv6Regex
    const exampleText = ipType.value.key == 'ipv4' ? '(e.g., 192.168.1.1)' : '(e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334)'
    if(!validateStaticIpRegex.test(primaryStaticIp.value)) {
        primaryIpErr.value = `Invalid IP format. Please enter a valid ${ipType.value.name} address\n${exampleText}.`
    }
    if(primaryStaticIp.value == '') {
        primaryIpErr.value = `Please enter a ${ipType.value.name} address`
    }
    if(appName.value == '') {
        appNameErr.value = 'Please enter a App Name'
    }
    if(secondaryStaticIp.value != '' && secondaryStaticIp.value == primaryStaticIp.value) {
        secondaryIpErr.value = 'Primary and Secondary IPs cannot be the same'
    }
    if(secondaryStaticIp.value != '' && !currentRegex.test(secondaryStaticIp.value)) {
        secondaryIpErr.value = `Invalid IP format. Please enter a valid ${ipType.value.name} address\n(e.g., 192.168.1.1).`
    }
    if(redirectUrl.value && validateUrl(redirectUrl.value) == false) {
        redirectUrlErr.value = 'Please enter a valid URL'
    }
    if(!validateStaticIpRegex.test(primaryStaticIp.value) || !appName.value || !algoRegisterType.value || secondaryIpErr.value != ''|| (redirectUrl.value != '' && redirectUrlErr.value != '')) {
        return
    }
    let json:any = {
        "appName": appName.value,
        "redirectUrl": redirectUrl.value,
        "companyLogo": imgUrl.value ? imgUrl.value : '',
        "appId": editData.value.appId,
        "ipType": ipType.value.key,
        "ipPrimary": primaryStaticIp.value,
        "ipSecondary": secondaryStaticIp.value,
        "algoRegsType": algoRegisterType.value.key
    }
    store.dispatch("dashboard/editApp", { json: json })
}
const showEdit = (payload: boolean) => {
    store.commit('showEdit', payload);
}

const primaryStaticIp = ref()
const secondaryStaticIp = ref()
const algoRegisterType = ref()


const registerTypes = ref([{ name: "Non-Registered (<10 OPS)", key: 'Non-Registered (<10 OPS)' }, { name: "Registered (>10 OPS)", key: 'Registered (>10 OPS)' }])
const isSelf = computed(() => store.getters["auth/getIsSelf"])

const ipTypes = ref([{ name: "IPv4", key: 'ipv4' }, { name: "IPv6", key: 'ipv6' }])
const ipType = ref()

onMounted(() => {
    if(Object.keys(editData.value).length) {
        appName.value = editData.value.appName;
        redirectUrl.value = editData.value.redirectUrl;
        if(editData.value.companyLogo) {
            fileName.value = editData.value.companyLogo
            imgUrl.value = editData.value.companyLogo
        }

        // algo fields
        if(editData.value?.ipType) {
            ipType.value = ipTypes.value.find((el:any) => el.key == editData.value?.ipType)
        }
        if(editData.value?.ipPrimary) {
            primaryStaticIp.value = editData.value.ipPrimary
        }
        if(editData.value?.ipSecondary) {
            secondaryStaticIp.value = editData.value.ipSecondary
        }
        if(editData.value?.algoRegsType) {
            algoRegisterType.value = registerTypes.value.find((el:any) => el.key == editData.value?.algoRegsType)
        }
        // algo fields end
    }
})

// onMounted(() => {
//     algoRegisterType.value = registerTypes.value[1]
// })

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
</script>