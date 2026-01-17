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

  const startStudy = (task: Partial<Schedule>) => {
    const sessionData = {
      ...task,
      tags: task.tags || [],
      startTime: new Date().toISOString(),
      isQuickStart: !task.id,
      isPaused: false,
      totalPausedMs: 0,
    };

    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionData));

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