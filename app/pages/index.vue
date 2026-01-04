<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
});
const isAuthModalOpen = ref(false);
</script>

<template>
  <UApp>
    <div class="bg-white text-slate-800 min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div class="flex items-center justify-between px-4 md:px-6 py-4 max-w-7xl mx-auto">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100"
            >
              <UIcon name="i-heroicons-bolt-20-solid" class="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span class="text-lg md:text-xl font-black tracking-tighter text-slate-900 uppercase">LVLUP Learn</span>
          </div>

          <div class="flex items-center gap-2 md:gap-4">
            <UButton
              variant="ghost"
              color="neutral"
              class="font-bold text-slate-600 text-sm md:text-base px-2 md:px-4"
              @click="isAuthModalOpen = true"
            >
              ログイン
            </UButton>
            <UButton
              color="primary"
              class="rounded-full px-4 md:px-6 font-bold shadow-md shadow-emerald-100 text-sm md:text-base whitespace-nowrap"
              @click="isAuthModalOpen = true"
            >
              無料で始める
            </UButton>
          </div>
        </div>
      </nav>

      <section class="relative pt-24 pb-32 px-6 overflow-hidden text-center">
        <div class="absolute inset-0 -z-10">
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.08),transparent_50%)]"
          ></div>
          <div class="absolute top-20 left-[10%] w-72 h-72 bg-emerald-100/30 rounded-full blur-[100px]"></div>
        </div>

        <div class="max-w-5xl mx-auto">
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-700 text-xs font-bold mb-10 tracking-widest uppercase"
          >
            Planned for people who can't plan
          </div>

          <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-10 text-slate-900 leading-[1.05]">
            予定は、<span class="text-emerald-500">明日まで</span>でいい。<br />
            やった事実は、一生消えない。
          </h1>

          <p class="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
            あなたの「今」をAIが優しく可視化。計画倒れで自分を責めてしまうあなたの学習に、そっと寄り添います。
          </p>

          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <UButton
              size="xl"
              color="primary"
              class="px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
              @click="isAuthModalOpen = true"
            >
              無料で今すぐ始める
            </UButton>
          </div>
        </div>
      </section>

      <section class="py-24 space-y-40 max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div class="flex-1 space-y-6">
            <div
              class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner"
            >
              <UIcon name="i-heroicons-calendar-days" class="w-6 h-6" />
            </div>
            <h2 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-snug">
              24時間限定の予定。<br /><span class="text-slate-400">縛られない、という自由。</span>
            </h2>
            <p class="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
              明日以降の予定は、あえて立てられません。遠い未来の不安や、過去の「できなかった計画」に追い詰められる日々はもう終わり。今の自分にできることだけに、100%集中しましょう。
            </p>
          </div>
          <div
            class="flex-1 w-full aspect-video bg-slate-50 rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center relative group overflow-hidden"
          >
            <UIcon
              name="i-heroicons-clock"
              class="w-20 h-20 text-emerald-100 group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          <div class="flex-1 space-y-6">
            <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
              <UIcon name="i-heroicons-sparkles" class="w-6 h-6" />
            </div>
            <h2 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-snug">
              AIが、学習内容を<br /><span class="text-slate-400">分析し、タグに変換。</span>
            </h2>
            <p class="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
              やりたいことを入力するだけでAIが内容を分析。自動で適切なカテゴリやタグを生成します。「なんて入力しよう？」と迷う時間はもう必要ありません。
            </p>
          </div>
          <div
            class="flex-1 w-full aspect-video bg-slate-50 rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center relative group overflow-hidden"
          >
            <UIcon
              name="i-heroicons-cpu-chip"
              class="w-20 h-20 text-teal-100 group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div class="flex-1 space-y-6">
            <div
              class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner"
            >
              <UIcon name="i-heroicons-play-circle-20-solid" class="w-6 h-6" />
            </div>
            <h2 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-snug">
              シンプルな学習タイマー。<br /><span class="text-slate-400">余計な機能は、削ぎ落とす。</span>
            </h2>
            <p class="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
              ボタン一つで計測開始。集中を妨げるアラームも、複雑な設定もありません。ミニマルなデザインがあなたの作業を尊重し、静かに時間を記録します。
            </p>
          </div>
          <div
            class="flex-1 w-full aspect-video bg-slate-50 rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center relative group overflow-hidden"
          >
            <UIcon
              name="i-heroicons-play-circle-20-solid"
              class="w-20 h-20 text-emerald-100 group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          <div class="flex-1 space-y-6">
            <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
              <UIcon name="i-heroicons-chart-bar" class="w-6 h-6" />
            </div>
            <h2 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-snug">
              「やった事実」を可視化。<br /><span class="text-slate-400">積み上げた自信は、消えない。</span>
            </h2>
            <p class="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
              予定は毎日リセットされますが、あなたの「頑張り」はデータとして蓄積されます。積み上がったログがダッシュボードを彩り、やがて揺るぎない自信へと変わります。
            </p>
          </div>
          <div
            class="flex-1 w-full aspect-video bg-slate-50 rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center relative group overflow-hidden"
          >
            <UIcon
              name="i-heroicons-chart-pie"
              class="w-20 h-20 text-teal-100 group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </section>

      <section class="py-28 bg-slate-900 text-white rounded-[3rem] mx-6 mb-32 overflow-hidden relative shadow-2xl">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px]"></div>
        <div class="max-w-3xl mx-auto px-6 text-center space-y-12">
          <div class="inline-block p-4 rounded-full bg-white/5 border border-white/10">
            <UIcon name="i-heroicons-heart" class="w-8 h-8 text-emerald-400" />
          </div>

          <h2 class="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            「今日できなかった」を、<br />
            自分を責める理由にしないで。
          </h2>

          <div class="space-y-8 text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
            <p>
              多くのアプリは「未達成」を指摘しますが、<br class="hidden md:block" />
              LVLUP Learnはあなたの<strong>「少しでもやろうとした」</strong>事実を尊重します。
            </p>
            <p class="text-white">
              真っさらなカレンダーと、認めてくれるAI。<br class="hidden md:block" />
              それだけで、明日は今日よりもっと良くなる。
            </p>
          </div>

          <div class="pt-8 space-y-6">
            <UButton
              size="xl"
              color="primary"
              class="px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              @click="isAuthModalOpen = true"
            >
              まずは無料で、自分を肯定してみる
            </UButton>
            <p class="text-sm text-slate-500 font-bold tracking-wide">カード登録不要。1分で始められます。</p>
          </div>
        </div>
      </section>

      <footer class="py-20 border-t border-slate-50 text-center">
        <div class="flex justify-center gap-8 mb-10 text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
          <NuxtLink to="/terms" class="hover:text-emerald-500 transition-colors">Terms</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-emerald-500 transition-colors">Privacy</NuxtLink>
        </div>
        <div class="flex items-center justify-center gap-2 mb-4">
          <p class="text-slate-900 font-black tracking-tighter text-xl uppercase">LVLUP Learn</p>
        </div>
        <p class="text-emerald-600 font-black italic text-sm tracking-widest mb-2 uppercase">やるだけ、偉い。</p>
        <p class="text-slate-300 text-[10px] font-bold uppercase tracking-widest">© 2026</p>
      </footer>
    </div>

    <LoginModal v-model:open="isAuthModalOpen" />
  </UApp>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
</style>
