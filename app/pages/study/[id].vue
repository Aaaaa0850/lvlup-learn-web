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
} = useStudyTimer();

const isFinishModalOpen = ref(false);
const isSubmitting = ref(false);

onMounted(() => initTimer());
onUnmounted(() => stopTimer());

const handleFinishButtonClick = async () => {
  if (!isPaused.value) {
    togglePause();
  }
  isFinishModalOpen.value = true;
};
const handleFinalFinish = async () => {
  isSubmitting.value = true;
  const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!saved) return;

  const session = JSON.parse(saved);
  const actualMinutes = Math.max(1, Math.floor(elapsedSeconds.value / 60));

  try {
    await $fetch('http://localhost:8787/api/study-logs', {
      method: 'POST',
      body: {
        title: session.title,
        actualDuration: actualMinutes,
        tags: session.tags || [],
        completedAt: new Date().toISOString(),
        isQuickStart: session.isQuickStart,
      },
      credentials: 'include',
    });

    localStorage.removeItem(ACTIVE_SESSION_KEY);
    isFinishModalOpen.value = false;
    navigateTo('/stats');
  } catch (e) {
    alert('保存に失敗しました。ネットワーク状況を確認してください。');
  } finally {
    isSubmitting.value = false;
  }
};
const handleContinueButtonClick = async () => {
  isFinishModalOpen.value = false;
  if (isPaused.value) {
    togglePause();
  }
};
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

      <UModal
        v-model:open="isFinishModalOpen"
        :ui="{
          header: 'hidden',
          body: 'p-0',
          close: 'hidden',
        }"
      >
        <template #body>
          <div class="text-center space-y-4">
            <div
              class="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            >
              <UIcon name="i-lucide-award" class="w-8 h-8" />
            </div>
            <div class="space-y-1">
              <h3 class="text-xl font-black text-slate-800">お疲れ様でした！</h3>
              <p class="text-sm text-slate-500">今回の成果を記録しますか？</p>
            </div>

            <div class="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-400 font-bold whitespace-nowrap">内容</span>

                <div class="flex items-center gap-2 overflow-hidden justify-end">
                  <span class="text-sm font-bold text-slate-700 truncate">
                    {{ taskTitle }}
                  </span>
                  <span v-if="taskSubtitle" class="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md truncate">
                    {{ taskSubtitle }}
                  </span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-400 font-bold">実際の時間</span>
                <span class="text-sm font-black text-emerald-600">
                  {{ Math.floor(elapsedSeconds / 60) }} 分 {{ elapsedSeconds % 60 }} 秒
                </span>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex gap-6 justify-center w-full py-6">
            <UButton
              color="neutral"
              variant="subtle"
              label="まだ続ける"
              class="min-w-[140px] py-4 text-lg font-bold rounded-full transition-all flex justify-center text-center"
              @click="handleContinueButtonClick"
            />

            <UButton
              color="primary"
              label="記録して終了"
              class="min-w-[140px] py-4 text-lg font-black rounded-full shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex justify-center text-center"
              :loading="isSubmitting"
              @click="handleFinalFinish"
            />
          </div>
        </template>
      </UModal>
    </div>
  </UApp>
</template>
