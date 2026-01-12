export const useStudyTimer = () => {
  const ACTIVE_SESSION_KEY = 'current-active-session';

  const taskTitle = ref('読み込み中...');
  const taskSubtitle = ref('');
  const plannedDuration = ref(0);
  const elapsedSeconds = ref(0);
  const isPaused = ref(false);
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  const calculateElapsed = (session: any) => {
    const startTime = new Date(session.startTime).getTime();
    const now = new Date().getTime();
    const totalPausedMs = session.totalPausedMs || 0;
    let currentElapsedMs = now - startTime - totalPausedMs;

    if (session.isPaused && session.lastPausedAt) {
      const pausedSince = now - new Date(session.lastPausedAt).getTime();
      currentElapsedMs -= pausedSince;
    }
    elapsedSeconds.value = Math.floor(Math.max(0, currentElapsedMs) / 1000);
  };

  const startTimer = () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      elapsedSeconds.value++;
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  const togglePause = () => {
    const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!saved) return;
    const session = JSON.parse(saved);
    const now = new Date();

    if (!isPaused.value) {
      isPaused.value = true;
      stopTimer();
      session.isPaused = true;
      session.lastPausedAt = now.toISOString();
    } else {
      isPaused.value = false;
      const pausedMs = now.getTime() - new Date(session.lastPausedAt).getTime();
      session.totalPausedMs = (session.totalPausedMs || 0) + pausedMs;
      session.isPaused = false;
      session.lastPausedAt = null;
      startTimer();
    }
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  };

  const initTimer = () => {
    const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!saved) return navigateTo('/study-start');

    try {
      const session = JSON.parse(saved);
      taskTitle.value = session.title;
      taskSubtitle.value = session.subtitle;
      plannedDuration.value = session.duration || 0;
      isPaused.value = session.isPaused || false;

      calculateElapsed(session);
      if (!isPaused.value) startTimer();
    } catch (e) {
      navigateTo('/study-start');
    }
  };

  const displayTime = computed(() => {
    const h = Math.floor(elapsedSeconds.value / 3600);
    const m = Math.floor((elapsedSeconds.value % 3600) / 60);
    const s = elapsedSeconds.value % 60;
    return `${h > 0 ? h + ':' : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  });

  return {
    taskTitle,
    taskSubtitle,
    plannedDuration,
    elapsedSeconds,
    isPaused,
    displayTime,
    initTimer,
    togglePause,
    stopTimer,
    ACTIVE_SESSION_KEY
  };
};