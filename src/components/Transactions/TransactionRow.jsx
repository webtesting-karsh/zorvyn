import { Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatCurrency } from '../../utils/calculations';

export default function TransactionRow({ transaction, onEdit }) {
  const { role, deleteTransaction } = useStore();

  const isIncome = transaction.type === 'income';
  
  // Format Date (assuming ISO string input)
  const dateObj = new Date(transaction.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <tr className="border-b border-gray-200 dark:border-gray-800/50 hover:bg-white dark:bg-gray-800/30 transition-colors group">
      <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
        {formattedDate}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
            isIncome 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {transaction.type}
          </span>
          <span className="text-gray-900 dark:text-white font-medium">{transaction.category}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <span className={`font-bold ${isIncome ? 'text-green-400' : 'text-gray-900 dark:text-white'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
      </td>
      
      {/* Admin Actions */}
      {role === 'admin' && (
        <td className="py-4 px-4 text-right">
          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(transaction)}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-indigo-400 bg-gray-100 dark:bg-gray-900 hover:bg-white dark:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:border-gray-700"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => deleteTransaction(transaction.id)}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-400 bg-gray-100 dark:bg-gray-900 hover:bg-white dark:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:border-gray-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
