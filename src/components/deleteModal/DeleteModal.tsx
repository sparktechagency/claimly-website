"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Info } from "lucide-react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl flex flex-col p-8 max-w-[500px] w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-8">
                    Confirm your password to continue
                </h2>

                <div className="space-y-6">
                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-[#1E293B] font-medium block">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="P@ssw*rd"
                                className="w-full px-4 py-3.5 rounded-xl border border-[#DBEAFE] text-[#1E293B] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Warning Box */}
                    <div className="bg-[#FFFBEB] border border-[#B45309]/30 rounded-xl p-4 flex gap-3">
                        <div className="mt-0.5">
                            <Info size={18} className="text-[#B45309]" />
                        </div>
                        <p className="text-sm text-[#B45309] leading-relaxed">
                            For security, please enter your password to confirm account deletion. This action is permanent and cannot be undone.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 border border-[#2563EB] text-[#2563EB] font-bold rounded-xl hover:bg-blue-50 transition-all text-center"
                        >
                            Cancel
                        </button>
                        <button
                            // onClick={() => {
                            //     if (password) {
                            //         alert("Account deletion process started");
                            //         onClose();
                            //         router.push("/");
                            //     } else {
                            //         alert("Please enter your password");
                            //     }
                            // }}
                            className="flex-2 py-3.5 bg-[#EF4444] text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 text-center whitespace-nowrap"
                        >
                            Delete account permanently
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
