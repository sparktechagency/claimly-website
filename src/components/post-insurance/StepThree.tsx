"use client";
import Image from "next/image";
import React from "react";
import insurer from "../../../public/insurer.svg";

interface StepProps {
    onNext: () => void;
    onPrev: () => void;
}

const StepThree: React.FC<StepProps> = ({ onNext, onPrev }) => {
    const [description, setDescription] = React.useState("");
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!description.trim()) newErrors.description = "Please tell us what your insurer said";

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
                    <p className="text-2xl font-bold text-[#1E293B]">Insurer Response & Concerns</p>
                    <p className="text-[14px] text-[#64748B]">
                        What the insurer decided and what you want to know.
                    </p>
                </div>
            </div>

            <div>
                <label className="block text-[#1E293B] text-sm font-medium mb-1">
                    What has your insurer said or decided so far?
                </label>
                <textarea
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors((prev) => ({ ...prev, description: "" }));
                    }}
                    placeholder="For example: claim declined, partial payout offered, pre-existing damage raised, delay concerns, request for more information."
                    className={`w-full px-4 py-3 border rounded-[12px] outline-none text-[#64748B] bg-white min-h-[120px] transition-all 
                        ${errors.description ? "border-red-500" : "border-[#DBEAFE]"}`}
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

export default StepThree;
