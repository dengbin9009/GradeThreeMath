<script setup lang="ts">
import { computed, onErrorCaptured, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import AppShell from "../components/app-shell/AppShell.vue";

const fatalError = ref("");
const route = useRoute();
const bare = computed(() => route.name === "login" || route.name === "change-password");

onErrorCaptured((error) => {
  fatalError.value = error instanceof Error ? error.message : "页面遇到了问题";
  return false;
});
</script>

<template>
  <div class="app-root">
    <div v-if="fatalError" class="fatal-error" role="alert">
      <strong>页面暂时无法继续</strong>
      <span>{{ fatalError }}</span>
      <button type="button" @click="fatalError = ''">返回工作台</button>
    </div>
    <RouterView v-else v-slot="{ Component }">
      <component :is="Component" v-if="bare" />
      <AppShell v-else><component :is="Component" /></AppShell>
    </RouterView>
  </div>
</template>
