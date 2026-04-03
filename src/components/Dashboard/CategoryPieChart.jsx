import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#14B8A6'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium m-0">{payload[0].name}</p>
          <p className="text-gray-900 dark:text-white font-bold m-0">{formatCurrency(payload[0].value)}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No financial data available.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-[400px] flex flex-col hover:border-gray-300 dark:border-gray-600 transition-colors"
    >
      <div className="mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Expense Breakdown</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total spending by category</p>
      </div>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-gray-700 dark:text-gray-300 text-sm ml-1.5">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
