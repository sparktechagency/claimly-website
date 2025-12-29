"use client";
import React from "react";
import { ClaimStatus } from "./ClaimCard";

interface ClaimsTabsProps {
    activeTab: ClaimStatus;
    onTabChange: (tab: ClaimStatus) => void;
}

const ClaimsTabs: React.FC<ClaimsTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs: { id: ClaimStatus; label: string }[] = [
        { id: "under-review", label: "Under Review" },
        { id: "report-ready", label: "Report Ready" },
        { id: "failed", label: "Failed" },
    ];

    return (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-5 py-2.5 rounded-[12px] text-sm font-semibold transition-all whitespace-nowrap
                        ${activeTab === tab.id
                            ? "bg-[#2563EB] text-white shadow-md shadow-blue-100"
                            : "bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] border border-transparent"}
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default ClaimsTabs;
