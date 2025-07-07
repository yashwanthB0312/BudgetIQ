import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import HistoryList from '../components/HistoryList';
import API from '../api';
import { toast } from 'react-toastify';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTxns, setFilteredTxns] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      setFilteredTxns(
        transactions.filter((txn) =>
          txn.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredTxns(transactions);
    }
  }, [search, transactions]);

  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
    } catch {
      toast.error('Failed to fetch user');
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await API.get('/transactions');
      setTransactions(res.data);
    } catch (err) {
      toast.error('Failed to fetch transactions');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      toast.success('Transaction deleted');
      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
    } catch (err) {
      toast.error('Failed to delete transaction');
    }
  };

  const income = filteredTxns
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = filteredTxns
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-gray-700 dark:text-white"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full z-50 bg-white dark:bg-gray-800 shadow-lg transition-transform transform duration-300 md:hidden flex flex-col">
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-700 dark:text-white">
              <FiX />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 p-4 sm:p-6 text-gray-900 dark:text-white w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 md:mt-4">
          <h1 className="text-xl font-semibold text-center md:text-left">
            Hi, Welcome back <span className="text-blue-600">{user?.name || 'User'}</span> 👋
          </h1>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search transactions"
              className="pl-10 pr-4 py-2 border rounded-lg w-full bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Card title="Balance" amount={`₹${balance.toFixed(2)}`} subtext="Your current balance" type="primary" />
          <Card title="Income" amount={`₹${income.toFixed(2)}`} subtext="Total income" type="success" />
          <Card title="Expenses" amount={`₹${expenses.toFixed(2)}`} subtext="Total expenses" type="danger" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <LineChart transactions={filteredTxns} />
          </div>
          <PieChart transactions={filteredTxns} />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <HistoryList transactions={filteredTxns} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
