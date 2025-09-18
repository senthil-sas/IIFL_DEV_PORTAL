<template>
    <TransitionRoot as="template" :show="isOpen">
        <Dialog class="relative z-30" @close="closeDialog">
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
                            class="relative transform overflow-hidden rounded-t-[20px] sm:rounded-[20px] px-[20px] py-[40px] md:px-[40px] md:py-[50px] bg-white text-left shadow-xl transition-all h-[480px] sm:h-full sm:my-8 w-full sm:w-full sm:max-w-xl">
                            <button type="button" @click="closeDialog"
                                class="absolute top-6 right-6 cursor-pointer z-30">
                                <img :src="closeSvg" alt="closeSvg">
                            </button>
                            <DialogTitle as="h3" class="text-base lg:text-2xl text-center font-semibold leading-6 text-[#282828]">
                        Important Requirement
                    </DialogTitle>

                    <div class="mt-7 lg:mt-10">
                        <p class="text-sm lg:text-base text-[#919191]">
                            Placing orders through a Registered (>10 OPS) app <span class="font-semibold">requires a
                                valid Algo ID registered with the exchange.</span>
                        </p>

                        <p class="text-sm lg:text-base text-[#919191] mt-3">
                            Proceed only if you have or plan to register Algo ID(s). Otherwise, please switch to <span
                                class="font-semibold">{{`Non-Registered (<10 OPS)`}}</span> to place orders without Algo
                                    ID(s).
                        </p>
                    </div>

                    <div class="flex flex-col gap-3 mt-10">
                        <span class="flex text-[#363636] font-semibold text-sm lg:text-base">To confirm this, please type <span class="whitespace-nowrap font-semibold pl-1">"I UNDERSTAND"</span></span>

                        <input v-model="confirmText" type="text" maxlength="12" placeholder="Enter text here"
                            class="block w-full md:max-w-[480px] rounded-lg md:rounded-[10px] border-0  py-5 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] text-sm md:text-[16px] font-semibold ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400  sm:text-sm  sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none">
                    </div>

                    <form class="pt-10 flex justify-center" @submit.prevent="confirm">
                        <button type="button"
                            class=" md:mt-3 inline-flex w-[140px] md:w-[150px] justify-center rounded-lg bg-white  px-3 py-2 font-semibold text-[#7F7F7F] shadow-sm ring-1 ring-inset ring-[#7F7F7F] sm:col-start-1 sm:mt-0"
                            @click="closeDialog" ref="cancelButtonRef">Cancel</button>
                        <button :disabled="isLoading || confirmText != 'I UNDERSTAND'" type="submit"
                            class="disabled:bg-[#DEDEDE] disabled:cursor-not-allowed md:mt-3 inline-flex w-[140px] md:w-[150px] ml-[21px] justify-center items-center rounded-lg bg-[#FAAA38] px-3 py-2 shadow-sm hover:bg-[#FAAA38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAAA38] ">
                            <spinner v-if="isLoading" />
                            <span class="text-white font-bold" v-if="!isLoading"> Continue</span>
                        </button>
                    </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    // DialogOverlay,
    DialogTitle,
    TransitionRoot,
    TransitionChild
} from '@headlessui/vue'
import { useStore } from 'vuex';
const store = useStore()
import closeSvg from "@/assets/img/Home/close.svg"

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'close'): void
}>()

const closeDialog = () => {
    confirmText.value = ''
    emit('close')
}
const confirm = () => emit('confirm')
const isLoading = computed(() => store.getters["dashboard/getIsLoader"])
const confirmText = ref('')
</script>
