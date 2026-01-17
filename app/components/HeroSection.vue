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
  <section class="relative pt-24 pb-32 px-6 overflow-hidden text-center">
    <div class="absolute inset-0 -z-10">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_15%,rgba(52,211,153,0.06),transparent_50%)]"
      ></div>
      <div class="absolute top-20 left-[10%] w-72 h-72 bg-emerald-50/30 rounded-full blur-[100px]"></div>
    </div>

    <div class="max-w-5xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 text-xs font-bold mb-10 tracking-widest uppercase"
      >
        Planned for people who can't plan
      </div>

      <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-10 text-slate-900 leading-[1.05]">
        予定は、<span class="text-emerald-400">明日まで</span>でいい。<br />
        やった事実は、<span class="text-emerald-400">一生消えない</span>。
      </h1>

      <p class="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
        計画倒れで自分を責める日々は、もう終わり。あなたの「少しでもやろうとした」事実を、優しく記録します。
      </p>

      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <UButton
          size="xl"
          color="primary"
          class="px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-emerald-100 transition-all hover:scale-105 active:scale-95 bg-emerald-400 hover:bg-emerald-500 text-white"
          @click="openModal"
        >
          無料で今すぐ始める
        </UButton>
      </div>
    </div>
  </section>
</template>

