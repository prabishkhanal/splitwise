export interface DashboardStats {
  totalBalance: number;
  youOwe: number;
  youAreOwed: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

export interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
}
