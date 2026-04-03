import { Search, UserCircle, Menu, Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import RoleSwitcher from './RoleSwitcher';

export default function Navbar({ toggleSidebar, title }) {
  const { theme, toggleTheme } = useStore();

  return (
    <header className="h-20 px-6 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="md:hidden mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">{title}</h2>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Search Input (UI only) */}
        <div className="hidden md:flex items-center bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700 w-64 focus-within:border-indigo-500 transition-colors">
          <Search size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500 w-full"
          />
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

        <button 
          onClick={toggleTheme}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors p-1"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <RoleSwitcher />

        <div className="flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors">
          <UserCircle size={28} />
        </div>
      </div>
    </header>
  );
}
