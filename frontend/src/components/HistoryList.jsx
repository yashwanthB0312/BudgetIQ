import React from 'react';
import { FiTrash } from 'react-icons/fi';

const HistoryList = ({ transactions, onDelete }) => {
  const recent = transactions.slice(-5).reverse();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow text-gray-900 dark:text-white">
      <h2 className="text-md font-semibold mb-4">Transaction History</h2>

      <ul className="space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {recent.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              <span
                className={`text-sm ${
                  item.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {item.type === 'income' ? '+' : '-'} ₹{item.amount}
              </span>
            </div>
            <button
              onClick={() => onDelete(item._id)}
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
              title="Delete"
            >
              <FiTrash className="text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
