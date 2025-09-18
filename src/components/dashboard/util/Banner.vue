<template>
    <div class="h-full w-full px-5 lg:px-0 grid grid-col-1 lg:grid-cols-2">
        <div class="flex items-center">
            <div>
                <p class="font-bold text-[16px] lg:text-[24px]">Start Building Your Application</p>
                <p class="mt-[28px] text-[14px] text-[#919191] lg:text-[16px]">You haven’t created any applications yet. Click the
                    button
                    below to start building
                    your first app and explore the endless possibilities our APIs offer.</p>
                <button type="button" @click="navigateCreateApp()"
                    class="font-bold text-[16px] lg:text-[20px] text-white h-[40px] w-[130px] lg:h-[50px] rounded-[10px] lg:w-[180px] bg-[#FAAA38] mt-[30px] lg:mt-[50px]">Create
                    App</button>
            </div>
        </div>
        <div class="w-full hidden lg:block">
            <img class="ml-auto" src="../../../assets/img/Home/myApps.svg" alt="API">
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const navigateCreateApp = () => {
    router.push({ path: '/developer/create_app' });
}
</script>