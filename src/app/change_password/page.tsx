/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import backIcon from "../../../public/back.svg";
import Button from "@/components/shared/Button";
import save from "../../../public/Vector (2).svg";
import { useChangePasswordMutation } from "@/store/feature/authApi/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Inputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange"
  })

  // Watch password for live validation
  const newPassword = watch("newPassword", "");

  // Validation criteria
  const validationCriteria = [
    { label: "Minimum 8 characters", met: newPassword.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(newPassword) },
    { label: "At least one lowercase letter", met: /[a-z]/.test(newPassword) },
    { label: "At least one number", met: /\d/.test(newPassword) },
    { label: "At least one special character", met: /[@$!%*?&]/.test(newPassword) },
  ];

  const isAllCriteriaMet = validationCriteria.every(c => c.met);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const passData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      }
      const result = await changePassword(passData).unwrap();
      if (result?.success) {
        toast.success(result?.message || "Password changed successfully", {
          style: {
            backgroundColor: "#dcfce7",
            color: "#166534",
            borderLeft: "6px solid #16a34a",
          },
        });
        router.push("/my_profile");
      }
    } catch (err: any) {
      console.error("Failed to change password", err);
      toast.error(err?.data?.message || "Failed to change password", {
        style: {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          borderLeft: "6px solid #dc2626",
        },
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-28">
        <div className="mb-10">
          <Link
            href="/my_profile"
            className="flex items-center gap-2 text-[#64748B] hover:text-[#2563EB] transition-colors mb-4 group"
          >
            <Image
              src={backIcon}
              alt="back"
              width={12}
              height={12}
              className="w-3"
            />
            <span className="text-sm font-medium hover:underline">
              Change Password
            </span>
          </Link>
        </div>
        {/* Right Form */}
        <div className="w-full flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Old Password */}
              <div>
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    {...register("oldPassword", { required: "Old password is required" })}
                    placeholder="Enter old password"
                    className={`w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-12 py-3.5 rounded-xl border ${errors.oldPassword ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="h-4">
                  {errors.oldPassword && (
                    <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.oldPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                {/* New Password */}
                <div className="w-full">
                  <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("newPassword", {
                        required: "New password is required",
                        validate: () => isAllCriteriaMet || "Password does not meet all criteria"
                      })}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={(e) => {
                        register("newPassword").onBlur(e);
                        setPasswordFocused(false);
                      }}
                      placeholder="Enter new password"
                      className={`w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-12 py-3.5 rounded-xl border ${errors.newPassword ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="h-4">
                    {errors.newPassword && (
                      <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.newPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="w-full">
                  <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmNewPassword", {
                        required: "Please confirm your password",
                        validate: (val) => val === newPassword || "Passwords do not match"
                      })}
                      placeholder="Confirm new password"
                      className={`w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-12 py-3.5 rounded-xl border ${errors.confirmNewPassword ? 'border-red-500' : 'border-[#DBEAFE]'} focus:border-blue-600 outline-none transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="h-4">
                    {errors.confirmNewPassword && (
                      <p className="text-red-500 text-[11px] mt-1 font-medium">
                        {errors.confirmNewPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Criteria Paragraph with Smooth Transition */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${passwordFocused ? "max-h-24 opacity-100 mt-0" : "max-h-0 opacity-0 mt-0"
                  }`}
              >
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Password must be at least <span className={newPassword.length >= 8 ? "text-green-600 font-semibold" : "text-slate-600"}>8 characters</span> long,
                  include <span className={/[A-Z]/.test(newPassword) ? "text-green-600 font-semibold" : "text-slate-600"}>one uppercase letter</span>,
                  <span className={/[a-z]/.test(newPassword) ? "text-green-600 font-semibold" : "text-slate-600"}> one lowercase letter</span>,
                  <span className={/\d/.test(newPassword) ? "text-green-600 font-semibold" : "text-slate-600"}> one number</span>,
                  and <span className={/[@$!%*?&]/.test(newPassword) ? "text-green-600 font-semibold" : "text-slate-600"}>one special character</span>.
                </p>
              </div>

              {/* Submit Button */}
              {/* Actions */}
              <div className="flex-1">

                <Button
                  rightIcon={
                    <Image
                      src={save}
                      alt="arrow icon"
                      width={16}
                      height={16}
                      className="transition-transform duration-200 group-hover:translate-x-1 w-4 h-4 ml-2.5"
                    />
                  }
                  variant="primary"
                  size="lg"
                  className="font-medium"
                  type="submit"
                  disabled={isLoading || !isAllCriteriaMet}
                >
                  {isLoading ? "Saving..." : "Save Password"}
                </Button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
