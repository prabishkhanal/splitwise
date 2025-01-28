import React, { createContext, useContext, useState, useCallback } from 'react';
import { Group, Expense, ExpenseShare, User, Settlement } from '@/types';

interface AppContextType {
  // Groups
  groups: Group[];
  createGroup: (name: string, members: User[]) => Promise<void>;
  updateGroup: (groupId: string, name: string, members: User[]) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
  
  // Expenses
  expenses: Expense[];
  createExpense: (
    groupId: string,
    title: string,
    amount: number,
    paidBy: User,
    shares: ExpenseShare[],
    category: string,
    notes?: string
  ) => Promise<void>;
  updateExpense: (
    expenseId: string,
    updates: Partial<Omit<Expense, 'id'>>
  ) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
  
  // Settlements
  settlements: Settlement[];
  createSettlement: (
    fromUser: User,
    toUser: User,
    amount: number,
    groupId?: string
  ) => Promise<void>;
  updateSettlement: (
    settlementId: string,
    status: 'completed' | 'pending'
  ) => Promise<void>;
  
  // Balances
  getGroupBalance: (groupId: string) => number;
  getUserBalance: (userId: string) => number;
  getTotalBalance: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  // Group operations
  const createGroup = useCallback(async (name: string, members: User[]) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      members,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setGroups(prev => [...prev, newGroup]);
  }, []);

  const updateGroup = useCallback(async (groupId: string, name: string, members: User[]) => {
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, name, members, updatedAt: new Date() }
          : group
      )
    );
  }, []);

  const deleteGroup = useCallback(async (groupId: string) => {
    setGroups(prev => prev.filter(group => group.id !== groupId));
    // Also delete related expenses and settlements
    setExpenses(prev => prev.filter(expense => expense.groupId !== groupId));
    setSettlements(prev => prev.filter(settlement => settlement.groupId !== groupId));
  }, []);

  // Expense operations
  const createExpense = useCallback(async (
    groupId: string,
    title: string,
    amount: number,
    paidBy: User,
    shares: ExpenseShare[],
    category: string,
    notes?: string
  ) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount,
      paidBy,
      groupId,
      category: category as any,
      split: 'equal',
      shares,
      date: new Date(),
      notes,
    };
    setExpenses(prev => [...prev, newExpense]);
  }, []);

  const updateExpense = useCallback(async (
    expenseId: string,
    updates: Partial<Omit<Expense, 'id'>>
  ) => {
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === expenseId
          ? { ...expense, ...updates }
          : expense
      )
    );
  }, []);

  const deleteExpense = useCallback(async (expenseId: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
  }, []);

  // Settlement operations
  const createSettlement = useCallback(async (
    fromUser: User,
    toUser: User,
    amount: number,
    groupId?: string
  ) => {
    const newSettlement: Settlement = {
      id: Date.now().toString(),
      fromUser,
      toUser,
      amount,
      date: new Date(),
      status: 'pending',
      groupId,
    };
    setSettlements(prev => [...prev, newSettlement]);
  }, []);

  const updateSettlement = useCallback(async (
    settlementId: string,
    status: 'completed' | 'pending'
  ) => {
    setSettlements(prev =>
      prev.map(settlement =>
        settlement.id === settlementId
          ? { ...settlement, status }
          : settlement
      )
    );
  }, []);

  // Balance calculations
  const getGroupBalance = useCallback((groupId: string) => {
    const groupExpenses = expenses.filter(expense => expense.groupId === groupId);
    // TODO: Implement actual balance calculation
    return 0;
  }, [expenses]);

  const getUserBalance = useCallback((userId: string) => {
    // TODO: Implement actual balance calculation
    return 0;
  }, [expenses, settlements]);

  const getTotalBalance = useCallback(() => {
    // TODO: Implement actual balance calculation
    return 0;
  }, [expenses, settlements]);

  return (
    <AppContext.Provider
      value={{
        groups,
        createGroup,
        updateGroup,
        deleteGroup,
        expenses,
        createExpense,
        updateExpense,
        deleteExpense,
        settlements,
        createSettlement,
        updateSettlement,
        getGroupBalance,
        getUserBalance,
        getTotalBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
