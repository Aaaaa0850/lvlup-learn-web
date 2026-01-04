export interface Schedule {
  id: string;
  title: string;
  subtitle: string | null;
  duration: number | null;
  color?: string | null;
  tags?: string[];
  status?: 'saving' | 'success' | 'error';
}