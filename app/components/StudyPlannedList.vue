<script setup lang="ts">
interface Schedule {
  id: string;
  title: string;
  subtitle?: string;
  duration: number | null;
  tags?: string[];
}

defineProps<{
  schedules: Schedule[] | null;
  pending: boolean;
  error: boolean;
}>();

const emit = defineEmits<{
  (e: 'refresh'): void;
  (e: 'start', task: Schedule): void;
  (e: 'skip', task: Schedule): void;
}>();

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden mt-6 text-left">
    <div class="flex justify-between items-center mb-3 px-1 shrink-0">
      <p class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">確定済みの予定</p>
      <UButton
        v-if="!pending"
        icon="i-lucide-refresh-cw"
        variant="ghost"
        color="neutral"
        size="xs"
        @click="emit('refresh')"
      />
    </div>

    <div class="flex-1 overflow-y-auto pr-2 pb-10 space-y-4 scroll-container" style="max-height: calc(100vh - 280px)">
      <div v-if="pending || !isMounted" class="flex flex-col items-center justify-center py-12 space-y-3">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-emerald-500" />
        <p class="text-xs font-bold text-slate-400 animate-pulse">スケジュールを取得中...</p>
      </div>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-red-100 rounded-3xl px-6"
      >
        <UIcon name="i-lucide-alert-circle" class="w-8 h-8 text-red-500 mb-2" />
        <p class="text-sm font-bold text-slate-600">データの取得に失敗しました</p>
        <UButton label="再試行" variant="link" color="primary" @click="emit('refresh')" />
      </div>

      <div
        v-else-if="!schedules || schedules.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl px-6"
      >
        <div class="bg-slate-100 p-4 rounded-full mb-4">
          <UIcon name="i-lucide-calendar-x" class="w-8 h-8 text-slate-400" />
        </div>
        <h3 class="font-bold mb-1 text-sm text-slate-800">スケジュールがありません</h3>
        <p class="text-xs text-slate-400 mt-1">クイックスタートから勉強を開始しましょう</p>
      </div>

      <template v-else>
        <StudyPlannedCard
          v-for="item in schedules"
          :key="item.id"
          :item="item"
          @start="(task : Schedule) => emit('start', task)"
          @skip="(task: Schedule) => emit('skip', task)"
        />
      </template>
    </div>
  </div>
</template>
