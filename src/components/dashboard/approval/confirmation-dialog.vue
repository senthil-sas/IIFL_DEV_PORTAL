<template>
    <TransitionRoot as="template" :show="isOpen">
        <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="closeDialog">
            <div class="min-h-screen px-4 text-center">
                <DialogOverlay class="fixed inset-0 bg-black bg-opacity-30" />

                <!-- Centering trick -->
                <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                <div
                    class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                        {{ titleMap[state] || 'Confirm Action' }}
                    </DialogTitle>

                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            {{ messageMap[state] || 'Are you sure you want to proceed?' }}
                        </p>
                    </div>

                    <div class="mt-4 flex justify-end space-x-2">
                        <button
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                            @click="closeDialog">
                            Cancel
                        </button>
                        <button :disabled="isLoading" class="px-4 py-2 text-sm font-medium text-white rounded justify-center items-center bg-[#FAAA38] hover:bg-[#FAAA38] disabled:cursor-not-allowed disabled:opacity-45"
                            @click="confirm">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionRoot
} from '@headlessui/vue'
import { useStore } from 'vuex';
const store = useStore()

const props = defineProps<{
    isOpen: boolean
    state: 'approve' | 'reject' | 'block' | 'unBlock'
}>()

const emit = defineEmits<{
    (e: 'confirm', action: 'approve' | 'reject' | 'block' | 'unBlock'): void
    (e: 'close'): void
}>()

const closeDialog = () => emit('close')
const confirm = () => emit('confirm', props.state)

const titleMap = {
    approve: 'Approve Request',
    reject: 'Reject Request',
    block: 'Block User',
    unBlock: 'Un Block User'
}

const messageMap = {
    approve: 'Are you sure you want to approve ?',
    reject: 'Are you sure you want to reject ?',
    block: 'Are you sure you want to block ?',
    unBlock: 'Are you sure you want to Un block ?'
}

const isLoading = computed(() => store.getters["approval/getApprovalLoading"])
</script>
