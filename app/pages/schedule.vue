<script setup lang="ts">
import { nextTick } from 'vue';
import type { Schedule } from '~/types/schedule';
import { onMounted } from 'vue';

const { sortedSchedules, handleSave, handleDelete, handleRetry, handleUpdate, fetchSchedules } = useSchedules();
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const itemToDelete = ref<string | null>(null);
const editingItem = ref<Schedule | null>(null);

onMounted(() => {
  fetchSchedules();
});
const onSave = async (payload: {
  id?: string;
  title: string;
  subtitle: string;
  duration: number | null;
  tags: string[];
}) => {
  isModalOpen.value = false;

  if (payload.id) {
    await handleUpdate(payload as any);
  } else {
    handleSave({ ...payload, status: 'saving' } as any);
  }
};
const onRetry = async (data: Schedule) => {
  handleRetry({ ...data });
};

const onEdit = async (item: Schedule) => {
  editingItem.value = { ...item };
  await nextTick();
  isModalOpen.value = true;
};

watch(isModalOpen, (val) => {
  if (!val) {
    setTimeout(() => {
      editingItem.value = null;
    }, 500);
  }
});

const confirmDelete = (id: string) => {
  console.log('削除対象ID:', id);
  itemToDelete.value = id;
  isDeleteModalOpen.value = true;
  console.log(isDeleteModalOpen);
};

const executeDelete = async () => {
  if (itemToDelete.value) {
    try {
      await handleDelete(itemToDelete.value);
      isDeleteModalOpen.value = false;
      itemToDelete.value = null;
    } catch (error) {
      console.error('削除失敗:', error);
    }
  }
};
</script>

<template>
  <UApp>
    <div class="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden text-left">
      <header
        class="shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-20 border-b border-slate-200 dark:border-slate-800"
      >
        <UContainer class="py-4 md:py-6">
          <h1 class="text-2xl font-black text-slate-800 dark:text-white">Schedule</h1>
        </UContainer>
      </header>

      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        <UContainer>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <aside class="hidden md:block md:col-span-4 lg:col-span-3 sticky top-0">
              <UCard class="border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                <template #header><h3 class="font-bold text-emerald-600">新規作成</h3></template>

                <ScheduleForm :is-loading="false" @submit="(data) => handleSave({ ...data, status: 'saving' })" />
              </UCard>
            </aside>

            <div class="col-span-1 md:col-span-8 lg:col-span-9">
              <ScheduleList
                :items="sortedSchedules"
                @delete="confirmDelete"
                @open-modal="isModalOpen = true"
                @retry="onRetry"
                @update="onEdit"
              />
            </div>
          </div>
        </UContainer>
      </main>

      <UModal
        v-model:open="isModalOpen"
        :title="editingItem ? '予定を編集' : '予定を追加'"
        description="スケジュールの詳細を入力してください"
      >
        <template #body>
          <div class="p-4">
            <ScheduleForm v-if="isModalOpen" :is-loading="false" :initial-data="editingItem" @submit="onSave" />
          </div>
        </template>
      </UModal>
      <DeleteConfirmModal v-model:open="isDeleteModalOpen" @confirm="executeDelete" />
    </div>
  </UApp>
</template>
