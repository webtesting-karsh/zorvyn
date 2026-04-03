export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};


export const calculateTotalExpense = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expense = calculateTotalExpense(transactions);
  return income - expense;
};

// --- Chart Data Utilities ---

export const getChartMonthlyBalance = (transactions) => {
  // Sort transactions chronologically
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const monthlyBreakdown = {};
  let currentBalance = 0;

  sorted.forEach((t) => {
    // Format date as 'YYYY-MM' for grouping
    const dateObj = new Date(t.date);
    const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
    
    // Convert '2026-04' to short month name 'Apr 26' for nicer chart labels
    const formatName = dateObj.toLocaleDateString("en-US", { month: "short", year: "numeric" });

    if (t.type === 'income') {
      currentBalance += t.amount;
    } else {
      currentBalance -= t.amount;
    }

    if (!monthlyBreakdown[monthKey]) {
      monthlyBreakdown[monthKey] = {
        name: formatName,
        balance: currentBalance, // Initial update for month
      };
    } else {
      // Keep track of the final running balance for that month
      monthlyBreakdown[monthKey].balance = currentBalance;
    }
  });

  return Object.values(monthlyBreakdown);
};

export const getChartExpenseByCategory = (transactions) => {
  const expenseData = transactions.filter((t) => t.type === 'expense');
  
  const categoryMap = expenseData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  return Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort highest expenses first
};
