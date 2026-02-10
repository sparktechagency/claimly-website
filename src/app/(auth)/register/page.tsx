/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import loginImage from "../../../../public/register.svg";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { Eye, EyeOff } from "lucide-react";
import { useRegisterMutation } from "@/store/feature/authApi/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


type Inputs = {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const Page: React.FC = () => {
  const router = useRouter();
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);



  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange"
  })

  // Watch password for live validation
  const password = watch("password", "");

  // Validation criteria
  const validationCriteria = [
    { label: "Minimum 8 characters", met: password.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter", met: /[a-z]/.test(password) },
    { label: "At least one number", met: /\d/.test(password) },
    { label: "At least one special character", met: /[@$!%*?&]/.test(password) },
  ];

  const isAllCriteriaMet = validationCriteria.every(c => c.met);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userData = {
        ...data,
        role: "NORMALUSER"
      }
      const result = await registerUser(userData).unwrap();
      if (result?.success) {
        localStorage.setItem("email", result?.data?.email);
        toast.success(result?.message || "Registration successful", {
          style: {
            backgroundColor: "#dcfce7",
            color: "#166534",
            borderLeft: "6px solid #16a34a",
          },
        });
        router.push("/verify_otp");
      }
    } catch (err: any) {
      console.error("Failed to register", err?.data?.message);
      toast.error(err?.data?.message || "Failed to register", {
        style: {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          borderLeft: "6px solid #dc2626",
        },
      });
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-8">
        {/* Left Image */}
        <div className="w-full hidden lg:block">
          <Image
            priority
            src={loginImage}
            alt="login-image"
            width={100}
            height={100}
            className="w-xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full max-w-2xl p-8 mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#1E293B]/70 text-3xl">
              Create Your Account
            </h1>
            <p className="text-[#64748B] text-sm">
              Sign up with your email and phone number to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  placeholder="Enter full name"
                  className={`w-full text-sm text-[#1E293B]/70 bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                />
                <div className="h-4">
                  {errors.fullName && (
                    <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.fullName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required"
                  })}
                  placeholder="@esteban_schiller@gmail.com"
                  className={`w-full text-sm text-[#1E293B]/70 bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                />
                <div className="h-4">
                  {errors.email && (
                    <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.email.message}</p>
                  )}
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    validate: (value) => {
                      if (!value) return "Phone number is required";
                      const isValid = isValidPhoneNumber(value);
                      const isAustralian = value.startsWith("+61");
                      if (!isValid || !isAustralian) {
                        return "Only Australian phone numbers (+61) are allowed";
                      }
                      return true;
                    }
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="AU"
                      countries={["AU"]}
                      placeholder="Enter phone number"
                      className={`w-full text-sm text-[#1E293B]/70 bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                    />
                  )}
                />
                <div className="h-4">
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      validate: () => isAllCriteriaMet || "Password does not meet all criteria"
                    })}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={(e) => {
                      register("password").onBlur(e);
                      setPasswordFocused(false);
                    }}
                    placeholder="Enter password"
                    className={`w-full text-sm text-[#1E293B]/70 bg-white focus:bg-transparent pl-4 pr-12 py-3.5 rounded-xl border ${errors.password ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="h-4">
                  {errors.password && (
                    <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.password.message}</p>
                  )}
                </div>

                {/* Password Criteria Paragraph with Smooth Transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${passwordFocused ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                    }`}
                >
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Password must be at least <span className={password.length >= 8 ? "text-green-600 font-semibold" : "text-slate-600"}>8 characters</span> long,
                    include <span className={/[A-Z]/.test(password) ? "text-green-600 font-semibold" : "text-slate-600"}>one uppercase letter</span>,
                    <span className={/[a-z]/.test(password) ? "text-green-600 font-semibold" : "text-slate-600"}> one lowercase letter</span>,
                    <span className={/\d/.test(password) ? "text-green-600 font-semibold" : "text-slate-600"}> one number</span>,
                    and <span className={/[@$!%*?&]/.test(password) ? "text-green-600 font-semibold" : "text-slate-600"}>one special character</span>.
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (val) => val === password || "Passwords do not match"
                    })}
                    placeholder="Confirm password"
                    className={`w-full text-sm text-[#1E293B]/70 bg-white focus:bg-transparent pl-4 pr-12 py-3.5 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="h-4">
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-[11px] mt-1 font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

            </div>
            {/* Register */}
            <p className="text-sm mt-3 text-slate-600">
              Already have an account?
              <Link
                href="/login"
                className="text-[#4E9AF1] font-medium hover:underline ml-1"
              >
                Log In
              </Link>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !isAllCriteriaMet}
              className={`w-full mt-5 py-3 rounded-md text-white text-sm font-medium transition ${isLoading || !isAllCriteriaMet ? "bg-slate-300 cursor-not-allowed" : "bg-[#2563EB]/80 hover:bg-[#2563EB]"
                }`}
            >
              {isLoading ? "Creating Account..." : "Next"}
            </button>




          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
