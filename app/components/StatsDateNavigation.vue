<script setup lang="ts">
import { useStats } from '~/composables/useStats';

const {
  selectedDate,
  selectedDayTotal,
  hasPreviousDay,
  hasNextDay,
  navigateToPreviousDay,
  navigateToNextDay,
} = useStats();
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-50 dark:border-slate-800 pb-6 gap-4 shrink-0"
  >
    <div class="flex items-center gap-4">
      <UButton
        icon="i-lucide-chevron-left"
        variant="soft"
        class="rounded-full transition-all"
        :class="hasPreviousDay ? 'bg-slate-100 dark:bg-slate-800' : 'opacity-0 pointer-events-none'"
        @click="navigateToPreviousDay"
      />
      <div>
        <h2 class="text-2xl lg:text-3xl font-black italic">
          {{ selectedDate.getMonth() + 1 }}月{{ selectedDate.getDate() }}日
        </h2>
        <p class="text-slate-500 mt-1 flex items-center gap-2 text-sm">
          <UIcon name="i-lucide-history" class="w-4 h-4" />学習詳細
        </p>
      </div>
      <UButton
        icon="i-lucide-chevron-right"
        variant="soft"
        class="rounded-full transition-all"
        :class="hasNextDay ? 'bg-slate-100 dark:bg-slate-800' : 'opacity-0 pointer-events-none'"
        @click="navigateToNextDay"
      />
    </div>
    <div class="text-left sm:text-right">
      <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Time</div>
      <div class="text-3xl lg:text-4xl font-black text-emerald-600 tracking-tight">
        {{ selectedDayTotal }}<span class="text-sm ml-1 text-slate-400">min</span>
      </div>
    </div>
  </div>
</template>

