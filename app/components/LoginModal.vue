<script setup lang="ts">
import { authClient } from '~/utils/auth-client';

const open = defineModel<boolean>('open', { default: false });

const lastMethod = authClient.getLastUsedLoginMethod();
const { login, isLoading } = useLogin();

const handleLogin = async (provider: 'google' | 'github' | 'discord') => {
  await login(provider);
};

const close = () => {
  open.value = false;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open">
        <div class="fixed inset-0 z-10 bg-slate-900/40 backdrop-blur-sm" @click="close"></div>

        <div class="fixed inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
          <div
            class="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-pop pointer-events-auto"
          >
            <div class="p-8 md:p-12">
              <div class="text-center mb-10">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl mb-6 shadow-inner"
                >
                  <UIcon name="i-lucide-rocket" class="w-8 h-8" />
                </div>
                <h2 class="text-3xl font-black tracking-tighter text-slate-900 mb-3">Welcome Back</h2>
                <p class="text-sm text-slate-500 font-medium leading-relaxed">
                  続行する方法を選択してください。<br />
                  あなたの努力を、また今日から積み上げましょう。
                </p>
              </div>

              <div class="space-y-4">
                <LoginButton :lastMethod="lastMethod" :isLoading="isLoading" @login="handleLogin" />
              </div>

              <div class="mt-10 pt-8 border-t border-slate-50 text-center text-[11px] text-slate-400">
                ログインすることで、当サービスの
                <NuxtLink to="/terms" class="text-emerald-500 hover:underline font-bold">利用規約</NuxtLink>
                および
                <NuxtLink to="/privacy" class="text-emerald-500 hover:underline font-bold"
                  >プライバシーポリシー</NuxtLink
                >
                に同意したものとみなされます。
              </div>
            </div>

            <button @click="close" class="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <UIcon name="i-heroicons-x-mark-20-solid" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-pop {
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes pop {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
