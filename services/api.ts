import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Group, Expense, Settlement } from '@/types';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://your-api-url.com/api', // TODO: Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; 
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      await AsyncStorage.removeItem('token');
      // TODO: Redirect to login
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    return response.data.user as User;
  },

  async register(email: string, password: string, name: string) {
    const response = await api.post('/auth/register', { email, password, name });
    await AsyncStorage.setItem('token', response.data.token);
    return response.data.user as User;
  },

  async logout() {
    await AsyncStorage.removeItem('token');
    await api.post('/auth/logout');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data as User;
  },
};

// Group Services
export const groupService = {
  async getGroups() {
    const response = await api.get('/groups');
    return response.data as Group[];
  },

  async createGroup(name: string, members: string[]) {
    const response = await api.post('/groups', { name, members });
    return response.data as Group;
  },

  async getGroup(groupId: string) {
    const response = await api.get(`/groups/${groupId}`);
    return response.data as Group;
  },

  async updateGroup(groupId: string, updates: Partial<Group>) {
    const response = await api.put(`/groups/${groupId}`, updates);
    return response.data as Group;
  },

  async deleteGroup(groupId: string) {
    await api.delete(`/groups/${groupId}`);
  },
};

// Expense Services
export const expenseService = {
  async getExpenses(groupId?: string) {
    const url = groupId ? `/expenses?groupId=${groupId}` : '/expenses';
    const response = await api.get(url);
    return response.data as Expense[];
  },

  async createExpense(expense: Omit<Expense, 'id'>) {
    const response = await api.post('/expenses', expense);
    return response.data as Expense;
  },

  async updateExpense(expenseId: string, updates: Partial<Expense>) {
    const response = await api.put(`/expenses/${expenseId}`, updates);
    return response.data as Expense;
  },

  async deleteExpense(expenseId: string) {
    await api.delete(`/expenses/${expenseId}`);
  },
};

// Settlement Services
export const settlementService = {
  async getSettlements() {
    const response = await api.get('/settlements');
    return response.data as Settlement[];
  },

  async createSettlement(settlement: Omit<Settlement, 'id' | 'status'>) {
    const response = await api.post('/settlements', settlement);
    return response.data as Settlement;
  },

  async updateSettlementStatus(settlementId: string, status: 'completed' | 'pending') {
    const response = await api.put(`/settlements/${settlementId}/status`, { status });
    return response.data as Settlement;
  },
};

// Balance calculation utilities
export const balanceService = {
  async getGroupBalance(groupId: string) {
    const response = await api.get(`/groups/${groupId}/balance`);
    return response.data.balance as number;
  },

  async getUserBalance() {
    const response = await api.get('/users/balance');
    return response.data.balance as number;
  },

  async getDetailedBalance() {
    const response = await api.get('/users/balance/detailed');
    return response.data as {
      totalBalance: number;
      youOwe: { user: User; amount: number }[];
      youAreOwed: { user: User; amount: number }[];
    };
  },
};
