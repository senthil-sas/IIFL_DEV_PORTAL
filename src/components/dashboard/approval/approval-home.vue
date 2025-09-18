<template>
    <div class="relative mx-auto lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl h-full">
        <div class="px-5 lg:px-0 pt-[50px] lg:pt-[132px]">
            <div class="flex justify-between items-center sticky top-[100px] z-10 bg-white">
                <div class="flex gap-3">
                    <p class="font-bold text-[16px] lg:text-[22px] text-[#363636]">Applications {{ `${partnerApps &&
                        partnerApps.length > 0 ? `(${partnerApps.length})` : ''}`}}</p>
                    <spinner v-if="loader"/>
                </div>
                <div class="flex gap-3 items-center">
                    <selectFilter v-model="selectedStatus" :options="statuses" />
                    <selectFilter v-if="partnerApps.length" v-model="noOfRecords" :options="lists" width="w-20"/>
                    <Pagination v-if="partnerApps.length" v-model="currentPage" :totalPages="totalPages" />
                </div>
                
            </div>
            <div class="h-[calc(100vh-200px)] overflow-y-auto mt-2" v-if="(partnerApps && partnerApps.length != 0) && !loader">
                <AppCard :data="partnerApps" @action="getApps()"/>
            </div>
            <div v-if="partnerApps.length == 0 && !loader" class="text-[#919191] h-[300px] py-10 flex justify-center items-center text-lg font-semibold">
                No Data Found
            </div>
        </div>
        <!-- <div class="my-[80px] lg:mt-[158px] px-5">
            <div
                v-if="sessionData && ((sessionData.trading && sessionData.trading.length > 0) || (sessionData.nonTrading && sessionData.nonTrading.length > 0))">
                <div>
                    <p class="text-[16px] sm:text-[22px] text-[#282828] font-bold">Active Sessions {{ sessionLength ?
                        sessionLength : ''}}</p>
                </div>
                <div>
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
                    <Table class="hidden md:block"
                        :sessionData="currentTab == 1 ? sessionData.nonTrading : sessionData.trading" />
                    <TableMobView class="block md:hidden"
                        :sessionData="currentTab == 1 ? sessionData.nonTrading : sessionData.trading" />
                </div>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import AppCard from './app-card.vue';
// import Table from '../util/Table.vue';
// import TableMobView from '../util/TableMobView.vue';
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue';
import { useStore } from "vuex";
const store = useStore();
const loader = computed(() => store.getters["approval/getLoader"])


const partnerApps = computed(() => store.getters["approval/getAdminFilterData"].data || []);


const getApps = async() => {
    const json = {
        mobile: "",
        email: "",
        vendorId: "",
        approvalStatus: selectedStatus.value.key,
        pageNumber: currentPage.value,
        pageSize: noOfRecords.value.key
    };
    await store.dispatch("approval/getAdminFilterData", json);
}

onMounted(() => {
    getApps()
})

const selectFilter = defineAsyncComponent(() => import("./select-filter.vue"))

const statuses = ref([{ name: "Pending", key: '0' }, { name: "Approved", key: '1' }, { name: "Block", key: '2' }])
const selectedStatus = computed({
    get() {
        return store.getters["approval/getSelectedStatus"]
    }, 
    set(value) {
        store.commit("approval/setSelectedStatus", value)
        getApps()
    }
})

const lists = ref([{ name: "10", key: '10' }, { name: "20", key: '20' }, { name: "50", key: '50' }, { name:"100", key: '100'}])
const noOfRecords = ref(lists.value[0])

const currentPage = ref(1)
const totalPages = computed(() => store.getters["approval/getAdminFilterData"].totalPages)
watch([currentPage, noOfRecords], getApps)

const Pagination = defineAsyncComponent(() => import("./pagination-c.vue"))
</script>