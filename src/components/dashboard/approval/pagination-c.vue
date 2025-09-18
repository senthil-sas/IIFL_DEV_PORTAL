<template>
    <div class="flex items-center justify-center gap-2 flex-wrap">
        <button :disabled="modelValue === 1" @click="updatePage(modelValue - 1)"
            class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-semibold">
            Prev
        </button>

        <button v-for="page in totalPages" :key="page" @click="updatePage(page)" class="px-3 py-1 rounded font-semibold" :class="{
            'bg-[#F37021] text-white': page === modelValue,
            'bg-gray-100 hover:bg-gray-300': page !== modelValue
        }">
            {{ page }}
        </button>

        <button :disabled="modelValue === totalPages" @click="updatePage(modelValue + 1)"
            class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 font-semibold">
            Next
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: Number,
    totalPages: Number,
})
const emit = defineEmits(['update:modelValue'])

function updatePage(page) {
    if (page >= 1 && page <= props.totalPages) {
        emit('update:modelValue', page)
    }
}
</script>
