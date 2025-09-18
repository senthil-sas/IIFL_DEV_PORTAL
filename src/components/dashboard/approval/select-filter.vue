<template>
    <div class="relative" :class="width">
        <Listbox v-model="selectedValue">
            <div class="relative">
                <ListboxButton
                    class="h-8 relative w-full cursor-default rounded bg-primary border-2 border-inputVariant px-3 text-left flex items-center focus:outline-none">
                    <span class="block truncate text-primary text-sm font-bold">{{ selectedValue?.name }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <!-- <ChevronUpDownIcon class=" text-gray-400" aria-hidden="true" /> -->
                        <img class="size-4" :src="downArrow" alt="downArrow">
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="item in options" :key="item.name"
                            :value="item" as="template">
                            <li :class="[
                                active ? 'bg-activeTab text-[#F37021]' : 'text-primary',
                                'relative cursor-default select-none py-2 pl-7 pr-4',
                            ]">
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                ]">{{ item.name }}</span>
                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-2 text-[#F37021]">
                                    <CheckIcon class="size-4" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<script setup>
import { computed } from "vue";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/20/solid";
import downArrow from "@/assets/img/Home/downArrow.svg"

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    width: {
        type: String,
        default: 'w-32'
    },
    modelValue: Object
});

const emit = defineEmits(["update:modelValue"]);

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>
