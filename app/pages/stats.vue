<script setup lang="ts">
const tabs = [
  { label: 'リスト', icon: 'i-lucide-list', slot: 'list' },
  { label: 'グラフ', icon: 'i-lucide-pie-chart', slot: 'graph' },
];
</script>

<template>
  <div
    class="min-h-screen lg:h-dvh bg-slate-50 dark:bg-slate-950 p-4 lg:p-8 text-slate-900 dark:text-slate-100 lg:overflow-hidden flex flex-col"
  >
    <UContainer class="max-w-7xl w-full flex-1 flex flex-col lg:overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-8 flex-1 lg:overflow-hidden">
        <div class="col-span-1 lg:col-span-3 shrink-0">
          <StatsCalendar />
        </div>

        <div class="col-span-1 lg:col-span-7 flex flex-col lg:overflow-hidden">
          <div
            class="bg-white dark:bg-slate-900 rounded-4xl p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex-1 flex flex-col lg:overflow-hidden"
          >
            <div class="flex-1 flex flex-col lg:overflow-hidden space-y-6">
              <StatsDateNavigation />

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
                  <StatsActivityList />
                </template>

                <template #graph>
                  <StatsChart />
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
