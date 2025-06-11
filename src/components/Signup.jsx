import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login(user));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
    <div className="mx-auto w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-10 border border-black/10 shadow-lg">
      <div className="mb-6 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>

      <h2 className="text-center text-3xl font-extrabold leading-tight text-gray-900 dark:text-white">
        Sign up to create an account
      </h2>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
        >
          Sign In
        </Link>
      </p>

      {error && (
        <div className="mt-6 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
        <Input
          label="Full Name:"
          placeholder="Enter your full name"
          {...register("name", { required: "Name is required" })}
        />

        <Input
          label="Email:"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email address must be valid",
            },
          })}
        />

        <Input
          label="Password:"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  </div>
);

}

export default Signup;
