<template>
    <div class="w-full mt-5 hidden lg:block" v-for="(item,idx) of props.data" :key="idx">
        <div class="flex border rounded-[10px]">
            <div class="py-[28px] w-[90px] h-[101px] px-[10px] bg-[#F6F6F6] flex items-center justify-center rounded-l-[10px]">
                <img class="my-auto" v-if="item.companyLogo && item.companyLogo.startsWith('data:') && item.companyLogo.includes('base64')" :src="item.companyLogo" alt="trade-smart">
                <div v-else>
                    <Avatar :name="item.appName"/>
                </div>
            </div>
            <div class="grid md:grid-cols-3 lg:grid-cols-5 w-full">
                <div class="py-[28px] px-[10px] ">
                    <div class="border-e border-dashed">
                        <p class=" font-semibold text-secondary text-[14px] text-center">App Name</p>
                        <p :title="item.appName" class="font-semibold text-[#363636] text-[16px] text-center text-ellipsis overflow-hidden">{{item.appName}}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px]">
                    <div class="border-e border-dashed">
                        <p class=" font-semibold text-secondary text-[14px] text-center">App Key</p>
                        <p class="font-semibold text-[#363636] text-[16px] text-center text-ellipsis overflow-hidden">{{item.appCode}}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px] ">
                    <div class="border-e border-dashed">
                        <p class=" font-semibold text-secondary text-[14px] text-center">App Secret Key</p>
                        <p :title="item.appSecret"  class="font-semibold text-[#363636] text-[16px] text-center text-ellipsis overflow-hidden">{{item.appSecret}}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px] ">
                    <div class="border-e border-dashed px-2">
                        <p class=" font-semibold text-secondary text-[14px] text-center">Redirect URL</p>
                        <p :title="item.redirectUrl" class="font-semibold text-[#363636] text-[16px] text-center text-ellipsis overflow-hidden">
                            {{ item.redirectUrl || 'NA' }}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px] ">
                    <div class=" ">
                        <p class=" font-semibold text-secondary text-[14px] text-center">Status</p>
                        <p class="font-semibold text-[#363636] text-[16px] text-center">{{ item.appStatus == 1 ? 'Active' : item.appStatus == 0 ? 'Inactive' : 'Blocked'}}</p>
                    </div>
                </div>
            </div>
            <div class="min-h-full ">
                <div class="h-full my-auto flex flex-col items-center justify-center">
                    <Menu as="div" class="relative inline-block text-left">
                        <div>
                            <MenuButton class="flex items-center hover:bg-slate-50 h-[101px] rounded-r-[10px]">
                                <span class="sr-only">Open options</span>
                                <img class="my-auto mx-[30px]" src="../../../assets/img/Home/dottedMenu.svg" alt="dotted-menu">
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-lg	bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="px-[12px]">
                                    <MenuItem v-for="(card, i) of item.appStatus == 0 ? basicCardActions : cardActions" :key="i" @click="callAction(item, card.key)">
                                    <span class="text-[#5438A0] text-[12px] font-semibold w-full flex items-center space-x-2 cursor-pointer"
                                        :class="['block py-5 text-[11px] cursor-pointer', (item.appStatus == 0 ? basicCardActions : cardActions).length - 1 != i ? 'border-b' : '']">
                                        <img :src="card.img" class="w-4 h-4 mr-3">
                                        {{ card.name }}
                                    </span>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-[14px] block lg:hidden">
        <div class="flex flex-col mt-3" v-for="(item,idx) of props.data" :key="idx">
            <div class="flex justify-between py-[7px] px-4 bg-[#F6F6F6] border-t border-r border-l rounded-t-[15px]">
                <div>
                    <img class="my-auto" v-if="item.companyLogo && item.companyLogo.startsWith('data:') && item.companyLogo.includes('base64')" :src="item.companyLogo" alt="trade-smart">
                    <div v-else>
                        <Avatar :name="item.appName"/>
                    </div>
                </div>
                <div>
                    <div class="h-full my-auto flex flex-col items-center justify-center">
                        <Menu as="div" class="relative inline-block text-left">
                            <div>
                                <MenuButton class="flex items-center ">
                                    <span class="sr-only">Open options</span>
                                    <img class="my-auto" src="../../../assets/img/Home/dottedMenu.svg"
                                        alt="dotted-menu">
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems class="absolute right-0 z-10 mt-2 w-[190px] origin-top-right rounded-lg	 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="px-[12px]">
                                        <MenuItem v-for="(data, i) of item.appStatus == 0 ? basicCardActions : cardActions" :key="i" @click="callAction(item,data.key)">
                                        <span
                                            class="text-[#5438A0] text-[11px] leading-[14px] font-semibold w-full flex items-center space-x-2 cursor-pointer"
                                            :class="['block py-4 cursor-pointer', (item.appStatus == 0 ? basicCardActions : cardActions).length - 1 != i ? 'border-b' : '']">
                                            <img :src="data.img" class="w-4 h-4 mr-3">
                                            {{ data.name }}
                                        </span>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>
            <div class="border-r border-l border-b rounded-b-[15px]">
                <div class="grid grid-cols-2 px-4 justify-center md:grid-cols-3 lg:grid-cols-5 w-full">
                    <div class="py-[20px]  ">
                        <div class="border-e border-dashed">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">App Name</p>
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px] text-ellipsis overflow-hidden">{{item.appName}}</p>
                        </div>
                    </div>
                    <div class="py-[20px]">
                        <div class="border-e border-dashed">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">App Key</p>
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px] text-ellipsis overflow-hidden">{{item.appCode}}</p>
                        </div>
                    </div>
                    <div class="py-[20px]  ">
                        <div class="lg:border-e-2 lg:border-dashed">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">App Secret Key</p>
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px] text-ellipsis overflow-hidden">{{item.appSecret}}</p>
                        </div>
                    </div>
                    <div class="py-[20px]  ">
                        <div class="border-e border-dashed px-2">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">Redirect URL</p>
                            <p
                                class="font-semibold text-[#363636] leading-[14px] text-[12px] text-center text-ellipsis overflow-hidden">
                                {{item.redirectUrl}}</p>
                        </div>
                    </div>
                    <div class="py-[20px]  ">
                        <div class=" ">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">Status</p>
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px] text-ellipsis overflow-hidden">{{ item.appStatus == 1 ? 'Active' : item.appStatus == 0 ? 'Inactive' : 'Blocked'}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import deleteIcon from '../../../assets/img/Home/deleteIcon.svg'
import editIcon from '../../../assets/img/Home/editIcon.svg'
import regenerateApp from '../../../assets/img/Home/regenerateApp.svg'
import viewIcon from "@/assets/img/Home/viewEye.svg"
import { ref, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex';
const store = useStore();
// const open = ref(true);
const cardActions = ref([
    { name: 'View All Details', img: viewIcon, key: 'view'},
    { name: 'Edit Details', img: editIcon, key: 'edit' },
    { name: 'Regenerate App Secret', img: regenerateApp, key: 'regenerateApp' },
    { name: 'Delete App', img: deleteIcon, key: 'delete' },
]);

const basicCardActions = ref([
    { name: 'View All Details', img: viewIcon, key: 'view'},
    { name: 'Edit Details', img: editIcon, key: 'edit' },
    { name: 'Delete App', img: deleteIcon, key: 'delete' },
]);
const callAction = (data:any, payload: string) => {
    store.commit('setModelStage',payload);
    let isEdit = payload == 'edit' ? true : false;
    let isDel = payload == 'delete' || payload == 'regenerateApp' ? true : false;
    const isViewDetails = payload == 'view'
    store.commit("dashboard/setEditData", data)
    store.commit('showEdit', isEdit);
    store.commit('showDelete', isDel);
    store.commit("dashboard/setIsViewDetailsDialog", isViewDetails)
}
const props= defineProps<{
    data?: any
}>()

const Avatar = defineAsyncComponent(() => import("../approval/avatar-c.vue"))
</script>