<template>
  <!-- h-screen removed -->
  <div class="relative">
    <div v-if="location.name != 'login'" class="shadow-[0px_8px_10px_0px_#00000024] fixed top-0 w-full z-20 bg-white">
      <div class="mx-auto max-w-7xl ">
        <HeaderNav v-if="route.path.includes('/developer')"/>
      </div>
    </div>
    <div v-if="location.name == 'login'" class="sm:hidden shadow-[0px_8px_10px_0px_#00000024] fixed top-0 w-full z-20 bg-white">
      <div class="mx-auto max-w-7xl ">
        <HeaderNav />
      </div>
    </div>
    <div v-if="!getSuccessMessage" class="h-full">
      <RouterView />
    </div>
    <SuccessMessage v-else />
    <DeleteApp :content="stageContent"  />
    <EditApp v-if="isEdit"/>
    <EditSuccess v-if="isSuccess"/>
    <LogoutDialog v-if="isLogout"/>
    <DeleteSession v-if="isDeleteSession"/>
    
  </div>
</template>

<script setup lang="ts">
import {  RouterView } from 'vue-router'
import HeaderNav from '@/util/HeaderNav.vue';
import { useRoute } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex'; 

const route = useRoute()
const SuccessMessage = defineAsyncComponent(() => import("./components/login/SuccessMessage.vue"))
const DeleteApp = defineAsyncComponent(() => import("./util/DeleteApp.vue"))
const EditApp = defineAsyncComponent(() => import("./util/EditApp.vue"))
const EditSuccess = defineAsyncComponent(() => import("./util/EditSuccess.vue"))
const LogoutDialog = defineAsyncComponent(() => import("./util/logoutDialog.vue"))
const DeleteSession = defineAsyncComponent(() => import("./util/deleteSession.vue")) 
const store = useStore();
const location = useRoute();
const getSuccessMessage = computed(() => store.getters['getSuccessMessage']);
const getModelStage=computed(()=>store.getters['getModelStage']);
const isEdit = computed(() => store.getters['getEdit']);
const isSuccess = computed(()=>store.getters['getisSuccess']);
const isLogout = computed(() => store.getters['getIsLogout'])
const isDeleteSession = computed(()=>store.getters['dashboard/getIsDeleteSession'])
const deleteContent={
  title: 'Delete App',
  subTitle: 'Are you sure you want to delete this application? This action cannot be undone.',
  warning:'Important: All active sessions associated with this app will be immediately terminated.',
  btnTxt:'Delete App',
}
const regenerateAppContent={
  title: 'Regenrate App Secret',
  subTitle: 'Are you sure you want to Regenerate App secret? This action cannot be undone.',
  warning:'Important: All active sessions associated with this app will be immediately terminated.',
  btnTxt:'Regenrate App'
}
const stageContent=computed(()=>getModelStage.value =='delete' ? deleteContent :regenerateAppContent);

</script>

<style scoped></style>
