<script setup lang="ts">
const menuItems = [
  {
    title: '学習を開始',
    description: '前日に立てたスケジュールから選ぶか、クイックスタートで今すぐ始められます',
    icon: 'i-lucide-play',
    route: '/study-start',
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    title: '実績',
    description: '学習時間や進捗をグラフで視覚的に確認できます',
    icon: 'i-lucide-bar-chart-3',
    route: '/stats',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'スケジュール',
    description: '翌日の学習計画を立てて、計画的に学習を進められます',
    icon: 'i-lucide-calendar',
    route: '/schedule',
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-600',
  },
];
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- ヘッダー -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-100 mb-6">
          <UIcon name="i-lucide-layout-dashboard" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4">
          ダッシュボード
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          学習を効率的に管理し、目標達成をサポートします。各機能を活用して学習習慣を身につけましょう。
        </p>
      </div>

      <!-- メニューカードグリッド -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <UCard
          v-for="(item, index) in menuItems"
          :key="index"
          class="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 overflow-hidden"
          @click="navigateTo(item.route)"
        >
          <div class="p-6">
            <div
              class="w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-100/50 group-hover:scale-110 transition-transform duration-300"
              :class="`${item.gradient}`"
            >
              <UIcon :name="item.icon" class="w-7 h-7 text-white" />
            </div>

            <h2 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
              {{ item.title }}
            </h2>
            <p class="text-sm text-slate-600 mb-4">
              {{ item.description }}
            </p>

            <div class="flex items-center text-emerald-600 font-semibold text-sm group-hover:text-emerald-700">
              <span>アクセス</span>
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </UCard>
      </div>

      <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-emerald-100">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-3">
            クイックアクセス
          </h2>
          <p class="text-slate-600">
            よく使う機能へワンクリックでアクセス
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            to="/study-start"
            color="primary"
            size="xl"
            class="rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-200/50 transition-all bg-emerald-600 hover:bg-emerald-700 text-white"
            icon="i-lucide-play"
          >
            学習を開始
          </UButton>
          <UButton
            to="/stats"
            variant="outline"
            size="xl"
            class="rounded-full px-8 py-6 text-base font-bold border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all"
            icon="i-lucide-bar-chart-3"
          >
            実績を確認
          </UButton>
          <UButton
            to="/schedule"
            variant="outline"
            size="xl"
            class="rounded-full px-8 py-6 text-base font-bold border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all"
            icon="i-lucide-calendar"
          >
            スケジュール
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

