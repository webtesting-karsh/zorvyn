import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import Sidebar from './components/Shared/Sidebar';
import Navbar from './components/Shared/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

// Wrap the main layout to access useLocation for Navbar title
function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Determine current page title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/transactions': return 'Transactions';
      case '/insights': return 'Insights';
      default: return 'FinDash';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 font-sans">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex relative flex-col flex-1 w-full overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} title={getPageTitle()} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
