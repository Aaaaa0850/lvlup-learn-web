export interface Activity {
  id: number | string;
  title: string;
  subtitle: string;
  duration: number;
  completedAt: string;
  tags: string[];
  startDateTime?: string;
  endDateTime?: string;
}

// シングルトン状態を保持
const viewDate = ref(new Date());
const selectedDate = ref(new Date());

export const useStats = () => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
  };

  const generateColorFromText = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${Math.abs(hash) % 360}, 65%, 60%)`;
  };

  const {
    data: summaryData,
    pending,
    error,
  } = useAsyncData(
    'achievements-summary',
    () => $fetch('http://localhost:8787/api/stats/summary', { credentials: 'include' }),
    { server: false }
  );

  const { data: dailyLogs } = useAsyncData(
    'achievements-daily',
    () => $fetch(`http://localhost:8787/api/stats/${formatDate(selectedDate.value)}`, { credentials: 'include' }),
    { server: false, watch: [selectedDate] }
  );

  const getDayTotal = (dateStr: string) => {
    if (!summaryData.value || !Array.isArray(summaryData.value)) return 0;
    return (summaryData.value as any[])
      .filter((log) => log.date === dateStr)
      .reduce((sum, log) => sum + (log.studyMinutes || 0), 0);
  };

  const selectedActivities = computed<Activity[]>(() => {
    if (!dailyLogs.value || !Array.isArray(dailyLogs.value)) return [];

    return (dailyLogs.value as any[]).map((log) => ({
      id: log.id,
      title: log.studyLogsTitle || log.title || '無題の学習',
      subtitle: log.studyLogsSubtitle || log.subtitle || '',
      duration: log.studyMinutes || 0,
      completedAt: formatDate(selectedDate.value),
      tags: log.tags || [],
      startDateTime: log.startDateTime,
      endDateTime: log.endDateTime,
    }));
  });

  const selectedDayTotal = computed(() => {
    return selectedActivities.value.reduce((sum, a) => sum + a.duration, 0);
  });

  const calendarDays = computed(() => {
    const year = viewDate.value.getFullYear();
    const month = viewDate.value.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = Array(firstDay).fill(null);
    for (let i = 1; i <= lastDate; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const total = getDayTotal(dateStr);
      let bgColor = '';
      // 色のしきい値
      if (total >= 180) bgColor = 'bg-emerald-700 text-white';
      else if (total >= 120) bgColor = 'bg-emerald-500 text-white';
      else if (total >= 60) bgColor = 'bg-emerald-300 text-emerald-900';
      else if (total > 0) bgColor = 'bg-emerald-100 text-emerald-800';

      days.push({ day: i, dateStr, total, bgColor });
    }
    return days;
  });

  const activeDates = computed(() => {
    if (!summaryData.value || !Array.isArray(summaryData.value)) return [];
    const dates = (summaryData.value as any[]).map((a) => a.date);
    return [...new Set(dates)].sort();
  });

  const currentIndex = computed(() => activeDates.value.indexOf(formatDate(selectedDate.value)));

  const hasPreviousDay = computed(() => {
    const prevDate = new Date(selectedDate.value);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateStr = formatDate(prevDate);
    return activeDates.value.includes(prevDateStr);
  });

  const hasNextDay = computed(() => {
    const nextDate = new Date(selectedDate.value);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateStr = formatDate(nextDate);
    return activeDates.value.includes(nextDateStr);
  });

  const navigateToPreviousDay = () => {
    if (!hasPreviousDay.value) return;
    const prevDate = new Date(selectedDate.value);
    prevDate.setDate(prevDate.getDate() - 1);
    selectedDate.value = prevDate;
  };

  const navigateToNextDay = () => {
    if (!hasNextDay.value) return;
    const nextDate = new Date(selectedDate.value);
    nextDate.setDate(nextDate.getDate() + 1);
    selectedDate.value = nextDate;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const nextIdx = direction === 'prev' ? currentIndex.value - 1 : currentIndex.value + 1;
    if (activeDates.value[nextIdx]) selectedDate.value = new Date(activeDates.value[nextIdx]);
  };

  const changeMonth = (diff: number) => {
    viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + diff, 1);
  };

  const chartData = computed(() => {
    const stats: Record<string, number> = {};
    selectedActivities.value.forEach((a) => (stats[a.title] = (stats[a.title] || 0) + a.duration));
    const labels = Object.keys(stats);
    return {
      labels,
      datasets: [
        {
          data: Object.values(stats),
          backgroundColor: labels.map((l) => generateColorFromText(l)),
          hoverOffset: 12,
          borderWidth: 0,
        },
      ],
    };
  });

  return {
    formatDate,
    viewDate,
    selectedDate,
    summaryData,
    pending,
    error,
    dailyLogs,
    selectedActivities,
    selectedDayTotal,
    calendarDays,
    activeDates,
    currentIndex,
    hasPreviousDay,
    hasNextDay,
    navigateToPreviousDay,
    navigateToNextDay,
    navigateDate,
    changeMonth,
    chartData,
  };
};

