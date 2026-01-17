<script setup lang="ts">
interface Props {
  title: string;
  titleAccent?: string;
  description: string;
  icon: string;
  iconBgColor?: string;
  iconTextColor?: string;
  imageIcon?: string;
  reverse?: boolean;
}

withDefaults(defineProps<Props>(), {
  iconBgColor: 'bg-emerald-50',
  iconTextColor: 'text-emerald-600',
  imageIcon: 'i-heroicons-clock',
  reverse: false,
});
</script>

<template>
  <div class="flex flex-col md:flex-row items-center gap-16 md:gap-24" :class="{ 'md:flex-row-reverse': reverse }">
    <div class="flex-1 space-y-6">
      <div
        class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
        :class="[iconBgColor, iconTextColor]"
      >
        <UIcon :name="icon" class="w-6 h-6" />
      </div>
      <h2 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-snug">
        <span v-html="title"></span>
        <template v-if="titleAccent">
          <br />
          <span class="text-slate-400" v-html="titleAccent"></span>
        </template>
      </h2>
      <p class="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
        {{ description }}
      </p>
    </div>
    <div
      class="flex-1 w-full aspect-video bg-slate-50 rounded-4xl border-4 border-white shadow-xl flex items-center justify-center relative group overflow-hidden"
    >
      <UIcon
        :name="imageIcon"
        class="w-20 h-20 text-emerald-100 group-hover:scale-110 transition-transform duration-700"
      />
      <div class="absolute inset-0 bg-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  </div>
</template>

