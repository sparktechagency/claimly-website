"use client";
import Image from "next/image";
import React from "react";
import insurer from "../../../public/insurer.svg";
import { useFormContext } from "react-hook-form";
import { InsuranceFormInputs } from "@/app/post_insurance/page";

interface StepProps {
    onPrev: () => void;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    isLoading: boolean;
}

const StepFour: React.FC<StepProps> = ({ onPrev, onSubmit, isLoading }) => {
    const { register, watch, setValue } = useFormContext<InsuranceFormInputs>();
    const [consentChecked, setConsentChecked] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consentChecked) {
            setErrors({ consent: "You must agree to the terms to proceed." });
            return;
        }
        setErrors({});

        try {
            // Create a FileList-like object from files array
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            setValue("supporting_Documents", dataTransfer.files);

            // Call the parent's submit handler
            await onSubmit(e as any);
        } catch (error) {
            // Error is already handled in parent component
            console.error("Submission failed:", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (fileName: string) => {
        setFiles(files.filter(f => f.name !== fileName));
    };

    const isImage = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2">
                <div className="w-5 mt-2">
                    <Image src={insurer} alt="insurer" width={100} height={100} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold text-[#1E293B]">Documents & Consent</p>
                    <p className="text-[14px] text-[#64748B]">
                        Upload supporting documents and acknowledge how Claimly works.
                    </p>
                    <p className="text-[14px] text-[#64748B]">
                        Note: If you need to submit more than four files, kindly send them to Support@Claimly.com via email.


                    </p>
                </div>
            </div>

            {/* Upload Section */}
            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    Upload supporting documents
                </label>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
                    onChange={handleFileChange}
                />
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-[#DBEAFE] rounded-[12px] p-4 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-2 text-[#64748B] text-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16V8M12 8L9 11M12 8L15 11M4 17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Upload all relevant documents here (e.g PDS, Certificate of insurance, letters, etc.).</span>
                    </div>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, index) => (
                        <div key={index} className="flex justify-between items-center bg-[#EFF6FF] border border-[#2563EB] rounded-[12px] px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-lg border border-[#DBEAFE] flex flex-col items-center min-w-[40px]">
                                    {isImage(file.name) ? (
                                        <>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-[8px] font-bold text-blue-500 uppercase mt-[-4px]">img</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 18H17M7 14H17M7 10H13M14 2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H11L14 2Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-[8px] font-bold text-red-500 uppercase mt-[-4px]">pdf</span>
                                        </>
                                    )}
                                </div>
                                <span className="text-[#64748B] text-sm">{file.name}</span>
                            </div>
                            <button type="button" onClick={() => removeFile(file.name)} className="text-[#64748B] hover:text-red-500 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Consent & Acknowledgement */}
            <div className="space-y-3 ">
                <p className="text-[#1E293B] text-sm font-medium">Consent & Acknowledgement</p>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center ">
                        <input
                            type="checkbox"
                            checked={consentChecked}
                            onChange={(e) => {
                                setConsentChecked(e.target.checked);
                                if (e.target.checked) setErrors(prev => ({ ...prev, consent: "" }));
                            }}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center
                            ${consentChecked ? "border-[#2563EB] bg-[#2563EB]" : "border-[#DBEAFE] bg-white group-hover:border-[#2563EB]"}`}>
                            {consentChecked && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <span className="text-[#64748B] text-sm leading-relaxed">
                        I understand that Claimly provides general information, not legal or financial advice. No guaranteed outcomes. Claimly does not make decisions for insurers and cannot guarantee claim results.
                    </span>
                </label>
                {errors.consent && (
                    <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-8 py-2.5 border border-[#2563EB] text-[#2563EB] font-medium rounded-[12px] hover:bg-blue-50 transition-colors"
                    disabled={isLoading}
                >
                    Previous
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-10 py-2.5 bg-[#2563EB] text-white font-medium rounded-[12px] hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </div>

            {/* Warning Alert */}
            <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-[12px] p-4 flex gap-3">
                <div className="text-[#D97706] mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <p className="text-[#B45309] text-[13px] leading-relaxed">
                    Please redact or black out sensitive personal information where possible (e.g. licence numbers, Addresses, bank details, etc). Only include information relevant to your claim.
                </p>
            </div>
        </form>
    );
};

export default StepFour;
