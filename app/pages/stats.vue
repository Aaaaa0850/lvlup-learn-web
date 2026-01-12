<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  type ChartOptions,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

// --- Types ---
interface Activity {
  id: number;
  title: string;
  subtitle: string;
  duration: number;
  completedAt: string;
  tags: string[];
}

// --- Utils ---
const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const generateColorFromText = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360}, 65%, 60%)`;
};

// --- State ---
const viewDate = ref(new Date());
const selectedDate = ref(new Date());

// モックデータ（実績がある日として 3/10, 3/15, 3/16 を設定）
const allActivities = ref<Activity[]>([
  { id: 1, title: 'TypeScript基礎', subtitle: '型パズル演習', duration: 30, completedAt: '2024-03-10', tags: ['TS'] },
  {
    id: 2,
    title: 'Nuxt 3 実装',
    subtitle: 'Server Components',
    duration: 90,
    completedAt: '2024-03-11',
    tags: ['Nuxt'],
  },
  {
    id: 3,
    title: 'UIデザイン',
    subtitle: 'Tailwind リファクタ',
    duration: 150,
    completedAt: '2024-03-12',
    tags: ['Design'],
  },
  {
    id: 4,
    title: 'Turso実践',
    subtitle: 'DBスキーマ設計',
    duration: 210,
    completedAt: '2024-03-13',
    tags: ['DB', 'Backend'],
  },
  {
    id: 5,
    title: 'Turs実践',
    subtitle: 'DBスキーマ設計',
    duration: 270,
    completedAt: '2024-03-14',
    tags: ['DB', 'Backend'],
  },
  {
    id: 6,
    title: 'Tu実践',
    subtitle: 'DBスキーマ設計',
    duration: 330,
    completedAt: '2024-03-15',
    tags: ['DB', 'Backend'],
  },
  {
    id: 7,
    title: 'Tu実践',
    subtitle: 'DBスキーマ設計',
    duration: 390,
    completedAt: '2024-03-16',
    tags: ['DB', 'Backend'],
  },
  {
    id: 8,
    title: 'Tu実践',
    subtitle: 'DBスキーマ設計',
    duration: 390,
    completedAt: '2024-03-16',
    tags: ['DB', 'Backend'],
  },
  {
    id: 9,
    title: 'Tu実践',
    subtitle: 'DBスキーマ設計',
    duration: 390,
    completedAt: '2024-03-16',
    tags: ['DB', 'Backend'],
  },
  {
    id: 10,
    title: 'Tu実践',
    subtitle: 'DBスキーマ設計',
    duration: 390,
    completedAt: '2024-03-16',
    tags: ['DB', 'Backend'],
  },
  {
    id: 11,
    title: 'Tu実践',
    subtitle: 'DBスキーマ設計',
    duration: 390,
    completedAt: '2024-03-16',
    tags: ['DB', 'Backend'],
  },
]);

// --- Computed: Calendar ---
const activeDates = computed(() => {
  const dates = allActivities.value.map((a) => a.completedAt);
  return [...new Set(dates)].sort();
});

const getDayTotal = (dateStr: string) => {
  return allActivities.value.filter((a) => a.completedAt === dateStr).reduce((sum, a) => sum + a.duration, 0);
};

const calendarDays = computed(() => {
  const year = viewDate.value.getFullYear();
  const month = viewDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = Array(firstDay).fill(null);
  for (let i = 1; i <= lastDate; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const total = getDayTotal(dateStr);
    let bgColor = '';
    if (total >= 360) bgColor = 'bg-emerald-800 text-white';
    else if (total >= 300) bgColor = 'bg-emerald-700 text-white';
    else if (total >= 240) bgColor = 'bg-emerald-600 text-white';
    else if (total >= 180) bgColor = 'bg-emerald-500 text-white';
    else if (total >= 120) bgColor = 'bg-emerald-400 text-white';
    else if (total >= 60) bgColor = 'bg-emerald-200 text-emerald-900';
    else if (total > 0) bgColor = 'bg-emerald-100 text-emerald-800';

    days.push({ day: i, dateStr, total, bgColor });
  }
  return days;
});

// --- Computed: Selected Details ---
const selectedActivities = computed(() => {
  return allActivities.value.filter((a) => a.completedAt === formatDate(selectedDate.value));
});

const currentIndex = computed(() => activeDates.value.indexOf(formatDate(selectedDate.value)));

// --- Methods ---
const navigateDate = (direction: 'prev' | 'next') => {
  const nextIdx = direction === 'prev' ? currentIndex.value - 1 : currentIndex.value + 1;
  if (activeDates.value[nextIdx]) selectedDate.value = new Date(activeDates.value[nextIdx]);
};

const changeMonth = (diff: number) => {
  viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + diff, 1);
};

// --- Chart Configuration ---
const chartData = computed(() => {
  const stats: Record<string, number> = {};
  selectedActivities.value.forEach((a) => (stats[a.title] = (stats[a.title] || 0) + a.duration));

  const labels = Object.keys(stats);
  return {
    labels,
    datasets: [
      {
        data: Object.values(stats),
        backgroundColor: labels.map((l) => generateColorFromText(l)),
        hoverOffset: 12,
        borderWidth: 0,
      },
    ],
  };
});

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '80%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: { usePointStyle: true, padding: 15, font: { size: 11, weight: 'bold' }, color: '#94a3b8' },
    },
    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: 12, cornerRadius: 8 },
  },
};

const tabs = [
  { label: 'リスト', icon: 'i-lucide-list', slot: 'list' },
  { label: 'グラフ', icon: 'i-lucide-pie-chart', slot: 'graph' },
];
</script>

<template>
  <div
    class="min-h-screen lg:h-screen lg:h-[100dvh] bg-slate-50 dark:bg-slate-950 p-4 lg:p-8 text-slate-900 dark:text-slate-100 lg:overflow-hidden flex flex-col"
  >
    <UContainer class="max-w-7xl w-full flex-1 flex flex-col lg:overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-8 flex-1 lg:overflow-hidden">
        <div class="col-span-1 lg:col-span-3 shrink-0">
          <UCard class="border-none shadow-sm bg-white dark:bg-slate-900 rounded-[2rem]">
            <div class="flex items-center justify-between p-6 px-4 border-b border-slate-50 dark:border-slate-800">
              <UButton
                icon="i-lucide-chevron-left"
                variant="ghost"
                color="primary"
                class="rounded-full"
                @click="changeMonth(-1)"
              />
              <span class="text-lg font-bold">{{ viewDate.getFullYear() }}年 {{ viewDate.getMonth() + 1 }}月</span>
              <UButton
                icon="i-lucide-chevron-right"
                variant="ghost"
                color="primary"
                class="rounded-full"
                @click="changeMonth(1)"
              />
            </div>
            <div
              class="grid grid-cols-7 text-[11px] font-bold text-slate-400 text-center my-4 px-4 uppercase tracking-widest"
            >
              <span v-for="w in ['日', '月', '火', '水', '木', '金', '土']" :key="w">{{ w }}</span>
            </div>
            <div class="grid grid-cols-7 gap-1.5 p-4 pt-0">
              <div v-for="(d, idx) in calendarDays" :key="idx" class="aspect-square">
                <button
                  v-if="d"
                  @click="selectedDate = new Date(d.dateStr)"
                  :disabled="d.total === 0"
                  class="w-full h-full flex items-center justify-center text-[13px] font-bold transition-all border-[2.5px] rounded-xl"
                  :class="[
                    formatDate(selectedDate) === d.dateStr
                      ? 'border-slate-800 dark:border-white ring-2 ring-slate-800/5 shadow-md scale-105 z-10'
                      : 'border-transparent',
                    d.total > 0 ? [d.bgColor, 'cursor-pointer hover:opacity-80'] : 'text-slate-200 cursor-not-allowed',
                  ]"
                >
                  {{ d.day }}
                </button>
              </div>
            </div>
          </UCard>
        </div>

        <div class="col-span-1 lg:col-span-7 flex flex-col lg:overflow-hidden">
          <div
            class="bg-white dark:bg-slate-900 rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex-1 flex flex-col lg:overflow-hidden"
          >
            <div class="flex-1 flex flex-col lg:overflow-hidden space-y-6">
              <div
                class="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-50 dark:border-slate-800 pb-6 gap-4 shrink-0"
              >
                <div class="flex items-center gap-4">
                  <UButton
                    icon="i-lucide-chevron-left"
                    variant="soft"
                    class="rounded-full transition-all"
                    :class="[currentIndex <= 0 ? 'opacity-0 pointer-events-none' : 'bg-slate-100 dark:bg-slate-800']"
                    @click="navigateDate('prev')"
                  />
                  <div>
                    <h2 class="text-2xl lg:text-3xl font-black italic">
                      {{ selectedDate.getMonth() + 1 }}月{{ selectedDate.getDate() }}日
                    </h2>
                    <p class="text-slate-500 mt-1 flex items-center gap-2 text-sm">
                      <UIcon name="i-lucide-history" class="w-4 h-4" />過去の学習記録
                    </p>
                  </div>
                  <UButton
                    icon="i-lucide-chevron-right"
                    variant="soft"
                    class="rounded-full transition-all"
                    :class="[
                      currentIndex >= activeDates.length - 1 || currentIndex === -1
                        ? 'opacity-0 pointer-events-none'
                        : 'bg-slate-100 dark:bg-slate-800',
                    ]"
                    @click="navigateDate('next')"
                  />
                </div>
                <div class="text-left sm:text-right">
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Time</div>
                  <div class="text-3xl lg:text-4xl font-black text-emerald-600 tracking-tight">
                    {{ getDayTotal(formatDate(selectedDate)) }}<span class="text-sm ml-1 text-slate-400">min</span>
                  </div>
                </div>
              </div>

              <UTabs
                :items="tabs"
                class="flex-1 flex flex-col min-h-0"
                :ui="{
                  root: 'flex-1 flex flex-col min-h-0',
                  list: 'shrink-0 mb-2',
                  content:
                    'flex-1 min-h-[380px] max-h-[380px] overflow-y-auto custom-scrollbar px-1 lg:min-h-0 focus:outline-none touch-pan-y',
                }"
              >
                <template #list>
                  <div class="grid gap-4 py-2">
                    <div
                      v-for="item in selectedActivities"
                      :key="item.id"
                      class="bg-slate-50 dark:bg-slate-800/40 p-4 lg:p-5 rounded-2xl flex items-start gap-4"
                    >
                      <div
                        class="bg-white dark:bg-slate-900 shadow-sm text-emerald-600 w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800"
                      >
                        <span class="text-lg font-black leading-none">{{ item.duration }}</span>
                        <span class="text-[9px] font-bold uppercase opacity-60">min</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-base lg:text-lg">{{ item.title }}</h4>
                        <p v-if="item.subtitle" class="text-xs lg:text-sm text-slate-500 mb-2">{{ item.subtitle }}</p>
                        <div v-if="item.tags.length" class="flex flex-wrap gap-1.5">
                          <span
                            v-for="tag in item.tags"
                            :key="tag"
                            class="text-[10px] font-bold px-2 py-0.5 bg-slate-200/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-600"
                            >#{{ tag }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template #graph>
                  <div class="flex flex-col items-center justify-center py-6 h-full">
                    <div v-if="selectedActivities.length > 0" class="w-full max-w-[280px] h-64 relative">
                      <Doughnut :data="chartData" :options="chartOptions" />
                      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
                        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total</span>
                        <span class="text-xl font-black text-slate-700 dark:text-slate-200"
                          >{{ getDayTotal(formatDate(selectedDate)) }}m</span
                        >
                      </div>
                    </div>
                  </div>
                </template>
              </UTabs>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 20px;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
}
</style>
