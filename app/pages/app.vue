<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <div
      v-if="appLoading"
      class="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white dark:bg-gray-950"
    >
      <div class="relative">
        <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-primary-500" />
        <UIcon name="i-heroicons-sparkles" class="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
      </div>
      <p class="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">LVLUP Learn を読み込み中...</p>
    </div>

    <div v-else>
      <NuxtLayout>
        <NuxtLoadingIndicator color="rebeccapurple" />
        <NuxtPage />
      </NuxtLayout>
    </div>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const appLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    appLoading.value = false;
  }, 500);
});
</script>
