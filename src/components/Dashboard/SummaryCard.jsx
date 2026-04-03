import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

export default function SummaryCard({ title, amount, type }) {
  const isIncome = type === 'income';
  const isExpense = type === 'expense';
  
  // Dynamic color coding styling map
  const colorMap = {
    balance: { text: "text-gray-900 dark:text-white", iconBg: "bg-indigo-500/10 text-indigo-500", Icon: Wallet },
    income: { text: "text-green-400", iconBg: "bg-green-500/10 text-green-500", Icon: ArrowUpRight },
    expense: { text: "text-red-400", iconBg: "bg-red-500/10 text-red-500", Icon: ArrowDownRight },
  };

  const { text, iconBg, Icon } = colorMap[type] || colorMap.balance;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-gray-300 dark:border-gray-600 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h2>
        <div className={`p-2 rounded-lg transition-colors ${iconBg}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div>
        <p className={`text-3xl font-bold tracking-tight ${text}`}>
          {isExpense ? '-' : (isIncome ? '+' : '')}
          {formatCurrency(amount)}
        </p>
      </div>
    </motion.div>
  );
}
