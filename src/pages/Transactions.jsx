import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Filter, Search, Plus, Download } from 'lucide-react';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionForm from '../components/Transactions/TransactionForm';
import Modal from '../components/Shared/Modal';
import PageWrapper from '../components/Shared/PageWrapper';

export default function Transactions() {
  const { role, filters, setFilters, transactions } = useStore();
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenAdd = () => {
    if (role !== 'admin') return;
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    if (role !== 'admin') return;
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    if (transactions.length === 0) return;
    
    const headers = ['Date', 'Category', 'Amount', 'Type'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => `${t.date},${t.category},${t.amount},${t.type}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="space-y-6 animate-pulse">
           <div className="flex justify-between">
             <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
             <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
           </div>
           <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Transactions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and filter your entire transaction history.</p>
          <div className="mt-2 inline-block px-2 py-1 bg-red-500/10 text-red-500 rounded-md font-mono text-xs">
            Admin Check: {role}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>

          {role === 'admin' && (
            <button 
              onClick={handleOpenAdd}
              className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-500 rounded-xl text-sm font-medium text-gray-900 dark:text-white hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-500/20"
            >
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        
        {/* Filters Toolbar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-white/80 dark:bg-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search by category..." 
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <Search size={16} className="absolute left-4 top-2.5 text-gray-500" />
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative w-full sm:w-auto flex-1">
              <Filter size={14} className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 pointer-events-none" />
              <select 
                value={filters.type}
                onChange={(e) => setFilters({ type: e.target.value })}
                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expense Only</option>
              </select>
            </div>
            
            <div className="w-full sm:w-auto flex-1">
              <select 
                value={filters.sortBy}
                onChange={(e) => setFilters({ sortBy: e.target.value })}
                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
            </div>
          </div>

        </div>

        {/* Table Content */}
        <TransactionTable onEdit={handleOpenEdit} />
        
      </div>

      {/* Modal Integration using global Shared Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingTransaction ? "Edit Transaction" : "New Transaction"}
      >
        <TransactionForm 
          existingData={editingTransaction} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Modal>

    </div>
    </PageWrapper>
  );
}
