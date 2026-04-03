import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function Card({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "bg-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800/50 hover:shadow-md hover:border-gray-200 dark:border-gray-700/50 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
