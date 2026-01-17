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
import { useStats } from '~/composables/useStats';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const { selectedActivities, selectedDayTotal, chartData } = useStats();

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
</script>

<template>
  <div class="flex flex-col items-center justify-center py-6 h-full">
    <div v-if="selectedActivities.length > 0" class="w-full max-w-[280px] h-64 relative">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total</span>
        <span class="text-xl font-black text-slate-700 dark:text-slate-200"
          >{{ selectedDayTotal }}m</span
        >
      </div>
    </div>
    <div v-else class="text-slate-400 font-bold text-sm">表示するデータがありません</div>
  </div>
</template>

