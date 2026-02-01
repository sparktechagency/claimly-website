/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import ClaimsHeader from "@/components/claims/ClaimsHeader";
import ClaimsTabs from "@/components/claims/ClaimsTabs";
import ClaimCard, { ClaimStatus } from "@/components/claims/ClaimCard";
import { useGetMyInsurerQuery } from "@/store/feature/insurerapi/insurerapi";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { FaSpinner } from "react-icons/fa";

const MyClaimsPage = () => {
  const [activeTab, setActiveTab] = useState<ClaimStatus>("UNDER_REVIEW");
  const { data, isLoading, error, isFetching } = useGetMyInsurerQuery(activeTab);
  const myInsurer = data?.data || [];

  console.log("myInsurer", myInsurer)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 lg:px-24 my-12 lg:my-28">
        <ClaimsHeader />

        <div className="">
          <ClaimsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {isLoading || isFetching ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <p className="animate-spin text-[#2563EB]">
                <FaSpinner className="text-3xl" />
              </p>
            </div>
          ) : myInsurer.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myInsurer.map((claim: any) => {
                // Get profile_image from normalUserId
                const profileImg = claim?.normalUserId?.profile_image;
                const avatarUrl = profileImg
                  ? `${getBaseUrl()}/${profileImg.replace(/\\/g, "/")}`
                  : null;

                return (
                  <ClaimCard
                    key={claim.id}
                    status={activeTab}
                    name={claim?.normalUserId?.fullName || "User"}
                    title={claim?.policyType || "No Policy Type"}
                    insurer={claim?.insurerName || "Insurer"}
                    date={claim?.createdAt ? new Date(claim.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }) : ""}
                    avatarUrl={avatarUrl}
                    reportUrl={claim?.report_Document?.[0]}
                    failureNote={claim?.failureNote}
                  />
                );
              })}
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