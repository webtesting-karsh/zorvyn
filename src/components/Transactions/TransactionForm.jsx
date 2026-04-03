import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

// Common categories array to reuse
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Other Income'];
const EXPENSE_CATEGORIES = ['Food', 'Rent', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Other Expense'];

export default function TransactionForm({ existingData, onClose }) {
  const { addTransaction, editTransaction } = useStore();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substring(0, 10), // Default to today 'YYYY-MM-DD'
    amount: '',
    category: EXPENSE_CATEGORIES[0],
    type: 'expense'
  });

  // Pre-fill form if editing existing transaction
  useEffect(() => {
    if (existingData) {
      setFormData({
        ...existingData,
        date: new Date(existingData.date).toISOString().substring(0, 10),
        amount: existingData.amount.toString() // String for html input handling
      });
    }
  }, [existingData]);

  // Adjust category dropdown when switching types
  useEffect(() => {
    if (!existingData) {
      setFormData(prev => ({
        ...prev,
        category: prev.type === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]
      }));
    }
  }, [formData.type, existingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || isNaN(formData.amount)) return;

    // Build finalized payload
    const payload = {
      id: existingData ? existingData.id : crypto.randomUUID(),
      date: new Date(formData.date).toISOString(), // Convert back to full ISO string
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type
    };

    if (existingData) {
      editTransaction(payload.id, payload);
    } else {
      addTransaction(payload);
    }
    
    onClose();
  };

  const currentCategories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Type Toggle */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'expense' })}
            className={`py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
              formData.type === 'expense' 
                ? 'bg-red-500/10 border-red-500 text-red-500' 
                : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:border-gray-600'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'income' })}
            className={`py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
              formData.type === 'income' 
                ? 'bg-green-500/10 border-green-500 text-green-500' 
                : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:border-gray-600'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Amount & Date Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount ($)</label>
          <input 
            type="number"
            step="0.01"
            required
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="0.00"
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</label>
          <input 
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors block"
            style={{ colorScheme: 'dark' }}
          />
        </div>
      </div>

      {/* Category Menu */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
        >
          {currentCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-gray-900 dark:text-white font-medium transition-colors border border-transparent shadow-md shadow-indigo-500/20"
        >
          {existingData ? 'Save Changes' : 'Add Transaction'}
        </button>
      </div>
    </form>
  );
}
