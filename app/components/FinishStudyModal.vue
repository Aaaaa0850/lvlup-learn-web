<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false });

interface Props {
  taskTitle: string;
  taskSubtitle?: string;
  elapsedSeconds: number;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
});

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
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
      <div class="text-center space-y-4">
        <div class="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
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
          @click="handleCancel"
        />

        <UButton
          color="primary"
          label="記録して終了"
          class="min-w-[140px] py-4 text-lg font-black rounded-full shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex justify-center text-center"
          :loading="isSubmitting"
          @click="handleConfirm"
        />
      </div>
    </template>
  </UModal>
</template>
