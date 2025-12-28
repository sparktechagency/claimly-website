/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import loginImage from "../../../../public/register.svg";
import Image from "next/image";
import Link from "next/link";

const Page: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center gap-8">
        {/* Left Image */}
        <div className="w-full hidden lg:block">
          <Image
            src={loginImage}
            alt="login-image"
            width={100}
            height={100}
            className="w-full"
          />
        </div>

        {/* Right Form */}
        <div className="w-full p-8 max-w-lg mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#1E293B] text-3xl">
              Create Your Account
            </h1>
            <p className="text-[#64748B] text-sm">
              Sign up with your email and phone number to get started.
            </p>
          </div>

          <form>
            <div className="space-y-6">

              {/* Full Name */}
              <div>
                <label className="text-[#1E293B] text-[15px] font-medium mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  className="w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[#1E293B] text-[15px] font-medium mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="@esteban_schiller@gmail.com"
                  className="w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="text-[#1E293B] text-[15px] font-medium mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+ 61 412 345 678"
                  className="w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-[#1E293B] text-[15px] font-medium mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter password"
                    className="w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none"
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {showPassword ? (
                      // Eye Off
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.053.162-2.067.463-3.021M6.423 6.423A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 10a9.956 9.956 0 01-1.423 5.077M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      // Eye
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {/* Confirm Password */}
              <div>
                <label className="text-[#1E293B] text-[15px] font-medium mb-2 block">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Enter password"
                    className="w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none"
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {showConfirmPassword ? (
                      // Eye Off
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.053.162-2.067.463-3.021M6.423 6.423A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 10a9.956 9.956 0 01-1.423 5.077M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      // Eye
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

            </div>
             {/* Register */}
            <p className="text-sm mt-3 text-slate-600">
              Already have an account?
              <Link
                href="/"
                className="text-[#4E9AF1] font-medium hover:underline ml-1"
              >
                Log In
              </Link>
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-5 py-3 rounded-md bg-[#2563EB]/80 hover:bg-[#2563EB] text-white text-sm font-medium transition"
            >
              Sign in
            </button>

           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
