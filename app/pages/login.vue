<script setup lang="ts">
import { authClient } from '~/utils/auth-client';
const lastMethod = authClient.getLastUsedLoginMethod();
const { login, isLoading } = useLogin();

const handleLogin = async (provider: 'google' | 'github' | 'discord') => {
  await login(provider);
};
</script>

<template>
  <UApp>
    <div
      class="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-black p-4"
    >
      <UCard
        class="w-full max-w-sm bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl"
        :ui="{
          body: 'p-8',
          header: 'border-b border-white/10',
          footer: 'border-t border-white/10',
        }"
      >
        <template #header>
          <div class="flex flex-col items-center gap-2 py-2">
            <div class="bg-primary-500/20 p-3 rounded-2xl mb-2">
              <UIcon name="i-lucide-rocket" class="w-8 h-8 text-primary-400" />
            </div>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h1>
            <p class="text-sm text-slate-400">続行する方法を選択してください</p>
          </div>
        </template>

        <div class="space-y-4 py-4">
          <LoginButton :lastMethod="lastMethod" :isLoading="isLoading" @login="handleLogin" />
        </div>
        <template #footer>
          <div class="text-center py-2">
            <p class="text-[11px] text-slate-500 leading-relaxed">
              ログインすることで、当サービスの
              <NuxtLink to="/terms" class="text-primary-400 hover:underline">利用規約</NuxtLink>
              および
              <NuxtLink to="/privacy" class="text-primary-400 hover:underline">プライバシーポリシー</NuxtLink>
              に同意したものとみなされます。
            </p>
          </div>
        </template>
      </UCard>
    </div>
  </UApp>
</template>
