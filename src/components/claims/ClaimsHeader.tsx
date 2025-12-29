"use client";
import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import back from '../../../public/back.svg'
import Image from "next/image";

const ClaimsHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-[#64748B]">
                <Link href="/" className="hover:text-[#2563EB] transition-colors flex items-center gap-1.5 text-sm font-medium">
                    <Image src={back} alt="clock" width={100} height={100}  className="w-3"/>
                    My Claims
                </Link>
            </div>

            <Link
                href="/post_insurance"
                className="flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-[12px] font-semibold hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-100 text-sm"
            >
                <Plus size={18} strokeWidth={3} />
                New Claim Analysis
            </Link>
        </div>
    );
};

export default ClaimsHeader;
