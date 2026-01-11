/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import ClaimsHeader from "@/components/claims/ClaimsHeader";
import ClaimsTabs from "@/components/claims/ClaimsTabs";
import ClaimCard, { ClaimStatus } from "@/components/claims/ClaimCard";
import { useGetMyInsurerQuery } from "@/store/feature/insurerapi/insurerapi";

// Dummy Data matching Figma screenshots
const DUMMY_CLAIMS = [
  {
    id: "1",
    status: "under-review" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    avatarUrl: null
  },
  {
    id: "2",
    status: "under-review" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    avatarUrl: "/man.png"
  },
  {
    id: "3",
    status: "under-review" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    avatarUrl: "/man.png"
  },
  {
    id: "4",
    status: "report-ready" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    avatarUrl: "/man.png"
  },
  {
    id: "5",
    status: "report-ready" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    avatarUrl: "/man.png"
  },
  {
    id: "6",
    status: "report-ready" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    avatarUrl: "/man.png"
  },
  {
    id: "7",
    status: "failed" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    failedReason: "The documents provided don't clearly relate to the claim decision.",
    avatarUrl: "/man.png"
  },
  {
    id: "8",
    status: "failed" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    failedReason: "This claim falls outside the scope of what we can currently assess.",
    avatarUrl: "/man.png"
  },
  {
    id: "9",
    status: "failed" as ClaimStatus,
    name: "Omar Iqbal",
    title: "Motor insurance claim",
    insurer: "NRMA",
    date: "12 March 2025",
    failedReason: "Key policy documents were missing, so we couldn't complete a review.",
    avatarUrl: "/man.png"
  },
];

const MyClaimsPage = () => {
  const [activeTab, setActiveTab] = useState<ClaimStatus>("under-review");
  const { data: myensurer, isLoading } = useGetMyInsurerQuery(activeTab)
  console.log("getMyInsurer", myensurer)

  const filteredClaims = DUMMY_CLAIMS.filter(claim => claim.status === activeTab);



  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-6 lg:px-24 my-12 lg:my-28">
        <ClaimsHeader />

        <div className="">
          <ClaimsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {filteredClaims.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClaims.map((claim) => (
                <ClaimCard key={claim.id} {...claim} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.8511 3 13.1055 3.10536 13.293 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.14893 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1E293B] mb-1">No claims found</h3>
              <p className="text-[#64748B] text-sm max-w-xs">
                There are currently no claims with this status.
                Click "New Claim Analysis" to start a new report.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyClaimsPage;