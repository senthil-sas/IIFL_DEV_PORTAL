<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-30" @close="showSuccess(false)">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-[#000000] bg-opacity-[70%] transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center md:p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-t-[20px] sm:rounded-[20px] bg-white flex justify-center items-center text-left shadow-xl transition-all h-[318px] sm:my-8 w-full sm:max-w-[600px] sm:min-h-[300px]">
                            <button type="button" @click="showSuccess(false)"
                                class="absolute top-6 right-6 cursor-pointer z-30 focus:invisible">
                                <img src="../assets/img/Home/close.svg" alt="Close">
                            </button>
                            <div class="grid items-center justify-center">
                               <div class="grid items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
<path d="M32.5 0C23.8804 0 15.6136 3.42457 9.51848 9.51848C3.42457 15.6136 0 23.8804 0 32.5C0 41.1196 3.42457 49.3864 9.51848 55.4815C15.6136 61.5767 23.8804 65 32.5 65C41.1196 65 49.3864 61.5754 55.4815 55.4815C61.5767 49.3864 65 41.1196 65 32.5C65 26.7949 63.4982 21.1912 60.6456 16.25C57.793 11.3088 53.69 7.20695 48.75 4.35438C43.81 1.50181 38.2051 0 32.5012 0H32.5Z" fill="#1F921B"/>
<path d="M18.2002 33.4304L27.0891 41.4551L47.0891 23.3995" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                               </div>
                                <div class="mt-3 text-center sm:mt-8">
                                    <DialogTitle as="h3" class=" font-semibold md:leading-6 text-[18px] md:text-[30px] text-[#363636]">
                                        Changes Saved Succussfully!</DialogTitle>
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
import { computed, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useStore } from 'vuex';
const store=useStore();
const open = computed(()=>store.getters['getisSuccess']);
const showSuccess = (payload: boolean) => {
    store.commit('showSuccess',payload)
};

onMounted(() => {
    setTimeout(() => {
        store.commit("showSuccess", false)
    }, 1500);
})

</script>