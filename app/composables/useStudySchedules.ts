export interface Schedule {
  id: string;
  title: string;
  subtitle?: string;
  duration: number | null;
  tags?: string[];
  isQuickStart?: boolean; // クイック開始判別用
}

export const useStudySchedules = () => {
  const ACTIVE_SESSION_KEY = 'current-active-session';

  const {
    data: schedules,
    pending,
    error,
    refresh,
  } = useAsyncData<Schedule[]>(
    'today-schedules',
    () => $fetch('http://localhost:8787/api/study-schedules', {
      method: 'GET',
      credentials: 'include'
    }),
    {
      default: () => [],
      server: false,
      lazy: true
    }
  );

  // 学習開始アクション
  const startStudy = (task: Partial<Schedule>) => {
    // 1. セッション情報をLocalStorageに保存
    const sessionData = {
      ...task,
      startTime: new Date().toISOString(),
      isQuickStart: !task.id, // IDがなければクイック開始
    };

    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionData));

    // 2. タイマー画面へ遷移
    // IDがある場合はクエリに含め、ない場合は 'quick' とする
    const targetId = task.id || 'quick';
    navigateTo(`/study/${targetId}`);
  };

  const skipTask = async (task: Schedule) => {
    if (confirm(`「${task.title}」を今日の予定から外しますか？`)) {
      console.log('スキップしました:', task.id);
      // 必要に応じて削除APIを叩く
    }
  };

  return {
    schedules,
    pending,
    error,
    refresh,
    startStudy,
    skipTask,
  };
};