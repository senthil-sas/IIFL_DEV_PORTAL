<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-30" @close="close()">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-[#000000] bg-opacity-[70%] transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center sm:p-4 text-center sm:items-center ">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-t-[20px] sm:rounded-[20px] bg-white text-left shadow-xl transition-all w-full sm:w-full sm:max-w-[570px] md:py-[50px] md:px-[37px] px-[14px] py-[40px]">
                            <div class="relative">
                                <button type="button" @click="close()"
                                    class="absolute md:right-[-18px] right-[4px] md:top-[-25px] top-[-15px] md:[-25px] cursor-pointer z-30">
                                    <img src="../assets/img/Home/close.svg" alt="Close">
                                </button>
                                <div class="text-center">
                                    <DialogTitle as="h3"
                                        class="text-base font-semibold relative leading-6 text-gray-900 flex flex-col items-center justify-center space-y-[10px] md:space-y-[13px]">
                                        <p class="text-[#282828] text-[16px] sm:text-[22px] font-bold">Delete Session</p>
                                        <div class="border-b-4 border-[#F37021] w-[60px] h-[4px] rounded-sm"></div>
                                    </DialogTitle>
                                    <div class="space-y-[15px] sm:space-y-[30px] my-[20px] sm:my-[40px]">
                                        <div class="text-sm text-[#363636] font-semibold text-[16px] sm:text-[20px] leading-[26px]">
                                            Are you sure you want to Delete?
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 flex justify-center">
                                <button type="button"
                                    class=" inline-flex sm:w-[150px] w-[140px] justify-center rounded-md bg-white  px-3 py-2 font-semibold text-[#7F7F7F] shadow-sm ring-1 ring-inset ring-[#7F7F7F] sm:col-start-1 sm:mt-0"
                                    @click="close()" ref="cancelButtonRef">Cancel</button>
                                <button  type="button"
                                    class="inline-flex w-[140px] text-nowrap sm:w-[150px] ml-[21px] justify-center items-center rounded-md bg-[#FAAA38] px-3 py-2 shadow-sm hover:bg-[#FAAA38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAAA38] sm:col-start-2"
                                    @click="deleteSession()"> 
                                    <span class="text-white font-bold" >Confirm</span>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useStore } from 'vuex';
const open = computed(()=>store.getters['dashboard/getIsDeleteSession']) 
const store = useStore();
const close = ()=>{
    store.commit("dashboard/setIsDeleteSession", false)
}
const deleteSession = ()=>{
    store.dispatch("dashboard/deleteSession")
}

</script>