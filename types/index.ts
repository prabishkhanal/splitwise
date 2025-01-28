export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: User;
  groupId: string;
  category: ExpenseCategory;
  split: SplitType;
  shares: ExpenseShare[];
  date: Date;
  notes?: string;
  receipt?: string;
}

export interface ExpenseShare {
  userId: string;
  amount: number;
  paid: boolean;
}

export type ExpenseCategory =
  | 'general'
  | 'food'
  | 'transportation'
  | 'shopping'
  | 'entertainment'
  | 'utilities'
  | 'rent'
  | 'others';

export type SplitType = 'equal' | 'exact' | 'percentage';

export interface Balance {
  userId: string;
  amount: number;
}

export interface GroupBalance {
  groupId: string;
  balances: Balance[];
}

export interface Settlement {
  id: string;
  fromUser: User;
  toUser: User;
  amount: number;
  date: Date;
  status: 'pending' | 'completed';
  groupId?: string;
}
