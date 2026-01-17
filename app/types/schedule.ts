export interface Schedule {
  id: string;
  title: string;
  subtitle: string | null;
  duration: number | null;
  color?: string | null;
  tags?: string[];
  status?: 'saving' | 'updating' | 'deleting' | 'success' | 'saveError' | 'updateError' | 'deleteError' | 'cancel';
}