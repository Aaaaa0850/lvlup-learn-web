<script setup lang="ts">
import type { Activity } from '~/composables/useStats';

const open = defineModel<boolean>('open', { default: false });

interface Props {
  activity: Activity | null;
}

const props = defineProps<Props>();

const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tokyo',
    });
  } catch {
    return dateStr;
  }
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}時間${mins}分`;
  }
  return `${mins}分`;
};
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{
      header: 'hidden',
      body: 'p-0',
      close: 'hidden',
    }"
  >
    <template #body>
      <div class="p-6 lg:p-8">
        <!-- ヘッダー -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-black text-slate-900 dark:text-white">学習詳細</h2>
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            color="neutral"
            class="rounded-full"
            @click="open = false"
          />
        </div>

        <!-- コンテンツ -->
        <div v-if="activity" class="space-y-6">
          <!-- タイトル・サブタイトル -->
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {{ activity.title }}
            </h3>
            <p v-if="activity.subtitle" class="text-sm text-slate-600 dark:text-slate-400">
              {{ activity.subtitle }}
            </p>
          </div>

          <!-- 勉強時間 -->
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4">
            <div class="flex items-center gap-3">
              <div class="bg-emerald-400 text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-clock" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                  勉強時間
                </p>
                <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {{ formatDuration(activity.duration) }}
                </p>
              </div>
            </div>
          </div>

          <!-- 時間情報 -->
          <div class="space-y-3">
            <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <UIcon name="i-lucide-play-circle" class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                  開始時間
                </p>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">
                  {{ formatDateTime(activity.startDateTime) }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                  終了時間
                </p>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">
                  {{ formatDateTime(activity.endDateTime) }}
                </p>
              </div>
            </div>
          </div>

          <!-- タグ -->
          <div v-if="activity.tags.length > 0">
            <p class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-3">
              タグ
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in activity.tags"
                :key="tag"
                class="text-xs font-bold px-3 py-1.5 bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- 閉じるボタン -->
        <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <UButton
            label="閉じる"
            color="primary"
            variant="solid"
            block
            class="font-bold"
            @click="open = false"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

