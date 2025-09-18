<template>
    <div class="relative" :class="width">
        <Listbox v-model="selectedValue">
            <div>
                <ListboxButton :class="{ 'bg-[#EBEBEB]' : isDisabled}" :disabled="isDisabled"
                    class="truncate text-primary text-left text-base font-bold block w-full md:max-w-[330px] rounded-lg md:rounded-[10px] border-0 pl-[15px] h-[40px] sm:h-[50px] text-[#1D1D1F] md:text-[16px] ring-1 ring-inset ring-[#83838B] placeholder:text-gray-400 sm:text-sm sm:leading-[21px] focus:ring-[#83838B] focus-visible:outline-none">
                    {{ selectedValue?.name }}
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
                                ]" class="text-base">{{ item.name }}</span>
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
    modelValue: Object,
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["update:modelValue", "onChange"]);

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit("update:modelValue", value)
        emit("onChange", value)
    },
});
</script>
