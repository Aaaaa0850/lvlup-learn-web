import type { Schedule } from '~/types/schedule';
interface FormData {
  title: string;
  subtitle: string | null;
  duration: number | null;
  tags?: string[];
  status?: 'saving' | 'success' | 'error';
}
interface FetchData {
  title: string;
  subtitle: string | null;
  duration: number | null;
  tags?: string[];
  color: 'emerald'
  status?: 'saving' | 'success' | 'error';
}
export const useSchedules = () => {
  const API_URL = 'http://localhost:8787';
  const schedules = ref<Schedule[]>([]);

  const sortedSchedules = computed(() => {
    return [...schedules.value].sort((a, b) => (a.duration || 0) - (b.duration || 0));
  });

  const fetchSchedules = async () => {
    try {
      const data = await $fetch<Schedule[]>(`${API_URL}/api/schedules`, {
        method: 'GET',
        credentials: 'include'
      });
      console.log(`取得したスケジュール：${data}`)
      schedules.value = data;
    } catch (err) {
      console.error('スケジュールの取得に失敗しました。');
    }
  }

  const handleUpdate = async (data: Schedule) => {
    const index = schedules.value.findIndex(item => item.id === data.id);
    if (index === -1) return;

    // 既存のデータを更新
    schedules.value[index] = {
      ...schedules.value[index],
      ...data,
      status: 'saving'
    };
    const body = {
      ...data,
      color: data.color || 'emerald'
    };

    try {
      const res = await $fetch<Schedule>(`${API_URL}/api/schedules`, {
        method: 'PUT',
        body: body,
        credentials: 'include'
      })
      schedules.value[index] = {
        ...res,
        status: 'success'
      };
      setTimeout(() => {
        if (schedules.value[index]) {
          schedules.value[index].status = undefined;
        }
      }, 1500);
    } catch (e) {
      schedules.value[index]!.status = 'error';
    }
  };

  const handleRetry = async (data: Schedule) => {
    const index = schedules.value.findIndex(item => item.id === data.id);
    if (index === -1 || !schedules.value[index]) return;

    schedules.value[index].status = 'saving';
    const fetchSchedule = reactive<FetchData>({
      ...data,
      color: 'emerald',
    });
    try {
      const res = await $fetch<Schedule>(`${API_URL}/api/schedules`, {
        method: 'POST',
        body: fetchSchedule,
        credentials: 'include'
      })
      schedules.value[index] = {
        ...res,
        status: 'success'
      };
      setTimeout(() => {
        if (schedules.value[index]) {
          const target = schedules.value.find(s => s.id === res.id);
          if (target) target.status = undefined;
        }
      }, 1500);
    } catch (e) {
      schedules.value[index]!.status = 'error';
    }
  };

  const handleSave = async (formData: FormData) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticData = reactive<Schedule>({
      ...formData,
      id: tempId,
      color: 'emerald',
      status: 'saving',
    });
    const fetchSchedule = reactive<FetchData>({
      ...formData,
      color: 'emerald',
    });
    schedules.value.unshift(optimisticData);

    try {
      const res = await $fetch<Schedule>(`${API_URL}/api/schedules`, {
        method: 'POST',
        body: fetchSchedule,
        credentials: 'include'
      })
      Object.assign(optimisticData, { ...res, status: 'success' });
      setTimeout(() => { optimisticData.status = undefined; }, 1500);
    } catch (e) {
      optimisticData.status = 'error';
    }
  };

  const handleDelete = async (id: string) => {
    const target = schedules.value.find(s => s.id === id);

    if (target?.status === 'error') {
      schedules.value = schedules.value.filter(s => s.id !== id);
      return true;
    }

    schedules.value = schedules.value.filter(s => s.id !== id);
    return true;
  };

  return { sortedSchedules, handleSave, handleDelete, handleRetry, handleUpdate, fetchSchedules };
};