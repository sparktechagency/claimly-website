"use client";
import React from "react";
import Image from "next/image";
import { Download, Loader2 } from "lucide-react";
import clock from "../../../public/clock.svg";
import calander from "../../../public/calendar.svg";
import block from "../../../public/block.svg";
import deleteinfo from "../../../public/deleteinfo.svg";

export type ClaimStatus = "UNDER_REVIEW" | "REPORT_READY" | "FAILED";

interface ClaimCardProps {
    status: ClaimStatus;
    name: string;
    title: string;
    insurer: string;
    date: string;
    failureNote?: string;
    avatarUrl: string | null;
    reportUrl?: string | null;
}

const ClaimCard: React.FC<ClaimCardProps> = ({
    status,
    name,
    title,
    insurer,
    date,
    failureNote,
    avatarUrl,
    reportUrl,
}) => {
    const [downloading, setDownloading] = React.useState(false);

    const handleDownload = () => {
        if (!reportUrl) return;

        const domain = 'http://13.237.138.182:5000';
        const fullUrl = reportUrl.startsWith('http')
            ? reportUrl
            : `${domain}/${reportUrl.replace(/\\/g, '/')}`;

        // Create a temporary link and trigger a click
        // Using this method instead of fetch to avoid CORS issues with Cloudfront/S3
        const link = document.createElement('a');
        link.href = fullUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        // The 'download' attribute might be ignored for cross-origin URLs without
        // specific headers, but it remains the best practice for suggesting a download.
        const fileName = reportUrl.split(/[\\/]/).pop() || 'report.pdf';
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isUnderReview = status === "UNDER_REVIEW";
    const isReportReady = status === "REPORT_READY";
    const isFailed = status === "FAILED";

    const renderAvater = (name: string) => {
        return (
            <div className="flex items-center justify-center w-full h-full bg-[#2563EB] text-white font-semibold">{name?.charAt(0)?.toLocaleUpperCase()}</div>
        )
    };

    return (
        <div className="bg-white rounded-[16px] border border-[#DBEAFE] p-5  transition-shadow flex flex-col h-full">
            {/* Header: Avatar & Status Tag */}
            <div className="flex justify-between items-start mb-4">
                <div className="rounded-full overflow-hidden border border-[#2563EB]/80 h-11 w-11 flex-shrink-0">
                    {!avatarUrl ? (
                        renderAvater(name)
                    ) : (
                        <Image
                            src={avatarUrl}
                            alt={name}
                            width={44}
                            height={44}
                            className="object-cover rounded-full h-full w-full"
                        />
                    )}
                </div>

                {/* Status Badge */}
                <div
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md border font-medium text-[11px] font-md uppercase
                    ${isUnderReview
                            ? "bg-[#FFFBEB] border-[#F59E0B] text-[#F59E0B]"
                            : ""
                        }
                    ${isReportReady
                            ? "bg-[#F0FDF4] border-[#22C55E] text-[#16A34A]"
                            : ""
                        }
                    ${isFailed
                            ? "bg-[#FEF2F2] border-[#EF4444] text-[#DC2626]"
                            : ""
                        }
                `}
                >
                    {isUnderReview && (
                        <Image
                            src={clock}
                            alt="clock"
                            width={100}
                            height={100}
                            className="w-3"
                        />
                    )}
                    {isReportReady && (
                        <Image
                            src={calander}
                            alt="clock"
                            width={100}
                            height={100}
                            className="w-3"
                        />
                    )}
                    {isFailed && (
                        <Image
                            src={block}
                            alt="clock"
                            width={100}
                            height={100}
                            className="w-3"
                        />
                    )}
                    {status?.replace("-", " ")}
                </div>
            </div>

            {/* Content */}
            <div className="mb-6 flex-grow">
                <p className="text-[#222831] text-[14px] mb-1">{name}</p>
                <h3 className="text-black text-[16px] font-bold leading-snug mb-3">
                    {title?.replace(/_/g, " ")}
                </h3>
                <div className="flex">
                    <div className=" px-4 py-1.5 rounded-[6px] border border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold uppercase flex items-center justify-center">
                        {insurer}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className={`mt-auto pt-4 border-t border-[#F1F5F9] flex justify-between items-end
                ${isFailed ? "flex-col items-stretch gap-4" : ""}
            `}
            >
                <div className="flex flex-col">
                    <span className="text-black text-[13px] font-bold  mb-0.5">
                        Submitted On
                    </span>
                    <span className="text-[#64748B] text-xs font-semibold">{date}</span>
                </div>

                {!isFailed && (
                    <button
                        onClick={handleDownload}
                        disabled={isUnderReview || downloading || (isReportReady && !reportUrl)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-xs font-bold transition-all
                            ${isReportReady && reportUrl
                                ? "bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-sm shadow-blue-100"
                                : "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
                            }
                            ${downloading ? "opacity-70" : ""}
                        `}
                    >
                        {downloading ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Download size={14} />
                        )}
                        {downloading ? "Downloading..." : "Download"}
                    </button>
                )}
            </div>

            {/* Failed Warning Box */}
            {isFailed && failureNote && (
                <div className="mt-4 p-4 bg-[#FFF1F2] flex gap-3 items-start shadow-sm transition-all hover:shadow-md border border-[#E11D48] rounded-lg">
                    <div className="">
                        <Image
                            src={deleteinfo}
                            alt="error"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                    </div>
                    <div className="flex flex-col gap-1">

                        <p className="text-[#E11D48] text-[12px] leading-relaxed font-medium">
                            {failureNote}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClaimCard;
