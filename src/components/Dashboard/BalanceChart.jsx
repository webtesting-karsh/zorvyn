import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/calculations';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-xl outline-none">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-medium bg-transparent">{label}</p>
        <p className="text-gray-900 dark:text-white font-bold text-lg m-0">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function BalanceChart({ data }) {
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
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Balance Trend</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Total running balance grouped per month</p>
      </div>
      
      <div className="flex-1 w-full relative -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4B5563', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#6366F1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
