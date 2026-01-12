<script setup lang="ts">
// スケジュール1件分の型
interface Schedule {
  id: string;
  title: string;
  subtitle?: string;
  duration: number | null;
  tags?: string[];
}

defineProps<{
  item: Schedule;
}>();

const emit = defineEmits<{
  (e: 'start', task: Schedule): void;
  (e: 'skip', task: Schedule): void;
}>();
</script>

<template>
  <div class="group flex items-center animate-in fade-in slide-in-from-bottom-2">
    <UCard
      @click="emit('start', item)"
      class="flex-1 cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all duration-300"
      :ui="{ root: 'relative shadow-sm border-slate-100', body: 'p-4' }"
    >
      <div class="flex items-center gap-4 text-left">
        <div
          class="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 font-mono border border-emerald-100"
        >
          <span class="text-sm font-bold leading-none">{{ item.duration ?? '--' }}</span>
          <span class="text-[9px] font-black mt-0.5 opacity-70">MIN</span>
        </div>

        <div class="flex-1 min-w-0 flex flex-col gap-0.5">
          <h4 class="font-bold truncate leading-tight">{{ item.title }}</h4>
          <p v-if="item.subtitle" class="text-xs text-slate-500 truncate">{{ item.subtitle }}</p>
          <div v-if="item.tags?.length" class="flex flex-wrap gap-1 mt-0.5">
            <UBadge v-for="tag in item.tags" :key="tag" variant="subtle" size="xs" color="neutral" class="text-[10px]">
              #{{ tag }}
            </UBadge>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0 ml-1">
          <UButton
            icon="i-lucide-circle-slash"
            color="error"
            variant="ghost"
            size="sm"
            class="text-slate-300 hover:text-red-500 p-2"
            @click.stop="emit('skip', item)"
          />
          <UIcon
            name="i-lucide-play-circle"
            class="w-8 h-8 text-emerald-500/40 group-hover:text-emerald-500 transition-all"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
