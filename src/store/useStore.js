import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

export const useStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'viewer', // default role
      theme: 'dark', // 'light' or 'dark'
      filters: {
        search: '',
        type: 'all', // 'all' | 'income' | 'expense'
        sortBy: 'date', // 'date' | 'amount'
      },

      // Actions
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      
      addTransaction: (tx) =>
        set((state) => {
          if (state.role !== 'admin') return state;
          return { transactions: [tx, ...state.transactions] };
        }),

      editTransaction: (id, updated) =>
        set((state) => {
          if (state.role !== 'admin') return state;
          return {
            transactions: state.transactions.map(t =>
              t.id === id ? { ...t, ...updated } : t
            )
          };
        }),

      deleteTransaction: (id) =>
        set((state) => {
          if (state.role !== 'admin') return state;
          return {
            transactions: state.transactions.filter((t) => t.id !== id)
          };
        }),

      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
      })),

      setRole: (role) => set({ role }),

    }),
    {
      name: 'finance-dashboard', // Key for localStorage
    }
  )
);
