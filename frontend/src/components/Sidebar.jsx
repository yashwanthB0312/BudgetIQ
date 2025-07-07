import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-md h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">BudgetIQ</h1>

        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Dashboard
          </Link>
          <Link
            to="/add"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FiPlus /> Add Transaction
          </Link>
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-300 dark:border-gray-600">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500"
        >
          {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-800"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
