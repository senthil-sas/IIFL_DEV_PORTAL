<template>
    <div class="mt-5 md:mt-8 pb-4  flow-root">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-[15px]" v-if="props.sessionData && props.sessionData.length > 0">
            <table class="min-w-full ">
                <thead class="bg-[#F6F6F6]">
                    <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#919191] sm:pl-6">
                            <input id="comments" aria-describedby="comments-description" name="comments"
                                        type="checkbox" v-model="checkBoxSelectAll"
                                        class="h-4 w-4 rounded-sm !border-[#919191] cursor-pointer accent-orange-600" />
                        </th>
                        <th scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-[11px] font-semibold text-[#919191] sm:pl-6">
                            App Name
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-[11px] font-semibold text-[#919191]">
                            Partner/Client Name
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-[11px] font-semibold text-[#919191]">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <template  v-for="(record, index) in props.sessionData" :key="index">
                      
                        <Disclosure as="tr" class="z-10 h-auto" v-slot="{ open }">

                            <td class="flex items-center py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#919191] sm:pl-6">
                                <input aria-describedby="comments-description" name="comments" type="checkbox"
                                        v-model="selectedCheckbox" :value="record" :id="`${index}_table_td_${index}`"
                                        class="h-4 w-4 rounded-sm !border-[#919191] cursor-pointer accent-orange-600" />
                                <DisclosureButton @click="setExpandValue(index)"
                                    class="flex w-full items-start justify-between text-left text-black">
                                    <!-- <span class="text-base/7 font-semibold">{{ faq.question
                                            }}</span> -->
                                    <span class="pl-4 flex h-7 items-center">
                                        <ChevronUpIcon v-if="!open" class="h-3 w-3" aria-hidden="true" />
                                        <ChevronDownIcon v-else class="h-3 w-3" aria-hidden="true" />
                                    </span>
                                </DisclosureButton>
                                
                            </td>
                            <td class="whitespace-nowrap  py-4 pl-4 pr-3 text-[11px] font-medium text-[#363636] sm:pl-6">
                                {{ record.appName }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-[11px] text-[#363636]">{{
                                record.name
                            }}
                            </td>
                            <td class="relative whitespace-nowrap pb-3 text-center text-sm font-medium sm:pr-6">
                                <Menu as="div">
                                        <div :id="`del_btn_${index}`" class="flex-center">
                                            <MenuButton 
                                                @mouseover="getWindowHeight(`del_btn_${index}`)"
                                                class="flex-center mt-3">
                                                <img  src="../../../assets/img/Home/deleteIcon.svg" alt="deleteIcon">
                                            </MenuButton>
                                        </div>
                                        
                                        <transition enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95">
                                            
                                            <MenuItems :class="bottomStr"
                                            class="absolute right-0 z-50 mt-2 w-56 h-[140px]  origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                                                <MenuItem>
                                                <div>
                                                    <div class="p-5">
                                                        <div class="space-y-[10px] md:space-y-[12px]">
                                                            <p class="font-bold text-[14px] text-[#363636] text-center">
                                                                Confirm Delete</p>
                                                            <p class="font-medium text-[12px] text-[#919191] text-center">
                                                                Are you sure?</p>
                                                        </div>
                                                        <div class="flex justify-center space-x-[15px] pt-[20px]">
                                                            <button type="button" @click="onCancel()"
                                                                class="rounded w-[60px] h-[25px] bg-white px-2.5 z-50 text-[12px] border border-[#7F7F7F] font-semibold text-[#7F7F7F] shadow-sm ">
                                                                Cancel
                                                            </button>
                                                            <button type="button" @click="onSubmit(record)"
                                                                class="rounded w-[60px] h-[25px] bg-[#FAAA38] px-2.5 z-50 text-white text-[12px] font-bold  shadow-sm ">
                                                               Yes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </MenuItem>
                                            </MenuItems>
                                        
                                        </transition>
                                    
                                </Menu>
                            </td>
                        </Disclosure>
                        <tr v-if="index == expandValue">
                            <td></td>
                            <td colspan="3" class="px-3 py-3.5 text-left text-[11px] font-semibold ">
                                <div class="flex bg-[#F6F6F6] rounded-lg ">
                                    <div class="h-auto py-4 w-full rounded-lg flex items-center">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        class="font-semibold text-[#919191] text-[11px] leading-[14px] px-4">
                                                        Session Token</td>
                                                    <td
                                                        class="font-semibold text-[#919191] text-[11px] leading-[14px] px-4">
                                                        Expiry</td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        class="font-semibold text-[#363636] text-[12px] leading-[16px] px-4">
                                                        <div class="longTxtRestrict">{{ record.userSession }}</div>    
                                                    </td>
                                                    <td
                                                        class="font-semibold text-[#363636] text-[12px] leading-[16px] px-4">
                                                        {{ record.expiry }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
                <tfoot v-if="selectedCheckbox.length > 0" id="table_footer">
                            <tr class="h-[42px]" id="table_footer_row">
                                <td colspan="8" class="p-4" id="table_footer">
                                    <button type="button" @click="deleteAll()"
                                        class="font-bold text-[14px] lg:text-[20px] text-white h-[30px] lg:h-[50px] rounded lg:rounded-[10px] w-[108px] lg:w-[180px] bg-[#FAAA38]">Delete
                                        ({{ selectedCheckbox.length }})
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
            </table>
        </div>
        <NoSession v-else />
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import NoSession from '../util/NoSession.vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
const expandValue = ref(-1); 
const store = useStore();
const props = defineProps<{
    sessionData?: any
}>()
const setExpandValue = (index: number) => {
    if (expandValue.value == index) {
        expandValue.value = -1;
    }
    else {
        expandValue.value = index;
    }
}
const selectedCheckbox = ref([])
 const checkBoxSelectAll = computed<any>({
    get() {
        return props.sessionData
            ? selectedCheckbox.value.length == props.sessionData.length
            : false;
    },
    set(value: any) {
        var selected: any = [];
        if (value) {
            props.sessionData.forEach(function (item: any) {
                selected.push(item);
            });
        }
        selectedCheckbox.value = selected;
    }
});
const bottomStr = ref("");
const getWindowHeight = (buttonID:any) => {
  let dropdownButton:any = document.getElementById(buttonID);
  const windowHeight:any = window.innerHeight
  const dropdownTop = dropdownButton.getBoundingClientRect().top
  if (windowHeight - dropdownTop < 140) {
    bottomStr.value="bottom-0";
  } else {   
    bottomStr.value="top-0";
  }


}
const deleteAll = () => {    
    store.commit("dashboard/setSessionDeleteData", selectedCheckbox.value)
    store.commit("dashboard/setIsDeleteSession", true)
}
const onSubmit = (record:any) => {
    store.commit("dashboard/setSessionDeleteData", [record])
    store.commit("dashboard/setIsDeleteSession", true)
}
const onCancel = () => {
    // console.log("Cancel...");
}

const handleSubmit = () => {
    // console.log("onsubmitted...");
}

</script>