import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api.jsx';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900 transition-colors text-gray-800 dark:text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-xl space-y-4"
      >
        <h1 className="text-xl font-bold text-center">
          Log In to <span className="text-blue-600">BudgetIQ</span>
        </h1>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition"
        >
          Log In
        </button>

        <p className="text-sm text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
