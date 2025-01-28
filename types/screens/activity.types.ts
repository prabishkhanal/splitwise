export type FilterType = 'all' | 'expenses' | 'settlements' | 'groups';

export interface ActivityItem {
  id: string;
  type: 'expense' | 'settlement' | 'group';
  title: string;
  amount: number;
  date: Date;
  category?: string;
  groupName?: string;
  participants: string[];
}

export interface Filter {
  type: FilterType;
  label: string;
  icon: string;
}
