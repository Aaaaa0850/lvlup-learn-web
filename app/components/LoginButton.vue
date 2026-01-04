<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  lastMethod: string | null;
}>();
const emit = defineEmits(['login']);
const handleLogin = (provider: 'google' | 'github' | 'discord') => {
  emit('login', provider);
};
</script>
<template>
  <div class="relative">
    <UButton
      block
      size="xl"
      :variant="lastMethod === 'google' ? 'solid' : 'subtle'"
      :color="lastMethod === 'google' ? 'primary' : 'neutral'"
      class="font-bold transition-all duration-300"
      aria-current-value="google"
      icon="i-logos-google-icon"
      label="Googleでログイン"
      :loading="isLoading"
      @click="handleLogin('google')"
    />
    <UBadge
      v-if="lastMethod === 'google'"
      class="absolute -top-2 -right-2 animate-bounce"
      color="primary"
      variant="solid"
      size="xs"
      >前回のログイン</UBadge
    >
  </div>

  <div class="relative">
    <UButton
      block
      size="xl"
      :variant="lastMethod === 'github' ? 'solid' : 'subtle'"
      :color="lastMethod === 'github' ? 'primary' : 'neutral'"
      class="font-bold transition-all duration-300"
      icon="i-logos-github-icon"
      aria-current-value="GitHub"
      label="GitHubでログイン"
      :loading="isLoading"
      @click="handleLogin('github')"
    />
    <UBadge
      v-if="lastMethod === 'github'"
      class="absolute -top-2 -right-2 animate-bounce"
      color="primary"
      variant="solid"
      size="xs"
      >前回のログイン</UBadge
    >
  </div>
  <div class="relative">
    <UButton
      block
      size="xl"
      :variant="lastMethod === 'discord' ? 'solid' : 'subtle'"
      :color="lastMethod === 'discord' ? 'primary' : 'neutral'"
      class="font-bold transition-all duration-300"
      icon="i-logos-discord-icon"
      label="Discordでログイン"
      aria-current-value="Discord"
      :loading="isLoading"
      @click="handleLogin('discord')"
    />
    <UBadge
      v-if="lastMethod === 'discord'"
      class="absolute -top-2 -right-2 animate-bounce"
      color="primary"
      variant="solid"
      size="xs"
      >前回のログイン</UBadge
    >
  </div>
</template>
