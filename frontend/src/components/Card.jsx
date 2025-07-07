import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiCreditCard } from 'react-icons/fi';

const iconMap = {
  primary: <FiCreditCard className="text-3xl text-white" />,
  success: <FiTrendingUp className="text-2xl text-green-500 dark:text-green-400" />,
  danger: <FiTrendingDown className="text-2xl text-red-500 dark:text-red-400" />,
};

const Card = ({ title, amount, subtext, percent, type }) => {
  const bgClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white',
    success: 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white',
    danger: 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white',
  };

  const percentClasses = {
    success: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
    danger: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div
      className={`rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${bgClasses[type]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{amount}</p>
          <p className="text-xs mt-1 opacity-70">{subtext}</p>
        </div>
        <div>{iconMap[type]}</div>
      </div>

      {percent && (
        <div
          className={`text-xs mt-4 font-semibold px-2 py-1 rounded-full w-fit ${percentClasses[type]}`}
        >
          {percent}
        </div>
      )}
    </div>
  );
};

export default Card;
