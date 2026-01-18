"use client";
import Image from "next/image";
import React from "react";
import insurer from "../../../public/insurer.svg";
import { useFormContext } from "react-hook-form";
import { InsuranceFormInputs } from "@/app/post_insurance/page";

interface StepProps {
    onNext: () => void;
    onPrev: () => void;
}

const StepThree: React.FC<StepProps> = ({ onNext, onPrev }) => {
    const { setValue, getValues } = useFormContext<InsuranceFormInputs>();

    // Initialize from React Hook Form values (for when user navigates back)
    const formValues = getValues();
    const [insurerSaid, setInsurerSaid] = React.useState(formValues.insurerResponse || "");
    const [concernedAbout, setConcernedAbout] = React.useState(formValues.userConcern || "");
    const [complaintMade, setComplaintMade] = React.useState(formValues.complaintMade || "");
    const [complaintStatus, setComplaintStatus] = React.useState(formValues.complaintStatus || "");
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!insurerSaid.trim()) newErrors.insurerSaid = "Please tell us what your insurer said";
        if (!concernedAbout.trim()) newErrors.concernedAbout = "Please let us know your concerns";
        if (!complaintMade) newErrors.complaintMade = "Please select an option";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Sync to React Hook Form
        setValue("insurerResponse", insurerSaid);
        setValue("userConcern", concernedAbout);
        setValue("complaintMade", complaintMade);
        setValue("complaintStatus", complaintStatus);

        setErrors({});
        onNext();
    };

    const radioOptions = [
        { id: "NO", label: "No" },
        { id: "YES_WITH_INSURER", label: "Yes - with insurer" },
        { id: "YES_WITH_AFCA", label: "Yes - with AFCA" }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2">
                <div className="w-5 mt-2">
                    <Image src={insurer} alt="insurer" width={100} height={100} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold text-[#1E293B]">Insurer Response & Concerns</p>
                    <p className="text-[14px] text-[#64748B]">
                        What the insurer decided and what you want to know.
                    </p>
                </div>
            </div>

            {/* what has your insurer */}
            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    What has your insurer said or decided so far?
                </label>
                <textarea
                    value={insurerSaid}
                    onChange={(e) => {
                        setInsurerSaid(e.target.value);
                        setErrors((prev) => ({ ...prev, insurerSaid: "" }));
                    }}
                    placeholder="For example: claim declined, partial payout offered, pre-existing damage raised, delay concerns, request for more information."
                    className={`w-full px-4 py-3 border rounded-[12px] outline-none text-[#64748B] bg-white min-h-[120px] transition-all 
                        ${errors.insurerSaid ? "border-red-500" : "border-[#DBEAFE]"}`}
                />
                {errors.insurerSaid && (
                    <p className="text-red-500 text-xs mt-1">{errors.insurerSaid}</p>
                )}
            </div>

            {/* What are you most concerned */}
            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    What are you most concerned about or hoping to understand?
                </label>
                <textarea
                    value={concernedAbout}
                    onChange={(e) => {
                        setConcernedAbout(e.target.value);
                        setErrors((prev) => ({ ...prev, concernedAbout: "" }));
                    }}
                    placeholder="payout seems too low, unsure if the insurer is right, whether it's worth disputing, or what evidence matters most."
                    className={`w-full px-4 py-3 border rounded-[12px] outline-none text-[#64748B] bg-white min-h-[120px] transition-all 
                        ${errors.concernedAbout ? "border-red-500" : "border-[#DBEAFE]"}`}
                />
                {errors.concernedAbout && (
                    <p className="text-red-500 text-xs mt-1">{errors.concernedAbout}</p>
                )}
            </div>

            {/* Have you already made a complaint? */}
            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-2">
                    Have you already made a complaint?
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                    {radioOptions.map((option) => (
                        <label
                            key={option.id}
                            className={`flex items-center gap-2 cursor-pointer group border rounded-[12px] px-4 py-3 w-full transition-all 
                                ${complaintMade === option.id ? "border-[#2563EB] bg-[#DBEAFE]" : "border-[#DBEAFE] bg-white"}`}
                        >
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="radio"
                                    name="complaint"
                                    value={option.id}
                                    checked={complaintMade === option.id}
                                    onChange={(e) => {
                                        setComplaintMade(e.target.value);
                                        setErrors((prev) => ({ ...prev, complaintMade: "" }));
                                    }}
                                    className="sr-only "
                                />
                                <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center
                                    ${complaintMade === option.id ? "border-[#2563EB] bg-white" : "border-[#64748B] bg-[#DBEAFE]"}`}>
                                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${complaintMade === option.id ? "bg-[#2563EB]" : "bg-[#64748B]"}`} />
                                </div>
                            </div>
                            <span className="text-[#64748B] text-sm font-medium">{option.label}</span>
                        </label>
                    ))}
                </div>
                {errors.complaintMade && (
                    <p className="text-red-500 text-xs mt-1">{errors.complaintMade}</p>
                )}
            </div>

            {/* Complaint status (if applicable) */}
            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    Complaint status (if applicable)
                </label>
                <textarea
                    value={complaintStatus}
                    onChange={(e) => setComplaintStatus(e.target.value)}
                    placeholder="Current stage, responses received, or deadlines given."
                    className="w-full px-4 py-3 border border-[#DBEAFE] rounded-[12px] outline-none text-[#64748B] bg-white min-h-[100px] transition-all"
                />
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

export default StepThree;
