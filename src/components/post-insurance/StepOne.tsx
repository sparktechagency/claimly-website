"use client";
import React from "react";
import insurer from "../../../public/insurer.svg";
import Image from "next/image";
import CustomDropDown from "./CustomDropDown";

interface StepProps {
    onNext: () => void;
}

const StepOne: React.FC<StepProps> = ({ onNext }) => {
    const [insurerName, setInsurerName] = React.useState("");
    const [customInsurerName, setCustomInsurerName] = React.useState("");
    const [policyType, setPolicyType] = React.useState("");
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const insurers = ["NRMA", "AAMI", "Allianz", "Budget Direct", "Suncorp", "Other"];
    const policies = ["Comprehensive", "Comprehensive Basic", "Third Party Fire & Theft", "Third Party Property Damage", "Other / Not sure"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!insurerName) newErrors.insurer = "Please select your insurer";
        if (insurerName === "Other" && !customInsurerName.trim()) newErrors.customInsurer = "Please enter your insurer name";
        if (!policyType) newErrors.policy = "Please select your policy type";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
                <div className="w-5 mt-2">
                    <Image src={insurer} alt="insurer" width={100} height={100} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold text-[#1E293B]">Insurer & Policy Details</p>
                    <p className="text-[14px] text-[#64748B]">This helps us interpret your documents correctly and benchmark your case against similar cases.</p>
                </div>
            </div>

            <div>
                <CustomDropDown
                    label="Who are you insured with?"
                    options={insurers}
                    selected={insurerName}
                    onSelect={(val) => {
                        setInsurerName(val);
                        setErrors(prev => ({ ...prev, insurer: "" }));
                    }}
                    error={!!errors.insurer}
                />
                {errors.insurer && <p className="text-red-500 text-xs mt-1">{errors.insurer}</p>}
            </div>

            {insurerName === "Other" && (
                <div>
                    <label className="block text-[#1E293B] text-sm font-medium mb-1">Insurer name</label>
                    <input
                        type="text"
                        placeholder="Enter insurer name"
                        value={customInsurerName}
                        onChange={(e) => {
                            setCustomInsurerName(e.target.value);
                            setErrors(prev => ({ ...prev, customInsurer: "" }));
                        }}
                        className={`w-full px-4 py-3 border rounded-[12px] outline-none text-[#64748B] bg-white ${errors.customInsurer ? "border-red-500" : "border-[#DBEAFE]"}`}
                    />
                    {errors.customInsurer && <p className="text-red-500 text-xs mt-1">{errors.customInsurer}</p>}
                </div>
            )}

            <div>
                <CustomDropDown
                    label="What type of policy is this?"
                    options={policies}
                    selected={policyType}
                    onSelect={(val) => {
                        setPolicyType(val);
                        setErrors(prev => ({ ...prev, policy: "" }));
                    }}
                    error={!!errors.policy}
                />
                {errors.policy && <p className="text-red-500 text-xs mt-1">{errors.policy}</p>}
            </div>

            <div className="flex gap-3 pt-4">
                <button type="submit" className="px-6 py-2 bg-[#2563EB] text-white font-medium rounded hover:bg-[#467bec]">
                    Next
                </button>
            </div>
        </form>
    );
};

export default StepOne;
