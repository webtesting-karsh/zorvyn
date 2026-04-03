import { useStore } from '../../store/useStore';
import TransactionRow from './TransactionRow';

export default function TransactionTable({ onEdit }) {
  const { transactions, filters, role } = useStore();

  // Apply Search, Type Filter, and Sort
  const processedTransactions = transactions
    .filter((t) => 
      filters.search === '' || t.category.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((t) => 
      filters.type === 'all' || t.type === filters.type
    )
    .sort((a, b) => {
      if (filters.sortBy === 'date') {
        return new Date(b.date) - new Date(a.date); // newest first
      } else {
        return b.amount - a.amount; // highest amount first
      }
    });

  if (processedTransactions.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">No transactions found</p>
        <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-100/50 dark:bg-gray-900/50">
            <th className="py-4 px-4 font-medium">Date</th>
            <th className="py-4 px-4 font-medium">Category</th>
            <th className="py-4 px-4 font-medium text-right">Amount</th>
            {role === 'admin' && (
              <th className="py-4 px-4 font-medium text-right w-24">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {processedTransactions.map((t) => (
            <TransactionRow 
              key={t.id} 
              transaction={t} 
              onEdit={onEdit} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
