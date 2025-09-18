<template>
    <div class="relative">
        <div class="pt-[80px] px-5 lg:px-0  lg:pt-[132px] flex items-center gap-2">
            <p class="text-[18px] leading-[24px] lg:text-[30px] font-bold lg:leading-[40.85px] text-[#242056]">Hello, {{company}} 👋</p>
            <spinner  v-if="loader" />    
        </div>
        
        <div class="px-5 lg:px-0" v-if="partnerApps && partnerApps.length > 0 && !loader">
            <div class="flex justify-between items-center mt-8">
                <div>
                    <p class=" font-bold text-[16px] lg:text-[22px] text-[#363636]">Your Applications {{`${partnerApps && partnerApps.length > 0 ? `(${partnerApps.length})` : ''}`}}</p>
                </div>

                <button type="button" @click="navigateCreateApp()"
                    class="font-bold text-[14px] lg:text-[20px] text-white h-[30px] lg:h-[50px] rounded lg:rounded-[10px] w-[108px] lg:w-[180px] bg-[#FAAA38]">Create
                    App
                </button>

            </div>
            <div >
            <AppCard :data="partnerApps"/> 
            </div>
        
        </div> 
        <Banner v-if="(partnerApps && partnerApps.length <= 0) && !loader" />
        <!-- <div class="my-[80px] lg:mt-[158px] px-5" >
        <div  v-if="sessionData && ((sessionData.trading && sessionData.trading.length > 0) || (sessionData.nonTrading && sessionData.nonTrading.length > 0))">
            <div >
                <p class="text-[16px] sm:text-[22px] text-[#282828] font-bold">Active Sessions {{sessionLength ? sessionLength : ''}}</p>
            </div>
            <div  >
                <div class="pt-5 sm:pt-[30px]">
                    <div class="block">
                        <div class="border-b border-gray-200">
                            <nav class="-mb-px flex space-x-8 overflow-auto" aria-label="Tabs">
                                <a v-for="tab in tabs" :key="tab.name" @click="activeTab(tab)"
                                    :class="[tab.current ? 'border-b-[3px] border-[#5438A0] text-[#5438A0] font-semibold' : 'font-semibold border-transparent text-secondary  hover:text-secondary', 'whitespace-nowrap border-b-2 px-1 py-2 sm:py-4 text-[12px] sm:text-sm cursor-pointer']"
                                    :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</a>
                            </nav>
                        </div>
                    </div>
                </div>
                <Table class="hidden md:block" :sessionData="currentTab == 1 ? sessionData.nonTrading : sessionData.trading"/>
                <TableMobView class="block md:hidden" :sessionData="currentTab == 1 ? sessionData.nonTrading : sessionData.trading" />
            </div>
        </div>
        <NoSession v-else />
    </div> -->
    </div>
    <ViewDetailsDialog v-if="isViewDetailsDialog"/>
</template>
<script setup lang="ts">
import Banner from './util/Banner.vue';
import AppCard from './util/AppCard.vue';
// import NoSession from './util/NoSession.vue';
// import Table from './util/Table.vue';
// import TableMobView from './util/TableMobView.vue';
import { useRouter } from 'vue-router'
import { computed, onMounted, defineAsyncComponent } from 'vue';
import { useStore } from "vuex";
const store =useStore();
// const tabs = ref([
//     { id: 0, name: 'Trading Sessions', href: '#', current: true },
//     { id: 1, name: 'Non-Trading Sessions', href: '#', current: false },
// ]);
// const currentTab = ref()
const loader = computed(() => store.getters["dashboard/getIsLoader"])
const company = computed(()=> store.getters["auth/getCmpName"])
const router = useRouter()
const navigateCreateApp = () => {
    router.push({ path: '/developer/create_app' });
}
const partnerApps: any = computed(() => store.getters["dashboard/getPartnerApps"]); 
// const sessionData: any = computed(() => store.getters["dashboard/getTradingSession"]); 
// const sessionLength =  computed(() => {
//     return  currentTab.value == 1 ? 
//     sessionData.value.nonTrading.length > 0 ?`(${sessionData.value.nonTrading.length})` : '' :
//     sessionData.value.trading.length > 0 ? `(${sessionData.value.trading.length})` : ''
// }) 
// const activeTab = (tab: any) => { 
//     store.commit("dashboard/setActiveSessionTab", tab.name)
//     currentTab.value = tab.id
    
//     tabs.value = tabs.value.map((data) => {
//         if (tab.name == data.name) {
//             data.current = true;
//             return data;
//         }
//         else {
//             data.current = false;
//             return data;
//         }
//     })
// }

onMounted(()=>{
    store.dispatch("dashboard/getPartnerApps")
    store.dispatch("dashboard/getTradeSession")
})

const ViewDetailsDialog = defineAsyncComponent(() => import("@/util/viewDetails.vue"))
const isViewDetailsDialog = computed(() => store.getters["dashboard/getIsViewDetailsDialog"])
</script>