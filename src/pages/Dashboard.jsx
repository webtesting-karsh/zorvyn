import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { 
  calculateTotalIncome, 
  calculateTotalExpense, 
  calculateBalance, 
  getChartMonthlyBalance, 
  getChartExpenseByCategory 
} from '../utils/calculations';

import SummaryCard from '../components/Dashboard/SummaryCard';
import BalanceChart from '../components/Dashboard/BalanceChart';
import CategoryPieChart from '../components/Dashboard/CategoryPieChart';
import PageWrapper from '../components/Shared/PageWrapper';

export default function Dashboard() {
  const { transactions } = useStore();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    lineData: [],
    pieData: []
  });

  // Calculate values using side-effects only when transactions change 
  // (optimization against unnecessary re-renders)
  useEffect(() => {
    setDashboardData({
      income: calculateTotalIncome(transactions),
      expense: calculateTotalExpense(transactions),
      balance: calculateBalance(transactions),
      lineData: getChartMonthlyBalance(transactions),
      pieData: getChartExpenseByCategory(transactions)
    });
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [transactions]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="space-y-6 animate-pulse">
           <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
           </div>
        </div>
      </PageWrapper>
    );
  }

  // Handle empty state gracefully
  const hasData = dashboardData.income > 0 || dashboardData.expense > 0;

  return (
    <PageWrapper>
      <div className="space-y-6">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Explore your live financial activity.</p>
        </div>
        
        {hasData ? (
          <>
            {/* Top Section: Summary Cards Array */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard 
                title="Total Balance" 
                amount={dashboardData.balance} 
                type="balance" 
              />
              <SummaryCard 
                title="Total Income" 
                amount={dashboardData.income} 
                type="income" 
              />
              <SummaryCard 
                title="Total Expenses" 
                amount={dashboardData.expense} 
                type="expense" 
              />
            </div>

            {/* Bottom Section: Charts Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              <div className="lg:col-span-2">
                <BalanceChart data={dashboardData.lineData} />
              </div>
              <div className="lg:col-span-1">
                <CategoryPieChart data={dashboardData.pieData} />
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-xl">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">No financial data available</h3>
            <p className="text-sm mt-1">Please add transactions to see the dashboard metrics.</p>
          </div>
        )}

      </div>
    </PageWrapper>
  );
}
