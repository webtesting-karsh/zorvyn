import { useMemo, useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { calculateTotalIncome, calculateTotalExpense, getChartExpenseByCategory, formatCurrency } from '../utils/calculations';
import InsightCard from '../components/Insights/InsightCard';
import PageWrapper from '../components/Shared/PageWrapper';

export default function Insights() {
  const { transactions } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [transactions]);

  const insightsData = useMemo(() => {
    if (transactions.length === 0) return null;

    // 1. Highest Spending Category
    // We can reuse getChartExpenseByCategory which sorts automatically
    const expensesByCategory = getChartExpenseByCategory(transactions);
    const highestCategory = expensesByCategory.length > 0 ? expensesByCategory[0] : null;

    // 2. Month with Highest Expense
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const monthlyExpenses = expenseTransactions.reduce((acc, t) => {
      const dateObj = new Date(t.date);
      // Group logically by Month Year label
      const monthLabel = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      acc[monthLabel] = (acc[monthLabel] || 0) + t.amount;
      return acc;
    }, {});

    const monthlyEntries = Object.entries(monthlyExpenses);
    const highestMonth = monthlyEntries.length > 0 
      ? monthlyEntries.reduce((a, b) => a[1] > b[1] ? a : b)
      : null;

    // 3. Income vs Expense Comparison
    const totalIncome = calculateTotalIncome(transactions);
    const totalExpense = calculateTotalExpense(transactions);
    
    const savingsRate = totalIncome > 0 
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(0)
      : 0;

    return {
      highestCategory,
      highestMonth,
      totalIncome,
      totalExpense,
      savingsRate: Number(savingsRate)
    };
  }, [transactions]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="space-y-6 animate-pulse">
           <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
             <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
           </div>
        </div>
      </PageWrapper>
    );
  }

  // Handle Empty State
  if (!insightsData || (insightsData.totalIncome === 0 && insightsData.totalExpense === 0)) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AI Insights</h1>
        <div className="py-20 text-center text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-xl">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">No insights available</p>
          <p className="text-sm mt-1">Add some transactions to generate intelligent financial analysis.</p>
        </div>
      </div>
      </PageWrapper>
    );
  }

  const { highestCategory, highestMonth, savingsRate, totalIncome, totalExpense } = insightsData;

  return (
    <PageWrapper>
      <div className="space-y-8">
        
        <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AI Insights</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Smart financial analysis based on your spending habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Insight 1: Highest Spend Category */}
        {highestCategory && (
          <InsightCard 
            type="category"
            title="Top Spending Category"
            text={highestCategory.name}
            description={`You spent the most here overall, totaling ${formatCurrency(highestCategory.value)}.`}
          />
        )}

        {/* Insight 2: Max Expense Month */}
        {highestMonth && (
          <InsightCard 
            type="month"
            title="Heaviest Expense Month"
            text={highestMonth[0]}
            description={`Your highest spending was in this period with a total of ${formatCurrency(highestMonth[1])}.`}
          />
        )}

        {/* Insight 3: Ratio/Savings */}
        {savingsRate > 0 ? (
          <InsightCard 
            type="ratio"
            title="Savings Rate"
            text={`${savingsRate}% Saved`}
            description={`You are saving roughly ${savingsRate}% of your income. Solid cashflow!`}
          />
        ) : (
          <InsightCard 
            type="warning"
            title="Cashflow Warning"
            text="Negative Balance"
            description={`Your expenses (${formatCurrency(totalExpense)}) exceed your income (${formatCurrency(totalIncome)}).`}
          />
        )}

      </div>
    </div>
    </PageWrapper>
  );
}
