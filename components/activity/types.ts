export interface ActivityItemProps {
  type: 'expense' | 'settlement' | 'group';
  title: string;
  amount: number;
  date: Date;
  category?: string;
  groupName?: string;
  participants: string[];
  onPress?: () => void;
}
