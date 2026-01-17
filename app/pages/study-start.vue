<script setup lang="ts">
const { schedules, pending, error, refresh, startStudy, skipTask } = useStudySchedules();

const tabs = [
  { label: 'スケジュール', icon: 'i-lucide-calendar-check', slot: 'planned' },
  { label: 'クイックスタート', icon: 'i-lucide-zap', slot: 'quick' },
];
</script>

<template>
  <div class="h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex flex-col items-center overflow-hidden">
    <UContainer class="max-w-2xl w-full flex flex-col h-full px-0">
      <header class="py-4 mb-2 shrink-0 w-full flex justify-between items-center">
        <h1 class="text-2xl font-black flex items-center gap-3 italic uppercase">
          <UIcon name="i-lucide-play" class="text-emerald-500" />
          勉強を開始する
        </h1>
      </header>

      <UTabs :items="tabs" class="w-full flex-1 flex flex-col overflow-hidden">
        <template #planned>
          <StudyPlannedList
            :schedules="schedules"
            :pending="pending"
            :error="!!error"
            @refresh="() => refresh()"
            @start="startStudy"
            @skip="skipTask"
          />
        </template>

        <template #quick>
          <StudyQuickStart @start="startStudy" />
        </template>
      </UTabs>
    </UContainer>
  </div>
</template>

<style>
.scroll-container::-webkit-scrollbar {
  width: 5px;
}
.scroll-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
