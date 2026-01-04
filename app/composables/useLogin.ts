import { authClient } from '~/utils/auth-client';
export const useLogin = () => {
  const isLoading = ref(false);
  const toast = useToast();

  const login = async (provider: 'google' | 'github' | 'discord') => {
    isLoading.value = true;

    try {
      const { data, error } = await authClient.signIn.social({
        provider: provider,
        callbackURL: 'http://localhost:3000/dashboard',
      });
      if (error) {
        throw error;
      }
    } catch (error: any) {
      let message = '予期せぬエラーが発生しました。';
      let title = 'ログイン失敗';

      if (error.status === 401) {
        message = '認証に失敗しました。アカウント情報を確認してください。';
      } else if (error.code === "USER_CANCELLED") {
        title = 'キャンセル';
        message = 'ログインがキャンセルされました。';
      } else if (error.status === 500) {
        message = 'サーバー側で問題が発生しています。しばらくお待ちください。';
      } else if (!window.navigator.onLine) {
        message = 'ネットワークに接続されていません。通信環境を確認してください。';
      }

      toast.add({
        title: title,
        description: message,
        color: error.code === "USER_CANCELLED" ? 'warning' : 'error',
        icon: 'i-lucide-circle-alert',
      });

      isLoading.value = false;
    }
  };

  return {
    login,
    isLoading
  };
};