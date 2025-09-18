<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-30" @close="closeDialog(false)">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-[#000000] bg-opacity-[70%] transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center md:p-4 text-center sm:items-center sm:p-4">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-t-[20px] sm:rounded-[20px] px-[20px] py-[40px] md:px-[40px] md:py-[50px]  bg-white text-left shadow-xl transition-all h-[520px] sm:h-full sm:my-8 w-full sm:w-full sm:max-w-[925px]">
                            <button type="button" @click="closeDialog(false)"
                                class="absolute top-6 right-6 cursor-pointer z-30">
                                <img src="../assets/img/Home/close.svg" alt="Close">
                            </button>
                            <div class="relative">
                                <div class="text-center">
                                    <DialogTitle as="h3"
                                        class="text-base font-semibold relative leading-6 text-gray-900 flex flex-col items-center justify-center space-y-[10px] md:space-y-[13px]">
                                        <p class="text-[#282828] text-[16px] md:text-[22px] font-bold">View Details</p>
                                        <div class="border-b-4 border-[#F37021] w-[60px] h-[4px]  rounded-sm"></div>
                                    </DialogTitle>
                                    <form class="max-h-[420px] overflow-y-auto">
                                        <div
                                            class="grid grid-cols-1 md:grid-cols-2 md:gap-x-[42px] mt-5 md:mt-[40px] gap-y-[30px] md:gap-y-8">
                                            <div>
                                                <div class="flex flex-col space-y-[10px] md:space-y-3">
                                                    <div>
                                                        <p class="text-secondary text-[14px] text-start font-medium">App
                                                            Name</p>
                                                    </div>
                                                    <div>
                                                        <input type="text" name="name" required id="name"
                                                            autocomplete="off" v-model="appName"
                                                            class="block w-full rounded-lg md:rounded-[10px] border-0 py-5 pl-[15px] h-[40px] md:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                            readonly/>
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
                                                    <input type="text" name="name" id="name" autocomplete="off"
                                                        v-model="redirectUrl"
                                                        class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] md:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                        readonly/>
                                                </div>
                                            </div>

                                            <!-- Algo fields -->
                                            <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                                                <label id="primaryStaticIp" class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">Primary
                                                    Static IP
                                                </label>
                                                <input type="text" name="name"
                                                    id="primaryStaticIp" v-model="primaryStaticIp" autocomplete="off"
                                                    class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                    readonly />
                                            </div>
                                            <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                                                <label id="secondaryStaticIp"
                                                    class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">Secondary
                                                    Static IP</label>
                                                <input type="text" name="name" id="secondaryStaticIp"
                                                    v-model="secondaryStaticIp" autocomplete="off"
                                                    class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                    readonly />
                                            </div>
                                            <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                                                <label id="algoRegisterType"
                                                    class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">Algo
                                                    Registration Type
                                                </label>
                                                <input type="text" name="name" id="algoRegisterType"
                                                    v-model="algoRegisterType" autocomplete="off"
                                                    class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                    readonly />
                                            </div>

                                            <div class="flex flex-col space-y-[10px] md:space-y-[13px]">
                                                <label id="appSecretKey"
                                                    class="text-secondary text-[12px] sm:text-[14px] font-medium text-left">App Secret Key </label>
                                                <input type="text" name="name" id="appSecretKey"
                                                    v-model="appSecretKey" autocomplete="off"
                                                    class="block w-full rounded-lg md:rounded-[10px] border-0  py-5 px-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none"
                                                    readonly />
                                            </div>
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
import { computed, ref, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useStore } from 'vuex';
const store = useStore();
const appName = ref('');
const redirectUrl = ref('');
const fileName = ref('')

const open = computed(() => store.getters["dashboard/getIsViewDetailsDialog"])
const editData = computed(() => store.getters["dashboard/getEditData"])
const imgUrl = ref()
const appSecretKey = ref()

const closeDialog = (payload: boolean) => {
    store.commit('dashboard/setIsViewDetailsDialog', payload);
}

const primaryStaticIp = ref()
const secondaryStaticIp = ref()
const algoRegisterType = ref()


onMounted(() => {
    if(Object.keys(editData.value).length) {
        appName.value = editData.value.appName;
        redirectUrl.value = editData.value.redirectUrl;
        if(editData.value.companyLogo) {
            fileName.value = editData.value.companyLogo
            imgUrl.value = editData.value.companyLogo
        }

        // algo fields
        
        if(editData.value?.ipPrimary) {
            primaryStaticIp.value = editData.value.ipPrimary
        }
        if(editData.value?.ipSecondary) {
            secondaryStaticIp.value = editData.value.ipSecondary
        }
        if(editData.value?.algoRegsType) {
            algoRegisterType.value = editData.value?.algoRegsType
        }
        if(editData.value?.appSecret) {
            appSecretKey.value = editData.value?.appSecret
        }
        // algo fields end
    }
})

// onMounted(() => {
//     algoRegisterType.value = registerTypes.value[1]
// })

</script>