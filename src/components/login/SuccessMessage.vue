<template>
  <div class="grid grid-cols-1 justify-center item-center md:h-screen" :class="{ 'h-screen' : getSuccessMessage}">
    <div class="flex flex-col justify-center items-center px-5">
      <div :class="getSuccessMessage ? '':'border shadow-[0px_10px_50px_0px_#B5B5B54D]'" class="flex flex-col  rounded-[20px] py-8 sm:border-0 sm:py-0  sm:shadow-none">
        <div>
          <img
            class="mx-auto w-[60px] h-[60px] sm:size-auto"
            src="../../assets/img/login/successToast.svg"
            alt="Congratulations"
          />
        </div>
        <p v-if="getstageMsg" class="font-semibold text-[#363636] text-center text-[22px] sm:text-[40px] leading-[54px] mt-[30px] md:mt-[33px]">
          Congratulations!
        </p>
        <p v-if="getstageMsg" class="font-semibold text-[#919191] text-center text-[14px] sm:text-[20px] pt-5 md:pt-[26px] px-4 sm:px-0">
          {{ getstageMsg }}
        </p>
        <p v-if="getSuccessMessage" class="font-semibold text-center text-[22px] sm:text-[40px] pt-5 md:pt-[26px] text-[#363636]">
          {{ getSuccessMessage }}
        </p>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const getstageMsg = computed(() => store.getters["getstageMsg"]);
const getSuccessMessage = computed(() => store.getters["getSuccessMessage"]);
</script>
