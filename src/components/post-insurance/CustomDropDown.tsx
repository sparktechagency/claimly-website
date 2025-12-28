"use client";
import React, { useState, useRef, useEffect } from "react";

interface CustomDropDownProps {
    label: string;
    options: string[];
    selected: string;
    onSelect: (val: string) => void;
    error?: boolean;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({ label, options, selected, onSelect, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <label className="block text-[#1E293B] text-sm font-medium mb-1 ">{label}</label>
            <div className="relative" ref={dropdownRef}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex justify-between items-center border ${error ? "border-red-500" : "border-[#DBEAFE]"} w-full rounded-[12px] px-4 py-3 bg-white text-[#64748B] cursor-pointer outline-none`}
                >
                    <span className="">{selected || "Select One"}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full bg-white border border-[#DBEAFE] rounded-[12px] shadow-lg overflow-hidden">
                        {options.map((name) => (
                            <div
                                key={name}
                                onClick={() => {
                                    onSelect(name);
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 text-[#64748B] hover:bg-[#DBEAFE] hover:text-[#1E293B] cursor-pointer transition-colors"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomDropDown;
