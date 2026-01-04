<script setup lang="ts">
import type { Schedule } from '~/types/schedule';
defineProps<{ item: Schedule }>();
defineEmits(['delete', 'retry', 'update']);
</script>

<template>
  <div
    class="group relative overflow-hidden bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all duration-300"
  >
    <div class="flex-1 min-w-0 flex items-center gap-4" :class="{ 'opacity-40': item.status }">
      <div
        class="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0"
      >
        <span class="text-xs font-bold">{{ item.duration }}</span>
        <span class="text-[10px] uppercase opacity-70">min</span>
      </div>

      <div class="flex-1 min-w-0 flex flex-col gap-0.5 text-left">
        <h4 class="font-bold text-slate-800 dark:text-white truncate">{{ item.title }}</h4>
        <p v-if="item.subtitle" class="text-xs text-slate-500 truncate mb-1">{{ item.subtitle }}</p>

        <div v-if="item.tags && item.tags.length > 0" class="flex flex-wrap gap-1 mt-0.5">
          <UBadge
            v-for="tag in item.tags"
            :key="tag"
            variant="subtle"
            size="xs"
            color="neutral"
            class="text-[10px] px-1.5 py-0"
          >
            #{{ tag }}
          </UBadge>
        </div>
      </div>
      <UButton
        v-if="!item.status"
        color="neutral"
        variant="ghost"
        icon="i-lucide-square-pen"
        size="sm"
        @click.stop="$emit('update', item)"
      />
      <UButton
        v-if="!item.status"
        color="neutral"
        variant="ghost"
        icon="i-lucide-trash"
        size="sm"
        @click.stop="$emit('delete', item.id)"
      />
    </div>

    <div
      v-if="item.status"
      class="absolute inset-0 flex items-center justify-center z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px]"
    >
      <div class="flex items-center gap-2 text-sm font-bold">
        <template v-if="item.status === 'saving'">
          <UIcon name="i-lucide-loader-2" class="animate-spin text-emerald-500" />
          <span class="text-slate-700 dark:text-slate-200">保存中...</span>
        </template>

        <template v-else-if="item.status === 'success'">
          <UIcon name="i-lucide-check-circle" class="text-primary-600" />
          <span class="text-primary-600">完了</span>
        </template>

        <template v-else-if="item.status === 'error'">
          <UIcon name="i-lucide-alert-circle" class="text-red-500" />
          <span class="text-red-600">保存に失敗しました</span>
          <UButton size="xs" color="primary" variant="subtle" label="再試行" @click="$emit('retry', item)" />
          <UButton size="xs" color="error" variant="subtle" label="削除" @click="$emit('delete', item.id)" />
        </template>
      </div>
    </div>
  </div>
</template>
