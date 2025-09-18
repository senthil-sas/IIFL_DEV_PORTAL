<template>
    <div class="flex items-center justify-center rounded-full font-semibold uppercase h-full w-full text-gray-700 text-lg">
        {{ initials }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{
    name: string
    size?: number // default 40px
}>()

// const size = computed(() => props.size || 40)

const initials = computed(() => {
    if (!props.name) return ''
    return props.name.slice(0, 2).toUpperCase()
})

// Random or fixed background color based on initials
// const bgColor = computed(() => {
//     const colors = [
//         'bg-red-500',
//         'bg-green-500',
//         'bg-blue-500',
//         'bg-yellow-500',
//         'bg-purple-500',
//         'bg-pink-500',
//         'bg-indigo-500',
//         'bg-teal-500'
//     ]
//     const index = (initials.value.charCodeAt(0) + initials.value.charCodeAt(1)) % colors.length
//     return colors[index]
// })
</script>
