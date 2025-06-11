import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
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
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>

        {(error || Object.keys(errors).length > 0) && (
          <div className="mt-6 text-center text-sm text-red-600">
            {error ||
              Object.values(errors).map((e, i) => (
                <p key={i}>{e.message || "This field is required"}</p>
              ))}
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
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
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
