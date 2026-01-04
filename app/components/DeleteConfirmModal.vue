<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
const closeSelected = () => {
  open.value = false;
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
      <div class="p-6">
        <div class="flex items-center gap-4 text-slate-600 dark:text-slate-300 mb-6">
          <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-full">
            <UIcon name="i-lucide-alert-triangle" class="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white">本当に削除しますか？</p>
            <p class="text-sm opacity-80">この操作は取り消せません。</p>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <UButton label="キャンセル" color="neutral" variant="ghost" @click="closeSelected" />
          <UButton label="削除する" color="error" variant="solid" class="font-bold" @click="emit('confirm')" />
        </div>
      </div>
    </template>
  </UModal>
</template>
