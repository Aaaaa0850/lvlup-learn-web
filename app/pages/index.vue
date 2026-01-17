<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
});
const isAuthModalOpen = ref(false);

const features = [
  {
    title: '24時間限定の予定。',
    titleAccent: '縛られない、という自由。',
    description:
      '明日以降の予定は、あえて立てられません。遠い未来の不安や、過去の「できなかった計画」に追い詰められる日々はもう終わり。今の自分にできることだけに、100%集中しましょう。',
    icon: 'i-heroicons-calendar-days',
    iconBgColor: 'bg-emerald-50',
    iconTextColor: 'text-emerald-600',
    imageIcon: 'i-heroicons-clock',
    reverse: false,
  },
  {
    title: 'AIが、学習内容を<br />分析し、タグに変換。',
    titleAccent: '',
    description:
      'やりたいことを入力するだけでAIが内容を分析。自動で適切なカテゴリやタグを生成します。「なんて入力しよう？」と迷う時間はもう必要ありません。',
    icon: 'i-heroicons-sparkles',
    iconBgColor: 'bg-emerald-50',
    iconTextColor: 'text-emerald-600',
    imageIcon: 'i-heroicons-cpu-chip',
    reverse: true,
  },
  {
    title: 'シンプルな学習タイマー。',
    titleAccent: '余計な機能は、削ぎ落とす。',
    description:
      'ボタン一つで計測開始。集中を妨げるアラームも、複雑な設定もありません。ミニマルなデザインがあなたの作業を尊重し、静かに時間を記録します。',
    icon: 'i-heroicons-play-circle-20-solid',
    iconBgColor: 'bg-emerald-50',
    iconTextColor: 'text-emerald-600',
    imageIcon: 'i-heroicons-play-circle-20-solid',
    reverse: false,
  },
  {
    title: '「やった事実」を可視化。',
    titleAccent: '積み上げた自信は、消えない。',
    description:
      '予定は毎日リセットされますが、あなたの「頑張り」はデータとして蓄積されます。積み上がっていく実績がグラフやヒートマップを彩り、やがて揺るぎない自信へと変わります。',
    icon: 'i-heroicons-chart-bar',
    iconBgColor: 'bg-emerald-50',
    iconTextColor: 'text-emerald-600',
    imageIcon: 'i-heroicons-chart-pie',
    reverse: true,
  },
];
</script>

<template>
  <UApp>
    <div class="bg-white text-slate-800 min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <LandingNav v-model:isAuthModalOpen="isAuthModalOpen" />
      <HeroSection v-model:isAuthModalOpen="isAuthModalOpen" />

      <section class="py-24 space-y-40 max-w-6xl mx-auto px-6">
        <FeatureCard v-for="(feature, index) in features" :key="index" v-bind="feature" />
      </section>

      <CTASection v-model:isAuthModalOpen="isAuthModalOpen" />
      <LandingFooter />
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
