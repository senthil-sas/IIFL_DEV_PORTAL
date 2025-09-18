<template>
    <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
            v-if="props.sessionData && props.sessionData.length > 0">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-[15px]">
                    <table class="min-w-full ">
                        <thead class="bg-[#F6F6F6]">
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-[#919191] sm:pl-6">
                                    <input id="comments" aria-describedby="comments-description" name="comments"
                                        type="checkbox" v-model="checkBoxSelectAll"
                                        class="h-4 w-4 rounded-sm !border-[#919191] cursor-pointer accent-orange-600" />
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-[#919191] ">App
                                    Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-[#919191]">
                                    Partner/Client Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-[#919191]">
                                    Session Token
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-[#919191]">
                                    Expiry
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-[#919191]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr class="z-10" v-for="(record, index) in props.sessionData" :key="index">
                                <td class="text-center py-3.5 pl-4 pr-3  sm:pl-6" :id="`${index}_sessioncheckbox`">
                                    <input aria-describedby="comments-description" name="comments" type="checkbox"
                                        v-model="selectedCheckbox" :value="record" :id="`${index}_table_td_${index}`"
                                        class="h-4 w-4 rounded-sm !border-[#919191] cursor-pointer accent-orange-600" />
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-[#363636] sm:pl-6">
                                    {{ record.appName }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-[#363636]">{{ record.name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-[#363636] ">
                                    <div class="longTxtRestrict">{{ record.userSession }}</div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-[#363636]">{{ record.expiry }}</td>
                                <td
                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                    <a class="text-indigo-600 absolute hover:text-indigo-900 text-left">
                                        <Menu as="div" class=" inline-block text-left ">
                                            <MenuButton :id="`${index}_del_btn`"
                                                @mouseover="getWindowHeight(`${index}_del_btn`)"
                                                class="flex items-center rounded-full">
                                                <img src="../../../assets/img/Home/deleteIcon.svg" alt="">
                                            </MenuButton>
                                            <transition enter-active-class="transition ease-out duration-100"
                                                enter-from-class="transform opacity-0 scale-95"
                                                enter-to-class="transform opacity-100 scale-100"
                                                leave-active-class="transition ease-in duration-75"
                                                leave-from-class="transform opacity-100 scale-100"
                                                leave-to-class="transform opacity-0 scale-95">
                                                <MenuItems :class="bottomStr"
                                                    class="absolute right-0 z-50 mt-2 w-56 h-[140px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <MenuItem>
                                                    <div>
                                                        <div class="p-5">
                                                            <div class="space-y-[10px] md:space-y-[12px]">
                                                                <p
                                                                    class="font-medium text-[14px] text-[#363636] text-center">
                                                                    Confirm Delete</p>
                                                                <p
                                                                    class="font-bold text-[12px] text-[#919191] text-center">
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
                                    </a>
                                </td>
                            </tr>
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
            </div>
        </div>
        <NoSession v-else />
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref, computed } from 'vue';
import NoSession from '../util/NoSession.vue';
import { useStore } from 'vuex';
const store = useStore();
const bottomStr = ref("");
const getWindowHeight = (id: any) => {
    let elmenntHyt: any = document.getElementById(id)?.getBoundingClientRect().top;
    let overAllHyt: any = elmenntHyt + 44;
    let bottomHyt: any = window.innerHeight - 45;
    bottomStr.value = bottomHyt - overAllHyt > 100 ? "" : "bottom-0";
}
const props = defineProps<{
    sessionData?: any
}>()
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
const selectedCheckbox = ref([])
const onSubmit = (record:any) => { 
    store.commit("dashboard/setSessionDeleteData", [record])
    store.commit("dashboard/setIsDeleteSession", true)
}
const onCancel = () => {
    // console.log("Cancel...");
}
const deleteAll = () => {    
    store.commit("dashboard/setSessionDeleteData", selectedCheckbox.value)
    store.commit("dashboard/setIsDeleteSession", true)
}

// const handleSubmit = () => {
//     console.log("onsubmitted...");
// }

</script>