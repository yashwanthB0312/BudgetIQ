import React from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const PieChart = ({ transactions }) => {
  const grouped = transactions.reduce((acc, curr) => {
    if (curr.type === 'expense') {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    }
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));
  const COLORS = ['#6366f1', '#10b981', '#f97316', '#f43f5e'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow text-gray-800 dark:text-white">
      <h2 className="text-md font-semibold mb-4">Expense Distribution</h2>
      <ResponsiveContainer width={"100%"} height={250}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tw-bg-opacity, 1)',
              color: 'black',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
            wrapperStyle={{
              zIndex: 1000,
            }}
          />

          <Legend
            wrapperStyle={{
              color: 'inherit',
              fontSize: '0.875rem',
            }}
          />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
