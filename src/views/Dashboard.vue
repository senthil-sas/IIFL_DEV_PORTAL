<script setup lang="ts">
import HeaderNav from '@/util/HeaderNav.vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="mx-auto lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl h-full">
      <RouterView />
    </div>
  </div>
</template>
