<script setup lang="ts">
const {
  taskTitle,
  taskSubtitle,
  plannedDuration,
  elapsedSeconds,
  isPaused,
  displayTime,
  initTimer,
  togglePause,
  stopTimer,
  ACTIVE_SESSION_KEY,
  handleContinueButtonClick,
  handleFinalFinish,
  handleFinishButtonClick,
  isFinishModalOpen,
  isSubmitting,
} = useStudyTimer();

onMounted(() => initTimer());
onUnmounted(() => stopTimer());
</script>

<template>
  <UApp>
    <div class="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <UContainer class="max-w-md w-full space-y-12">
        <div class="space-y-2">
          <UBadge variant="subtle" color="primary" size="lg" class="px-4 py-1 rounded-full font-bold animate-pulse">
            学習中
          </UBadge>
          <h1 class="text-3xl font-black text-slate-800 dark:text-white truncate">{{ taskTitle }}</h1>
          <h2 class="text-2xl font-black text-slate-800 dark:text-white truncate">
            {{ taskSubtitle ? taskSubtitle : '' }}
          </h2>
          <p class="text-slate-500 font-medium">目標時間: {{ plannedDuration ? `${plannedDuration}分` : 'なし' }}</p>
        </div>

        <div class="relative flex items-center justify-center">
          <div class="relative z-10 text-6xl font-mono font-black tabular-nums text-emerald-500">
            {{ displayTime }}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UButton
            size="xl"
            :color="isPaused ? 'primary' : 'secondary'"
            variant="subtle"
            :icon="isPaused ? 'i-lucide-play' : 'i-lucide-pause'"
            :label="isPaused ? '再開' : '一時停止'"
            block
            class="font-bold py-4 rounded-2xl"
            @click="togglePause"
          />
          <UButton
            size="xl"
            color="primary"
            icon="i-lucide-check-circle"
            label="終了する"
            block
            class="font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20"
            @click="handleFinishButtonClick"
          />
        </div>
      </UContainer>

      <FinishStudyModal
        v-model:open="isFinishModalOpen"
        :task-title="taskTitle"
        :task-subtitle="taskSubtitle"
        :elapsed-seconds="elapsedSeconds"
        :is-submitting="isSubmitting"
        @confirm="handleFinalFinish"
        @cancel="handleContinueButtonClick"
      />
    </div>
  </UApp>
</template>
