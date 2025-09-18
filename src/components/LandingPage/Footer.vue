<template>
    <div class="text-[11px] px-5 lg:px-0 bottom-0 z-10 py-[22px] sticky bg-white text-[#919191] leading-5 text-center" style="box-shadow: 8px 0px 12px 0px #E2E2E2CC">
        <span class="font-semibold">Copyright © {{ currentYear }}</span> <span class="underline text-[#633EE3] text-[11px] font-semibold decoration-from-font" style="text-decoration-skip-ink: none"> IIFL Capital Services Limited</span> All rights Reserved. <br> <span class="font-normal"> SEBI REGN NO.:INZ000164132, DEPOSITORY: IN DP NSDL 185 2000, IN DP CDSL 352 2006 | AMFI REGN NO.: ARN-47791, India Infoline Commodities Limited: NCDEX: NCDEX-CO-04-00378 & MCX:10470 </span>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const currentYear = ref(new Date().getFullYear())
</script>

