<script setup lang="ts">
import type { Schedule } from '~/types/schedule';

const props = defineProps<{
  isLoading: boolean;
  initialData?: Schedule | null;
}>();

const emit = defineEmits<{
  (
    e: 'submit',
    payload: {
      id?: string;
      title: string;
      subtitle: string;
      duration: number | null;
      tags: string[];
    }
  ): void;
}>();

const isDetailOpen = ref(false);
const isAiGenerating = ref(false);
const newTagInput = ref('');
const toast = useToast();
const form = reactive({
  id: undefined as string | undefined,
  title: '',
  subtitle: '',
  duration: 0 as number | null,
  tags: [] as string[],
});

const resetForm = () => {
  form.id = undefined;
  form.title = '';
  form.subtitle = '';
  form.duration = 60;
  form.tags = [];
  isDetailOpen.value = false;
  newTagInput.value = '';
};

watch(
  () => props.initialData,
  (newData) => {
    if (newData && newData.id) {
      form.id = newData.id;
      form.title = newData.title;
      form.subtitle = newData.subtitle || '';
      form.duration = newData.duration;
      form.tags = newData.tags ? [...newData.tags] : [];
      isDetailOpen.value = true;
    } else {
      form.id = undefined;
      form.title = '';
      form.subtitle = '';
      form.duration = 60;
      form.tags = [];
      isDetailOpen.value = false;
    }
  },
  { immediate: true, deep: true }
);

const generateAiTags = async () => {
  if (!form.title) {
    toast.add({ title: 'タイトルを入力してください', color: 'warning' });
    return;
  }
  isAiGenerating.value = true;
  try {
    const tags = await $fetch<string[]>('http://localhost:8787/api/ai-generate-tags', {
      method: 'POST',
      body: { title: form.title, subtitle: form.subtitle || '' },
      credentials: 'include',
    });
    if (Array.isArray(tags)) {
      form.tags = tags;
      toast.add({ title: 'AIタグを生成しました', color: 'primary' });
    }
  } catch (error: any) {
    toast.add({ title: 'エラー', color: 'error' });
  } finally {
    isAiGenerating.value = false;
  }
};

const addTag = () => {
  const trimmed = newTagInput.value.trim();
  if (trimmed && !form.tags.includes(trimmed) && form.tags.length < 3) {
    form.tags.push(trimmed);
    newTagInput.value = '';
  }
};

const removeTag = (index: number) => form.tags.splice(index, 1);

const handleSubmit = () => {
  if (!form.title) return;
  emit('submit', { ...form });
  if (!form.id) {
    resetForm();
  }
};
</script>

<template>
  <div class="flex flex-col h-full text-left overflow-hidden">
    <div class="flex-1 overflow-y-auto space-y-6 pr-1 pb-4 scrollbar-hide">
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-slate-700 dark:text-slate-200">タイトル</label>

        <div class="flex items-center gap-2">
          <UInput v-model="form.title" size="lg" placeholder="例: 数学" class="flex-1" />
          <UButton
            :icon="isDetailOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            color="neutral"
            variant="subtle"
            size="lg"
            class="shrink-0 shadow-sm"
            @click="isDetailOpen = !isDetailOpen"
          />
        </div>
      </div>

      <div
        class="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
        :class="isDetailOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div class="overflow-hidden">
          <div class="space-y-5 pt-2">
            <UFormField label="サブタイトル">
              <UInput v-model="form.subtitle" size="lg" placeholder="詳細を入力（任意）" />
            </UFormField>

            <UFormField label="予定時間 (分)">
              <UInput v-model="form.duration" type="number" size="lg" />
            </UFormField>

            <UFormField label="タグ (最大3つ)">
              <template #hint>
                <UButton
                  icon="i-lucide-sparkles"
                  label="AI生成"
                  variant="ghost"
                  size="xs"
                  :loading="isAiGenerating"
                  @click="generateAiTags"
                />
              </template>

              <div class="space-y-3 mt-1">
                <div class="flex gap-2">
                  <UInput
                    v-model="newTagInput"
                    placeholder="タグを追加"
                    class="flex-1"
                    @keydown.enter.prevent="addTag"
                  />
                  <UButton icon="i-lucide-plus" color="neutral" variant="subtle" class="shrink-0" @click="addTag" />
                </div>

                <div v-if="form.tags.length" class="flex flex-wrap gap-2 items-center">
                  <UBadge
                    v-for="(tag, index) in form.tags"
                    :key="index"
                    variant="subtle"
                    class="pl-2 pr-1 py-1 max-w-[120px]"
                  >
                    <span class="text-xs truncate">#{{ tag }}</span>
                    <UButton
                      icon="i-lucide-x"
                      size="xs"
                      variant="ghost"
                      class="ml-1 p-0.5 h-auto hover:bg-transparent"
                      @click="removeTag(index)"
                    />
                  </UBadge>
                </div>
              </div>
            </UFormField>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
      <UButton block color="primary" size="xl" :loading="isLoading" class="font-bold py-4" @click="handleSubmit">
        {{ form.id ? '更新する' : '追加する' }}
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.grid-rows-\[0fr\] {
  grid-template-rows: 0fr;
}
.grid-rows-\[1fr\] {
  grid-template-rows: 1fr;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
