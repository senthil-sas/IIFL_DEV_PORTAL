<template>
    <div class="h-auto border w-full sm:w-[500px] rounded-[20px] shadow-[0px_10px_50px_0px_#B5B5B54D] z-[999] bg-white">
        <div class="px-5 py-6 lg:p-[50px] sm:space-y-[40px]">
            <div class="flex justify-start sm:flex-none">
                <img class="mx-auto hidden sm:block" :src="store.state.clientLogo" alt="IIFL-Logo">
                <img class="sm:hidden" src="../../assets/img/login/backNavigation.svg" alt="navigation">
            </div>
            <div>
                <p class="font-bold text-nowrap text-[28px] leading-[40px] text-center hidden sm:block">Create New Account </p>
                <p class="text-center text-[#919191] text-[16px] pt-[20px] leading-[21px] hidden sm:block">Please select your business type</p>
                <p class="font-bold text-nowrap mt-[24px] text-[20px] leading-[40px] text-center sm:hidden">Select your business type</p>
            </div>
            <div> 
                <div class="mt-[40px]">
                    <div class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-[12px]">
                        <div v-for="(account, accountIdx) in accounts" :key="accountIdx"
                            class="relative flex flex-col items-start px-[12px] py-[15px] h-auto w-full sm:w-[194px] border rounded-[10px] border-[#83838B]">
                            <div class="min-w-full flex justify-between text-sm leading-6">
                                <label :for="`account-${account.id}`" class="font-medium text-secondary text-[14px] leading-[19px]">{{ account.name}}</label>
                                
                                <div class="ml-3 flex h-6 items-center">
                                    <input :id="`account-${account.id}`"
                                        :aria-describedby="`account-${account.id}-description`" name="account"
                                        type="radio" 
                                        v-model="tradeType"
                                        :value="account.key"
                                        class="h-4 w-4 !border-[#83838B] text-[#F37021] focus:ring-[#F37021] accent-orange-600" />
                                </div>
                            </div>
                            <div>
                                <p class="text-[#919191] text-[12px] pt-[11px] leading-[14px]">{{
                                    account.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-[31px] sm:mt-[40px]">
                    <button type="button" :disabled="tradeType.length==0 || loader" @click="onsubmit()" :class="tradeType.length && !loader ? 'bg-[#FAAA38]' : 'bg-[#DEDEDE]'"
                        class="w-full text-white h-[40px] sm:h-[50px] rounded-lg md:rounded-[10px] text-[16px] sm:text-[20px]">
                        <spinner  v-if="loader" />    
                        <span class="leading-[27px] font-bold" v-if="!loader" >Continue</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from "vuex";
const store =useStore();
const accounts = [
    { id: 'checking', key: "trading", name: 'Trading Platform', description: 'For platforms offering algo strategy marketplaces, DIY strategies, back testing, charting, and other trading services.' },
    { id: 'savings', key: "nonTrading", name: 'Non-Trading Platform', description: 'For platforms that manage client portfolios, offer tax filing services, or handle other financial reporting needs.' },
]
const tradeType = ref('');
const loader = computed(() => store.getters["auth/getIsLoader"]);
const onsubmit=()=>{
    store.dispatch("auth/saveCmpDetails", tradeType.value)
}
</script>