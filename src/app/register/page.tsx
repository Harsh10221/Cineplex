"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Eagle_Lake } from "next/font/google";
import { useForm } from "react-hook-form";
import { registerUser } from "@/src/actions/movies";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  // const fullNameRef = useRef(null)
  // const emailRef = useRef(null)
  // const passwordRef = useRef(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleCreateAccount = (data: any) => {
    // const obj = {
    //   fullName: fullNameRef?.current?.value,
    //   email: emailRef?.current?.value,
    //   password: passwordRef?.current?.value
    // }
    // console.log("This is data ", data)

    registerUser(data)
      .then((response) => {
        if (response.success) {
          console?.log("Success:", response?.message);
        } else {
          // console?.warn("Error:", response?.message);
          alert(response?.message);
        }
      })
      .catch((err) => {
        console.log("Critical Failure:", err);
      });
  };

  return (
    // <form onSubmit={handleSubmit(handleCreateAccount)}>

    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] font-sans p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Glassmorphic Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Join ShowTime for exclusive access
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleCreateAccount)}
          className="space-y-5"
        >
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                // ref={fullNameRef}
                // value={fullName.current.value}
                {...register("fullName", { required: true })}
                type="text"
                placeholder="John Doe"
                className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                placeholder="name@example.com"
                className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center ml-1">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 rounded border-gray-600 bg-black/20 text-red-600 focus:ring-red-500/50 focus:ring-offset-0 cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-xs text-gray-400 select-none cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-white hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-white hover:underline">Privacy Policy</span>
            </label>
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all transform active:scale-[0.98] mt-2">
            {/* <button type='button' onClick={handleCreateAccount} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all transform active:scale-[0.98] mt-2"> */}
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-red-500 hover:text-red-400 font-bold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
    // {/* </form> */}
  );
}
