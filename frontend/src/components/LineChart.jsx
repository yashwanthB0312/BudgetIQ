import React from 'react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({ transactions }) => {
  const weeklyData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
    const income = transactions.filter((t) => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter((t) => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    return { name: day, income, expense };
  });

  return (
    <div className="bg-white  dark:bg-gray-800 rounded-xl p-4 shadow text-gray-800 dark:text-white">
      <h2 className="text-md font-semibold mb-4">Finance Statistics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <ReLineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;