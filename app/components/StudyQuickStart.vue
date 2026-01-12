<script setup lang="ts">
const emit = defineEmits<{
  (e: 'start', task: { title: string; subtitle: string; duration: number | null }): void;
}>();

const STORAGE_KEY = 'study-presets-data';
const presetTags = ref<{ label: string; icon: string }[]>([]);
const isEditingPresets = ref(false);
const isDetailOpen = ref(false);
const newTagName = ref('');
const selectedIcon = ref('i-lucide-tag');

const quickTask = reactive({
  title: '',
  subtitle: '',
  duration: 30 as number | null,
});

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  presetTags.value = saved
    ? JSON.parse(saved)
    : [
        { label: '数学', icon: 'i-lucide-calculator' },
        { label: '英語', icon: 'i-lucide-languages' },
        { label: 'プログラミング', icon: 'i-lucide-code-2' },
        { label: '読書', icon: 'i-lucide-book-open' },
      ];
});

watch(
  presetTags,
  (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

const iconOptions = [
  'i-lucide-tag',
  'i-lucide-book-open',
  'i-lucide-calculator',
  'i-lucide-languages',
  'i-lucide-code-2',
  'i-lucide-pen-tool',
  'i-lucide-brain',
  'i-lucide-flask-conical',
];

const addPreset = () => {
  if (!newTagName.value.trim()) return;
  presetTags.value.push({ label: newTagName.value.trim(), icon: selectedIcon.value });
  newTagName.value = '';
};

const selectTag = (tag: { label: string }) => {
  if (isEditingPresets.value) return;
  quickTask.title = tag.label;
};
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden mt-6 text-left">
    <div class="flex justify-between items-center mb-3 px-1 shrink-0">
      <p class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">クイック選択</p>
      <UButton
        :icon="isEditingPresets ? 'i-lucide-check' : 'i-lucide-settings-2'"
        size="xs"
        variant="ghost"
        color="neutral"
        @click="isEditingPresets = !isEditingPresets"
      >
        {{ isEditingPresets ? '完了' : '編集' }}
      </UButton>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 pb-10 scroll-container" style="max-height: calc(100vh - 280px)">
      <UCard :ui="{ body: 'p-6' }">
        <div class="space-y-8">
          <div class="flex flex-wrap gap-3">
            <div v-for="tag in presetTags" :key="tag.label" class="relative group">
              <UButton
                :icon="tag.icon"
                :label="tag.label"
                color="neutral"
                variant="subtle"
                class="rounded-xl font-bold"
                :class="isEditingPresets ? 'opacity-40 grayscale' : 'hover:ring-2 hover:ring-emerald-500'"
                @click="selectTag(tag)"
              />
              <UButton
                v-if="isEditingPresets"
                icon="i-lucide-x"
                size="xs"
                color="error"
                class="absolute -top-2 -right-2 rounded-full h-5 w-5 p-0"
                @click="presetTags = presetTags.filter((t) => t.label !== tag.label)"
              />
            </div>
          </div>

          <div
            v-show="isEditingPresets"
            class="p-4 bg-emerald-50/50 rounded-2xl border-2 border-emerald-500/20 space-y-4"
          >
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="icon in iconOptions"
                :key="icon"
                @click="selectedIcon = icon"
                class="p-2 rounded-lg"
                :class="selectedIcon === icon ? 'bg-emerald-500 text-white' : 'bg-white'"
              >
                <UIcon :name="icon" />
              </button>
            </div>
            <div class="flex gap-2">
              <UInput v-model="newTagName" placeholder="タグ名" class="flex-1" @keyup.enter="addPreset" />
              <UButton icon="i-lucide-plus" @click="addPreset" />
            </div>
          </div>

          <div class="space-y-6 pt-6 border-t" :class="isEditingPresets ? 'opacity-20 pointer-events-none' : ''">
            <div class="space-y-2">
              <label class="text-sm font-bold ml-1">タイトル</label>
              <div class="flex items-center gap-3">
                <UInput v-model="quickTask.title" placeholder="何に集中しますか？" size="xl" class="flex-1 font-bold" />
                <UButton
                  :icon="isDetailOpen ? 'i-lucide-chevron-up' : 'i-lucide-settings-2'"
                  variant="subtle"
                  @click="isDetailOpen = !isDetailOpen"
                />
              </div>
            </div>

            <div v-show="isDetailOpen" class="space-y-4 animate-in fade-in">
              <UFormField label="学習時間 (分)">
                <div class="flex items-center gap-4">
                  <UInput v-model.number="quickTask.duration" type="number" class="w-20" />
                  <URange v-model="quickTask.duration" :min="5" :max="180" :step="5" class="flex-1" />
                </div>
              </UFormField>
            </div>

            <UButton
              block
              size="xl"
              color="primary"
              label="学習を開始する"
              class="font-black"
              :disabled="!quickTask.title"
              @click="emit('start', quickTask)"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
