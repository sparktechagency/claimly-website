"use client";
import React from "react";
import insurer from "../../../public/insurer.svg";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { InsuranceFormInputs } from "@/app/post_insurance/page";

const datePickerStyle = `
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
    opacity: 0;
  }
`;

interface StepProps {
    onNext: () => void;
    onPrev: () => void;
}

const StepTwo: React.FC<StepProps> = ({ onNext, onPrev }) => {
    const { setValue } = useFormContext<InsuranceFormInputs>();
    const [incidentDate, setIncidentDate] = React.useState("");
    const [reportDate, setReportDate] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!incidentDate) newErrors.incidentDate = "Please select the incident date";
        if (!reportDate) newErrors.reportDate = "Please select when you told the insurer";
        if (!description.trim()) newErrors.description = "Please provide a description";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Sync to React Hook Form
        setValue("incidentDate", incidentDate);
        setValue("firstNotifiedDate", reportDate);
        setValue("incidentDescription", description);

        setErrors({});
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <style>{datePickerStyle}</style>
            <div className="flex gap-2">
                <div className="w-5 mt-2">
                    <Image src={insurer} alt="insurer" width={100} height={100} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold text-[#1E293B]">Incident Details</p>
                    <p className="text-[14px] text-[#64748B]">
                        When the incident happened and key facts.
                    </p>
                </div>
            </div>

            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    When did the incident happen?
                </label>
                <div className="relative">
                    <input
                        type={incidentDate ? "date" : "text"}
                        value={incidentDate}
                        onChange={(e) => {
                            setIncidentDate(e.target.value);
                            setErrors((prev) => ({ ...prev, incidentDate: "" }));
                        }}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text";
                        }}
                        placeholder="The date the damage, incident or loss occurred"
                        className={`w-full px-4 pr-12 py-3 border rounded-[12px] outline-none text-[#64748B] bg-white transition-all ${errors.incidentDate ? "border-red-500" : "border-[#DBEAFE]"
                            }`}
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
                {errors.incidentDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.incidentDate}</p>
                )}
            </div>

            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    When did you first tell the insurer?
                </label>
                <div className="relative">
                    <input
                        type={reportDate ? "date" : "text"}
                        value={reportDate}
                        onChange={(e) => {
                            setReportDate(e.target.value);
                            setErrors((prev) => ({ ...prev, reportDate: "" }));
                        }}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text";
                        }}
                        placeholder="This helps us understand whether delay is relevant"
                        className={`w-full px-4 pr-12 py-3 border rounded-[12px] outline-none text-[#64748B] bg-white transition-all ${errors.reportDate ? "border-red-500" : "border-[#DBEAFE]"
                            }`}
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
                {errors.reportDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.reportDate}</p>
                )}
            </div>

            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    Describe what happened
                </label>
                <textarea
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors((prev) => ({ ...prev, description: "" }));
                    }}
                    placeholder="What happened, where it occurred, who was involved..."
                    className={`w-full px-4 py-3 border rounded-[12px] outline-none text-[#64748B] bg-white min-h-[120px] ${errors.description ? "border-red-500" : "border-[#DBEAFE]"
                        }`}
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-6 py-2 bg-[#64748B] text-white font-medium rounded hover:bg-[#475569] transition-colors"
                >
                    Prev
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-[#2563EB] text-white font-medium rounded hover:bg-[#1d4ed8] transition-colors"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default StepTwo;
