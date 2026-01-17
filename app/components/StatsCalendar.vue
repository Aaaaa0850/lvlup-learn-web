<script setup lang="ts">
import { useStats } from '~/composables/useStats';

const { viewDate, selectedDate, calendarDays, changeMonth, formatDate } = useStats();
</script>

<template>
  <UCard class="border-none shadow-sm bg-white dark:bg-slate-900 rounded-4xl">
    <div class="flex items-center justify-between p-6 px-4 border-b border-slate-50 dark:border-slate-800">
      <UButton
        icon="i-lucide-chevron-left"
        variant="ghost"
        color="primary"
        class="rounded-full"
        @click="changeMonth(-1)"
      />
      <span class="text-lg font-bold">{{ viewDate.getFullYear() }}年 {{ viewDate.getMonth() + 1 }}月</span>
      <UButton
        icon="i-lucide-chevron-right"
        variant="ghost"
        color="primary"
        class="rounded-full"
        @click="changeMonth(1)"
      />
    </div>
    <div
      class="grid grid-cols-7 text-[11px] font-bold text-slate-400 text-center my-4 px-4 uppercase tracking-widest"
    >
      <span v-for="w in ['日', '月', '火', '水', '木', '金', '土']" :key="w">{{ w }}</span>
    </div>
    <div class="grid grid-cols-7 gap-1.5 p-4 pt-0">
      <div v-for="(d, idx) in calendarDays" :key="idx" class="aspect-square">
        <button
          v-if="d"
          @click="selectedDate = new Date(d.dateStr)"
          :disabled="d.total === 0"
          class="w-full h-full flex items-center justify-center text-[13px] font-bold transition-all border-[2.5px] rounded-xl"
          :class="[
            formatDate(selectedDate) === d.dateStr
              ? 'border-slate-800 dark:border-white ring-2 ring-slate-800/5 shadow-md scale-105 z-10'
              : 'border-transparent',
            d.total > 0
              ? [d.bgColor, 'cursor-pointer hover:opacity-80 active:scale-95']
              : 'text-slate-200 dark:text-slate-800 cursor-not-allowed opacity-50',
          ]"
        >
          {{ d.day }}
        </button>
      </div>
    </div>
  </UCard>
</template>

