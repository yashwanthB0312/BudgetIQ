import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Api';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await API.post('/auth/signup', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      toast.success('Signup successful');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      toast.error(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md space-y-4 text-gray-800 dark:text-white'
      >
        <h1 className='text-xl font-bold text-center'>
          Sign Up on <span className='text-[#2970ff]'>BudgetIQ</span>
        </h1>

        <div className="space-y-1">
          <label className='text-sm font-medium'>Name</label>
          <input
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div className="space-y-1">
          <label className='text-sm font-medium'>Email</label>
          <input
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div className="space-y-1">
          <label className='text-sm font-medium'>Password</label>
          <input
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <div className="space-y-1">
          <label className='text-sm font-medium'>Confirm Password</label>
          <input
            type='password'
            placeholder='••••••••'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className='w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition'
        >
          Sign Up
        </button>

        <p className='text-center text-sm mt-2'>
          Already have an account?{' '}
          <a href='/login' className='text-blue-600 hover:underline'>
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
