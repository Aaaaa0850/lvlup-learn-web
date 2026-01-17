<script setup lang="ts">
import type { Schedule } from '~/types/schedule';

defineProps<{
  items: Schedule[];
  pending: boolean;
  error: any;
}>();

const emit = defineEmits(['delete', 'open-modal', 'retry', 'update', 'refresh', 'cancel']);

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div class="relative w-full min-w-full">
    <div class="md:hidden mb-4">
      <UButton
        block
        size="xl"
        icon="i-lucide-plus"
        label="新しい予定を追加"
        class="font-bold shadow-sm"
        @click="$emit('open-modal')"
      />
    </div>

    <div v-if="pending || !isMounted" class="w-full py-32 flex flex-col items-center justify-center text-center">
      <UIcon name="i-lucide-loader-2" class="w-10 h-10 animate-spin text-emerald-500 mb-4" />
      <p class="text-sm font-bold text-slate-400 tracking-wide animate-pulse">スケジュールを確認中...</p>
    </div>

    <div
      v-else-if="error"
      class="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-red-100 rounded-2xl bg-red-50/30 text-center"
    >
      <UIcon name="i-lucide-alert-circle" class="w-10 h-10 text-red-400 mb-3" />
      <p class="text-sm font-bold text-red-600 mb-4">データの取得に失敗しました</p>
      <UButton label="再読み込み" icon="i-lucide-refresh-cw" variant="soft" color="primary" @click="$emit('refresh')" />
    </div>

    <div v-else class="w-full">
      <TransitionGroup v-if="items.length > 0" name="schedule-list" tag="div" class="space-y-3 pb-20 relative">
        <ScheduleCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          @delete="(id) => $emit('delete', id)"
          @retry="(item) => $emit('retry', item)"
          @update="(item) => $emit('update', item)"
          @cancel="(id) => $emit('cancel', id)"
        />
      </TransitionGroup>

      <div
        v-else
        class="w-full flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center"
      >
        <UIcon name="i-lucide-calendar-plus" class="w-12 h-12 mb-3 text-slate-300" />
        <p class="text-sm font-medium text-slate-500">予定がありません</p>
        <p class="hidden md:block text-xs text-slate-400 mt-1">左側のフォームから新しい予定を追加しましょう</p>
        <p class="md:hidden text-xs text-slate-400 mt-1">上のボタンから新しい予定を追加しましょう</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schedule-list-move,
.schedule-list-enter-active,
.schedule-list-leave-active {
  position: relative;
}
.schedule-list-move {
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.schedule-list-enter-active {
  transition: all 0.3s ease-out;
}
.schedule-list-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.schedule-list-leave-active {
  transition: all 0.25s ease-in;
  position: absolute;
  width: 100%;
}
.schedule-list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}
</style>
