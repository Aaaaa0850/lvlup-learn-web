<script setup lang="ts">
import type { Schedule } from '~/types/schedule';

defineProps<{
  items: Schedule[];
}>();

const emit = defineEmits(['delete', 'open-modal', 'retry', 'update']);

const handleDeleteEmit = (id: string) => {
  emit('delete', id);
};
</script>

<template>
  <div>
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

    <TransitionGroup v-if="items.length > 0" name="schedule-list" tag="div" class="space-y-3 pb-20 relative">
      <ScheduleCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @delete="handleDeleteEmit"
        @retry="(data) => $emit('retry', data)"
        @update="(item) => $emit('update', item)"
      />
    </TransitionGroup>

    <div
      v-else
      class="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800"
    >
      <UIcon name="i-lucide-calendar-plus" class="w-12 h-12 mb-3 text-slate-300" />
      <p class="text-sm font-medium text-slate-500">予定がありません</p>
      <p class="hidden md:block text-xs text-slate-400 mt-1">左側のフォームから新しい予定を追加しましょう</p>
      <p class="md:hidden text-xs text-slate-400 mt-1">上のボタンから新しい予定を追加しましょう</p>
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
