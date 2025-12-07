"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/src/actions/movies';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const handleOnSubmit = (data: any) => {
    loginUser(data)
      .then((res: any) => {
        // --- UPDATED LOGIC ---
        // Your backend returns { message: "..." } on failure.
        // On success, it returns a user object (which likely won't have a generic 'message' key).
        
        if (res?.message) {
            // Backend returned an error message (User not found / Password incorrect)
            setErrorMessage(res.message);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return; 
        }
        
        // Success!
        console.log("Login Success:", res);
        localStorage.setItem("userData", JSON.stringify(res));
        router.push("/");
      })
      .catch((err) => {
        console.error("Network or Server Error:", err);
        setErrorMessage("Something went wrong. Please try again.");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] font-sans p-4 relative overflow-hidden">

      {/* --- ERROR TOAST --- */}
      <div 
          className={`
              fixed top-10 left-1/2 transform -translate-x-1/2 z-[100]
              flex items-center gap-2 px-6 py-3 
              bg-red-600 text-white rounded-full shadow-2xl shadow-black/50
              transition-all duration-300 ease-out pointer-events-none
              ${showError ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
          `}
      >
          <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-bold tracking-wide whitespace-nowrap">{errorMessage}</span>
      </div>

      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Glassmorphic Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-900/50 rounded-full h-16 w-16 flex items-center justify-center border border-white/10 mb-4 transform transition-transform hover:scale-105">
            <span className="text-white text-xs font-extrabold leading-tight text-center tracking-tighter">
              SHOW<br />TIME
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2">Sign in to continue your cinematic journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="name@example.com"
                className="w-full bg-black/20 border border-white/10 text-white text-sm rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs text-red-400 hover:text-red-300 transition-colors">Forgot password?</a>
            </div>
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
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all transform active:scale-[0.98] mt-4">
            Sign In
          </button>

        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#162032] text-gray-500 rounded-full text-xs uppercase">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl text-white text-sm font-medium transition-all group">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl text-white text-sm font-medium transition-all group">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Facebook" />
            Facebook
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-red-500 hover:text-red-400 font-bold transition-colors">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}