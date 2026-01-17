import type { Schedule } from '~/types/schedule';

export const useSchedules = () => {
  const API_URL = 'http://localhost:8787';
  const schedules = ref<Schedule[]>([]);

  const { pending, error, refresh, data } = useAsyncData<Schedule[]>(
    'schedules-data',
    () => $fetch(`${API_URL}/api/schedules`, { credentials: 'include' }),
    { server: false }
  );

  watch(data, (newData) => {
    if (newData) schedules.value = newData;
  }, { immediate: true });

  const sortedSchedules = computed(() => {
    return [...schedules.value].sort((a, b) => (a.duration || 0) - (b.duration || 0));
  });

  const finalizeSuccess = (item: Schedule, delay = 1500) => {
    item.status = 'success';
    setTimeout(() => {
      if (schedules.value.some(s => s.id === item.id)) {
        item.status = undefined;
      }
    }, delay);
  };

  const handleSave = async (payload: Partial<Schedule>) => {
    const tempId = `temp-${Date.now()}`;
    const newItem = reactive({
      ...payload,
      id: tempId,
      color: 'emerald',
      status: 'saving',
    }) as Schedule;

    schedules.value.unshift(newItem);

    try {
      const res = await $fetch<Schedule>(`${API_URL}/api/schedules`, {
        method: 'POST',
        body: { ...payload, color: 'emerald' },
        credentials: 'include'
      });

      Object.assign(newItem, res);
      finalizeSuccess(newItem);
    } catch (e) {
      newItem.status = 'saveError';
    }
  };

  const handleUpdate = async (item: Schedule) => {
    const target = schedules.value.find(s => s.id === item.id);
    if (!target) return;

    target.status = 'updating';

    try {
      const { status, ...body } = item;

      const res = await $fetch<Schedule>(`${API_URL}/api/schedules`, {
        method: 'PUT',
        body: {
          ...body,
          color: target.color || 'emerald'
        },
        credentials: 'include'
      });

      Object.assign(target, res);
      finalizeSuccess(target);
    } catch (e) {
      console.error('Update failed:', e);
      target.status = 'updateError';
    }
  };

  const handleDelete = async (id: string) => {
    const target = schedules.value.find(s => s.id === id);
    if (!target) return;
    if (target.status === 'saveError') {
      schedules.value = schedules.value.filter(s => s.id !== id);
      return;
    }
    target.status = 'deleting';
    try {
      await $fetch(`${API_URL}/api/schedules/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      target.status = 'success';
      setTimeout(() => {
        schedules.value = schedules.value.filter(s => s.id !== id);
      }, 1000);
    } catch (e) {
      target.status = 'deleteError';
    }
  };

  const handleRetry = async (item: Schedule) => {
    if (item.status === 'saveError') {
      const backup = { ...item };
      schedules.value = schedules.value.filter(s => s.id !== item.id);
      await handleSave(backup);
    } else if (item.status === 'updateError') {
      await handleUpdate(item);
    } else if (item.status === 'deleteError') {
      await handleDelete(item.id);
    }
  };

  const handleCancel = (id: string) => {
    const index = schedules.value.findIndex(s => s.id === id);
    if (index === -1) return;

    const target = schedules.value[index];
    if (!target) return false;

    target.status = 'cancel';

    setTimeout(() => {
      target.status = undefined;
    }, 1000);
  };

  return {
    sortedSchedules,
    handleSave,
    handleDelete,
    handleRetry,
    handleUpdate,
    handleCancel,
    fetchSchedules: refresh,
    pending,
    error,
  };
};