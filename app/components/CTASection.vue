<script setup lang="ts">
const props = defineProps<{
  isAuthModalOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:isAuthModalOpen', value: boolean): void;
}>();

const openModal = () => {
  emit('update:isAuthModalOpen', true);
};
</script>

<template>
  <section class="py-28 bg-slate-900 text-white rounded-[3rem] mx-6 mb-32 overflow-hidden relative shadow-2xl">
    <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 blur-[100px]"></div>
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
          LVLUP Learnはあなたの<strong class="text-white">「少しでもやろうとした」</strong>事実を尊重します。
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
          class="px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-emerald-400/20 transition-all hover:scale-105 active:scale-95 bg-emerald-400 hover:bg-emerald-500 text-white"
          @click="openModal"
        >
          まずは無料で、自分を肯定してみる
        </UButton>
        <p class="text-sm text-slate-500 font-bold tracking-wide">カード登録不要。1分で始められます。</p>
      </div>
    </div>
  </section>
</template>

