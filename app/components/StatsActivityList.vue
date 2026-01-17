<script setup lang="ts">
import type { Activity } from '~/composables/useStats';
import { useStats } from '~/composables/useStats';

const { selectedActivities } = useStats();
const selectedActivity = ref<Activity | null>(null);
const isDetailModalOpen = ref(false);

const openDetailModal = (activity: Activity) => {
  selectedActivity.value = activity;
  isDetailModalOpen.value = true;
};
</script>

<template>
  <div v-if="selectedActivities.length > 0" class="grid gap-4 py-2">
    <div
      v-for="item in selectedActivities"
      :key="item.id"
      class="bg-slate-50 dark:bg-slate-800/40 p-4 lg:p-5 rounded-2xl flex items-start gap-4"
    >
      <div
        class="bg-white dark:bg-slate-900 shadow-sm text-emerald-600 w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800"
      >
        <span class="text-lg font-black leading-none">{{ item.duration }}</span>
        <span class="text-[9px] font-bold uppercase opacity-60">min</span>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-base lg:text-lg">{{ item.title }}</h4>
        <p v-if="item.subtitle" class="text-xs lg:text-sm text-slate-500 mb-2">{{ item.subtitle }}</p>
        <div v-if="item.tags.length" class="flex flex-wrap gap-1.5 mb-3">
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="text-[10px] font-bold px-2 py-0.5 bg-slate-200/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600"
            >#{{ tag }}</span
          >
        </div>
        <UButton
          size="xs"
          variant="outline"
          color="neutral"
          class="text-xs font-semibold"
          @click="openDetailModal(item)"
        >
          <UIcon name="i-lucide-info" class="w-3 h-3 mr-1" />
          詳細
        </UButton>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-full py-12 text-slate-400">
    <UIcon name="i-lucide-calendar-x" class="w-12 h-12 opacity-20 mb-4" />
    <p class="text-sm font-bold">選択された日の記録はありません</p>
  </div>

  <!-- 詳細モーダル -->
  <ActivityDetailModal v-model:open="isDetailModalOpen" :activity="selectedActivity" />
</template>

