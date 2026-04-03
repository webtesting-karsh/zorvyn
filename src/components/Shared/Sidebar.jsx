import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Lightbulb, X } from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ReceiptText },
    { name: 'Insights', path: '/insights', icon: Lightbulb },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-20 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-gray-900 dark:text-white text-lg">
              F
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">FinDash</span>
          </div>
          
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 text-sm font-medium
                  ${isActive 
                    ? 'bg-indigo-500/10 text-indigo-500' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-200 dark:bg-gray-700'
                  }
                `}
              >
                <Icon size={20} className={isActive ? 'text-indigo-500' : 'text-gray-500'} />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  );
}
