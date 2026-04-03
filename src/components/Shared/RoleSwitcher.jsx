import { useStore } from '../../store/useStore';

export default function RoleSwitcher() {
  const { role, setRole } = useStore();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Role:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}
