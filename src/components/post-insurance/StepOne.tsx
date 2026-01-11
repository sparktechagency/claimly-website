"use client";
import React from "react";
import insurer from "../../../public/insurer.svg";
import Image from "next/image";
import CustomDropDown from "./CustomDropDown";
import { useFormContext } from "react-hook-form";
import { InsuranceFormInputs } from "@/app/post_insurance/page";

interface StepProps {
    onNext: () => void;
}

const StepOne: React.FC<StepProps> = ({ onNext }) => {
    const { setValue } = useFormContext<InsuranceFormInputs>();
    const [insurerName, setInsurerName] = React.useState("");
    const [customInsurerName, setCustomInsurerName] = React.useState("");
    const [policyType, setPolicyType] = React.useState("");
    const [isNotInsured, setIsNotInsured] = React.useState(false);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const insurers = ["NRMA", "AAMI", "Allianz", "Budget Direct", "Suncorp", "Other"];
    const policies = ["COMPREHENSIVE", "COMPREHENSIVE_BASIC", "THIRD_PARTY_FIRE_AND_THEFT", "THIRD_PARTY_PROPERTY_DAMAGE", "OTHER"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        if (!isNotInsured) {
            if (!insurerName) newErrors.insurer = "Please select your insurer";
            if (insurerName === "Other" && !customInsurerName.trim()) newErrors.customInsurer = "Please enter your insurer name";
            if (!policyType) newErrors.policy = "Please select your policy type";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Sync to React Hook Form
        if (isNotInsured) {
            setValue("insurerName", "Not insured");
            setValue("policyType", "N/A");
        } else {
            setValue("insurerName", insurerName === "Other" ? customInsurerName : insurerName);
            setValue("policyType", policyType);
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

            <div className={`space-y-4 transition-all duration-300 ${isNotInsured ? "opacity-50 pointer-events-none grayscale-[0.5]" : "opacity-100"}`}>
                <div>
                    <CustomDropDown
                        label="Who are you insured with?"
                        options={insurers}
                        selected={isNotInsured ? "" : insurerName}
                        onSelect={(val) => {
                            setInsurerName(val);
                            setErrors(prev => ({ ...prev, insurer: "" }));
                        }}
                        error={!isNotInsured && !!errors.insurer}
                    />
                    {!isNotInsured && errors.insurer && <p className="text-red-500 text-xs mt-1">{errors.insurer}</p>}
                </div>

                {!isNotInsured && insurerName === "Other" && (
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
                        selected={isNotInsured ? "" : policyType}
                        onSelect={(val) => {
                            setPolicyType(val);
                            setErrors(prev => ({ ...prev, policy: "" }));
                        }}
                        error={!isNotInsured && !!errors.policy}
                    />
                    {!isNotInsured && errors.policy && <p className="text-red-500 text-xs mt-1">{errors.policy}</p>}
                </div>
            </div>

            {/* Not insured option at the bottom */}
            <div className="pt-2">
                <label
                    className={`flex items-center gap-2 cursor-pointer group border rounded-[12px] px-4 py-4 w-full transition-all 
                        ${isNotInsured ? "border-[#2563EB] bg-[#DBEAFE]/30" : "border-[#DBEAFE] bg-white hover:border-[#2563EB]/50"}`}
                    onClick={() => {
                        setIsNotInsured(!isNotInsured);
                        if (!isNotInsured) {
                            setErrors({});
                        }
                    }}
                >
                    <div className="relative flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center
                            ${isNotInsured ? "border-[#2563EB] bg-white" : "border-[#64748B] bg-[#DBEAFE]/50"}`}>
                            <div className={`w-2.5 h-2.5 rounded-full transition-all ${isNotInsured ? "bg-[#2563EB]" : "hidden"}`} />
                        </div>
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${isNotInsured ? "text-[#1E293B]" : "text-[#64748B]"}`}>
                        Not insured - Claiming through the other parties insurance
                    </span>
                </label>
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
