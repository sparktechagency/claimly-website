"use client";
import React from "react";
import Image from "next/image";
import { Download, AlertCircle, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import clock from "../../../public/clock.svg"
import calander from "../../../public/calendar.svg"
import block from "../../../public/block.svg"
import deleteinfo from "../../../public/deleteinfo.svg"

export type ClaimStatus = "under-review" | "report-ready" | "failed";

interface ClaimCardProps {
    status: ClaimStatus;
    name: string;
    title: string;
    insurer: string;
    date: string;
    failedReason?: string;
    avatarUrl: string;
}

const ClaimCard: React.FC<ClaimCardProps> = ({
    status,
    name,
    title,
    insurer,
    date,
    failedReason,
    avatarUrl
}) => {
    const isUnderReview = status === "under-review";
    const isReportReady = status === "report-ready";
    const isFailed = status === "failed";

    return (
        <div className="bg-white rounded-[16px] border border-[#DBEAFE] p-5  transition-shadow flex flex-col h-full">
            {/* Header: Avatar & Status Tag */}
            <div className="flex justify-between items-start mb-4">
                <div className=" rounded-md overflow-hidden border border-[#2563EB]/80 h-11 w-11">
                    <Image src={avatarUrl} alt={name} width={40} height={40} className="object-cover " />
                </div>

                {/* Status Badge */}
                <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md border font-medium text-[11px] font-md uppercase
                    ${isUnderReview ? "bg-[#FFFBEB] border-[#F59E0B] text-[#F59E0B]" : ""}
                    ${isReportReady ? "bg-[#F0FDF4] border-[#22C55E] text-[#16A34A]" : ""}
                    ${isFailed ? "bg-[#FEF2F2] border-[#EF4444] text-[#DC2626]" : ""}
                `}>
                    {isUnderReview && <Image src={clock} alt="clock" width={100} height={100}  className="w-3"/>}
                    {isReportReady && <Image src={calander} alt="clock" width={100} height={100}  className="w-3"/>}
                    {isFailed && <Image src={block} alt="clock" width={100} height={100}  className="w-3"/>}
                    {status.replace("-", " ")}
                </div>
            </div>

            {/* Content */}
            <div className="mb-6 flex-grow">
                <p className="text-[#222831] text-[18px] font-medium mb-1">{name}</p>
                <h3 className="text-black text-[28px] font-bold leading-snug mb-3">
                    {title}
                </h3>
                <div className="flex">
                     <div className=" px-4 py-1.5 rounded-[6px] border border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold uppercase flex items-center justify-center">
                    {insurer}
                </div>
                </div>
            </div>

            {/* Footer */}
            <div className={`mt-auto pt-4 border-t border-[#F1F5F9] flex justify-between items-end
                ${isFailed ? "flex-col items-stretch gap-4" : ""}
            `}>
                <div className="flex flex-col">
                    <span className="text-black text-[13px] font-bold uppercase mb-0.5">Submitted on</span>
                    <span className="text-[#64748B] text-xs font-semibold">{date}</span>
                </div>

                {!isFailed && (
                    <button
                        disabled={isUnderReview}
                        className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-xs font-bold transition-all
                            ${isReportReady
                                ? "bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-sm shadow-blue-100"
                                : "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"}
                        `}
                    >
                        <Download size={14} />
                        Download
                    </button>
                )}
            </div>

            {/* Failed Warning Box */}
            {isFailed && failedReason && (
                <div className="mt-4 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-[10px] flex gap-2.5 items-center">
                    <Image src={deleteinfo} alt="clock" width={100} height={100}  className="w-3"/>
                    <p className="text-[#DC2626] text-[11px] leading-relaxed">
                        {failedReason}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ClaimCard;
