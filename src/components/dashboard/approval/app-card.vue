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
                        <p class=" font-semibold text-secondary text-[14px] text-center">Date</p>
                        <p class="font-semibold text-[#363636] text-[16px] text-center">{{ formateData(item.createdOn) || 'NA' }}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px]">
                    <div class="border-e border-dashed">
                        <p class=" font-semibold text-secondary text-[14px] text-center">Client ID</p>
                        <p class="font-semibold text-[#363636] text-[16px] text-center">{{ item.clientId || 'NA' }}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px] flex justify-center items-center">
                    <div class="border-e border-dashed">
                        <p class=" font-semibold text-secondary text-[14px] text-center">SSO Type</p>
                        <p class="font-semibold text-[#363636] text-[16px] text-center longTxtRestrict">{{item.ssoType || 'NA'}}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px] ">
                    <div class="border-e border-dashed px-2">
                        <p class=" font-semibold text-secondary text-[14px] text-center">App Name</p>
                        <p class="font-semibold text-[#363636] text-[16px] text-center text-ellipsis overflow-hidden">
                            {{ item.appName || 'NA'}}</p>
                    </div>
                </div>
                <div class="py-[28px] px-[10px] ">
                    <div class=" ">
                        <p class=" font-semibold text-secondary text-[14px] text-center">Status</p>
                        <p class="font-semibold text-[#363636] text-[16px] text-center">{{ approvalStatus(item.approvalStatus) }}</p>
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
                                    <MenuItem v-for="(card, i) of getStatusBasedAction(item.approvalStatus)" :key="i" @click="callAction(item, card.key)">
                                    <span class="text-[#5438A0] text-[12px] font-semibold w-full flex items-center space-x-2 cursor-pointer"
                                        :class="['block py-5 text-[11px] cursor-pointer', getStatusBasedAction(item.approvalStatus).length - 1 != i ? 'border-b' : '']">
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
        <div class="flex flex-col " v-for="(item,idx) of props.data" :key="idx">
            <div class="flex justify-between py-[7px] px-4 bg-[#F6F6F6] border-t border-r border-l rounded-t-[15px]">
                <div>
                    <img class="my-auto" src="../../../assets/img/Home/icon-TradeSmart.svg" alt="trade-smart">
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
                                        <MenuItem v-for="(data, i) of getStatusBasedAction(item.approvalStatus)" :key="i" @click="callAction(item,data.key)">
                                        <span
                                            class="text-[#5438A0] text-[11px] leading-[14px] font-semibold w-full flex items-center space-x-2 cursor-pointer"
                                            :class="['block py-4 cursor-pointer', getStatusBasedAction(item.approvalStatus).length - 1 != i ? 'border-b' : '']">
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
                <div class="grid grid-cols-3 px-4 justify-center md:grid-cols-3 lg:grid-cols-5 w-full">
                    <div class="py-[20px]  ">
                        <div class="border-e border-dashed">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">App Name</p>
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px]">{{item.appName}}</p>
                        </div>
                    </div>
                    <div class="py-[20px]">
                        <div class="border-e border-dashed">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">App Key</p>
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px]">{{item.appCode}}</p>
                        </div>
                    </div>
                    <div class="py-[20px]  ">
                        <div class="lg:border-e-2 lg:border-dashed">
                            <p class=" font-semibold text-secondary text-[11px] text-center leading-4">App Secret Key</p>
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px] longTxtRestrict">{{item.appSecret}}</p>
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
                            <p class="font-semibold text-[#363636] text-[12px] text-center leading-[14px]">{{ approvalStatus(item.approvalStatus) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <isConfirmationDialog v-if="isConfirm" :isOpen="isConfirm" :state="currentStage" @close="closeDialog" @confirm="confirmDialog"/>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import deleteIcon from '../../../assets/img/Home/deleteIcon.svg'
import editIcon from '../../../assets/img/Home/editIcon.svg'
import regenerateApp from '../../../assets/img/Home/regenerateApp.svg'
import { ref, defineAsyncComponent, computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore();

const cardActions = ref([
    { name: 'Approve', img: editIcon, key: 'approve' },
    { name: 'Reject', img: regenerateApp, key: 'reject' },
]);

const blockCardActions = ref([
    { name: 'Block', img: deleteIcon, key: 'block' },
]);

const unblockAction = ref([
    { name: 'Un Block', img: deleteIcon, key: 'unBlock' }
])

const currentStage = ref()
const currentData = ref()
const callAction = (data:any, payload: string) => {
    currentStage.value = payload;
    currentData.value = data;
    store.commit("approval/setIsConfirmationDialog", true)
}
const props= defineProps<{
    data?: any
}>()


const approvalStatus=(status:number)=>{
    if(status==0) return "Pending";
    else if(status==1) return "Approved";
    else if(status==2) return "Block"
}

const emit = defineEmits(['action'])

const approve = async (data:any) => {
    let json = {
        appId: data?.id,
        action: "approve",
        performedBy: "Admin"
    }
    await store.dispatch("approval/getApproveRejectApp", json)
    emit('action')
}

const reject = async(data:any) => {
    let json = {
        appId: data?.id,
        action: "reject",
        rejectionReason: "--",
        performedBy: "admin"
    }
    await store.dispatch("approval/getApproveRejectApp", json)
    emit('action')
}

const block = async (data:any) => {
    let json = {
        // id: data?.id ? data?.id : "",
        appId: data?.id,
        action: "block",
        performedBy: "admin"
    }
    // await store.dispatch("approval/getApproveBlockApp", json);
    await store.dispatch("approval/getApproveRejectApp", json);
    emit('action')
}


const formateData = (date:any) => {
    if(!date) return
    const dateStr = date;
    const [year, month, day] = dateStr.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

const Avatar = defineAsyncComponent(() => import("./avatar-c.vue"))
const isConfirmationDialog = defineAsyncComponent(() => import("./confirmation-dialog.vue"))
const isConfirm = computed(() => store.getters["approval/getIsConfirmationDialog"])

const closeDialog = () => {
    store.commit("approval/setIsConfirmationDialog", false)
}

const confirmDialog = async(param:any) => {  
    console.log(param, 'param');
    
    if(param == 'approve' || param == 'unBlock') {
        await approve(currentData.value)
    } else if(param == 'reject') {
        await reject(currentData.value)
    } else if(param == 'block') {
        await block(currentData.value)
    } 
    closeDialog()
}   

const getStatusBasedAction = (status:any):any => {
    if(status == 0) {
        return cardActions.value
    } else if(status == 1) {
        return blockCardActions.value
    } else if(status == 2) {
        return unblockAction.value
    }
    return []
}

</script>