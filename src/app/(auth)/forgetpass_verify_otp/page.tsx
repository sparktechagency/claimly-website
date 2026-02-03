/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useRef, useEffect } from "react";
import verifyImage from "../../../../public/verify_email.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecentForgotPassOtpMutation, useVerifyForgetpasswordOtpMutation } from "@/store/feature/authApi/authApi";
import { toast } from "sonner";

const VerifyOtp: React.FC = () => {
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("email") || "";
        setEmail(savedEmail);
    }, []);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [verifyRegisterOtpMutation, { isLoading }] = useVerifyForgetpasswordOtpMutation();
    const [recentForgotPassOtpMutation] = useRecentForgotPassOtpMutation()
    const router = useRouter();
    // Set focus on the first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);


        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
        if (pasteData.every((char) => !isNaN(Number(char)))) {
            const newOtp = [...otp];
            pasteData.forEach((char, index) => {
                newOtp[index] = char;
            });
            setOtp(newOtp);
            // Focus the last filled input or the first empty one
            const lastIndex = Math.min(pasteData.length, 5);
            inputRefs.current[lastIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");

        if (code.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP", {
                style: {
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    borderLeft: "6px solid #991b1b",
                },
            });
            return;
        }

        const userData = {
            email: localStorage.getItem("email"),
            otp: code
        };
        console.log(userData)
        try {
            const result = await verifyRegisterOtpMutation(userData).unwrap();
            console.log("token data", result)
            if (result?.success) {
                // Store the access token for automatic login
                if (result?.data?.accessToken) {
                    localStorage.setItem("accessToken", result.data.accessToken);
                }

                toast.success(result?.message || "OTP verified successfully! Welcome!", {
                    style: {
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        borderLeft: "6px solid #166534",
                    },
                });


                router.push("/forgetNewPassSet");
            }
        } catch (err: any) {
            const errorMessage = err?.data?.message || "OTP verification failed. Please try again.";
            toast.error(errorMessage, {
                style: {
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    borderLeft: "6px solid #991b1b",
                },
            });
        }
    };

    const handleForgotPassOtpSend = async () => {
        const userData = {
            email: localStorage.getItem("email"),
        };
        console.log(userData)
        try {
            const result = await recentForgotPassOtpMutation(userData).unwrap();
            console.log("token data", result)
            if (result?.success) {
                // Store the access token for automatic login
                if (result?.data?.accessToken) {
                    localStorage.setItem("accessToken", result.data.accessToken);
                }

                toast.success(result?.message || "OTP send successfully!", {
                    style: {
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        borderLeft: "6px solid #166534",
                    },
                });


                // router.push("/forgetNewPassSet");
            }
        } catch (err: any) {
            const errorMessage = err?.data?.message || "OTP send failed. Please try again.";
            toast.error(errorMessage, {
                style: {
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    borderLeft: "6px solid #991b1b",
                },
            });
        }
    }

    return (
        <div className="max-w-4xl w-full mx-auto">
            <div className="flex items-center gap-8">
                {/* Left Image */}
                <div className=" hidden lg:block">
                    <Image
                        priority
                        src={verifyImage}
                        alt="verify-otp-image"
                        width={100}
                        height={100}
                        className="w-full scale-110"
                    />
                </div>

                {/* Right Form */}
                <div className="w-full p-8 max-w-lg mx-auto flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#1E293B]/70 text-3xl">
                            Verify OTP
                        </h1>
                        <p className="text-[#64748B] text-sm">
                            We have sent a 6-digit verification code to your email address.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            {/* OTP Input Container */}
                            <div
                                className="flex justify-between gap-2 mt-4"
                                onPaste={handlePaste}
                            >
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="w-full h-14 text-center text-xl font-semibold text-[#1E293B] bg-white rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none transition-all shadow-sm"
                                    />
                                ))}
                            </div>

                            {/* Resend Link */}
                            <div className="">
                                <p className="text-sm text-slate-600">
                                    Didn't receive the code?
                                    <button
                                        onClick={handleForgotPassOtpSend}
                                        type="button"
                                        className="text-[#4E9AF1] font-medium hover:underline ml-1"
                                    >
                                        Resend OTP
                                    </button>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl bg-[#2563EB]/80 hover:bg-[#2563EB] text-white text-sm font-semibold transition-all shadow-lg active:scale-[0.98]"
                            >
                                {isLoading ? "Verifying..." : "Verify"}
                            </button>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
