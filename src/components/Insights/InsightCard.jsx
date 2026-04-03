import { TrendingUp, Target, CalendarDays, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InsightCard({ title, text, description, type }) {
  // Mapping icons and colors based on insight type
  const styleMap = {
    category: { Icon: Target, bg: "bg-orange-500/10", textCol: "text-orange-500" },
    month: { Icon: CalendarDays, bg: "bg-blue-500/10", textCol: "text-blue-500" },
    ratio: { Icon: TrendingUp, bg: "bg-green-500/10", textCol: "text-green-500" },
    warning: { Icon: AlertTriangle, bg: "bg-red-500/10", textCol: "text-red-500" },
  };

  const { Icon, bg, textCol } = styleMap[type] || styleMap.category;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className={`p-3 rounded-xl ${bg} ${textCol}`}>
          <Icon size={24} />
        </div>
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
      </div>
      
      <div className="space-y-1">
        <p className={`text-2xl font-bold tracking-tight ${textCol}`}>
          {text}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
