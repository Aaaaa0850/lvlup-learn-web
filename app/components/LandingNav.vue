<script setup lang="ts">
const props = defineProps<{
  isAuthModalOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:isAuthModalOpen', value: boolean): void;
}>();

const openModal = () => {
  emit('update:isAuthModalOpen', true);
};
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div class="flex items-center justify-between px-4 md:px-6 py-4 max-w-7xl mx-auto">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-50"
        >
          <UIcon name="i-heroicons-bolt-20-solid" class="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <span class="text-lg md:text-xl font-black tracking-tighter text-slate-900 uppercase">LVLUP Learn</span>
      </div>

      <div class="flex items-center gap-2 md:gap-4">
        <UButton
          variant="ghost"
          color="neutral"
          class="font-bold text-slate-600 text-sm md:text-base px-2 md:px-4"
          @click="openModal"
        >
          ログイン
        </UButton>
        <UButton
          color="primary"
          class="rounded-full px-4 md:px-6 font-bold shadow-md shadow-emerald-50 text-sm md:text-base whitespace-nowrap bg-emerald-400 hover:bg-emerald-500 text-white"
          @click="openModal"
        >
          無料で始める
        </UButton>
      </div>
    </div>
  </nav>
</template>

