"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import chkimage from "../../../public/check.svg";
import StepOne from "@/components/post-insurance/StepOne";
import StepTwo from "@/components/post-insurance/StepTwo";
import StepThree from "@/components/post-insurance/StepThree";
import StepFour from "@/components/post-insurance/StepFour";
import { usePostInsurerMutation } from "@/store/feature/insurerapi/insurerapi";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

export type InsuranceFormInputs = {
  insurerName: string;
  policyType: string;
  incidentDate: string;
  firstNotifiedDate: string;
  incidentDescription: string;
  insurerResponse: string;
  userConcern: string;
  complaintMade: string;
  complaintStatus: string;
  supporting_Documents: FileList | null;
};

const PostInsurance = () => {
  const [postInsurer, { isSuccess, isLoading, error }] = usePostInsurerMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const methods = useForm<InsuranceFormInputs>({
    defaultValues: {
      insurerName: "",
      policyType: "",
      incidentDate: "",
      firstNotifiedDate: "",
      incidentDescription: "",
      insurerResponse: "",
      userConcern: "",
      complaintMade: "",
      complaintStatus: "",
      supporting_Documents: null,
    },
  });

  const handleNext = () => currentPage < 4 && setCurrentPage((p) => p + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  const onSubmit: SubmitHandler<InsuranceFormInputs> = async (data) => {
    try {
      const formData = new FormData();

      // Add text fields
      formData.append("insurerName", data.insurerName);
      formData.append("policyType", data.policyType);

      // Convert dates to ISO datetime format
      formData.append("incidentDate", new Date(data.incidentDate).toISOString());
      formData.append("firstNotifiedDate", new Date(data.firstNotifiedDate).toISOString());

      formData.append("incidentDescription", data.incidentDescription);
      formData.append("insurerResponse", data.insurerResponse);
      formData.append("userConcern", data.userConcern);
      formData.append("complaintMade", data.complaintMade);
      formData.append("complaintStatus", data.complaintStatus);

      // Add files
      if (data.supporting_Documents && data.supporting_Documents.length > 0) {
        Array.from(data.supporting_Documents).forEach((file) => {
          formData.append("supporting_Documents", file);
        });
      }

      const result = await postInsurer(formData).unwrap();
      console.log("Success:", result);
      toast.success(result.message || "Insurance record created successfully!");
      methods.reset();
      setCurrentPage(1);
    } catch (err: any) {
      console.error("Submission error:", err);

      let errorMessage = "Failed to submit insurance form";
      let errorDetails = "";

      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      if (err?.data?.error) {
        errorDetails = JSON.stringify(err.data.error, null, 2);
      } else if (err?.error) {
        errorDetails = JSON.stringify(err.error, null, 2);
      }

      toast.error(errorMessage, {
        description: errorDetails
      });
     
    }
  };

  const renderItem = (step: number) => {
    switch (step) {
      case 1:
        return <StepOne onNext={handleNext} />;
      case 2:
        return <StepTwo onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <StepThree onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <StepFour onPrev={handlePrev} onSubmit={methods.handleSubmit(onSubmit)} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-28 flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Timeline Sidebar */}
        <div className="relative flex lg:flex-col items-center lg:items-start h-auto lg:h-[400px] w-full lg:w-fit overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
          <div className="hidden lg:block absolute left-[13px] top-0 h-full w-[2px] bg-[#64748B]" />
          <div className="flex lg:flex-col justify-between items-center lg:items-start w-full lg:h-full gap-8 z-10 shrink-0">
            {Array.from({ length: 4 }).map((_, i) => {
              const step = i + 1;
              return (
                <div key={i} className="flex-shrink-0">
                  {currentPage === step && (
                    <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[#2563EB] bg-[#DBEAFE]">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#2563EB]" />
                    </div>
                  )}
                  {currentPage > step && (
                    <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[#2563EB] bg-[#DBEAFE]">
                      <Image src={chkimage} alt="check" width={16} height={16} />
                    </div>
                  )}
                  {currentPage < step && (
                    <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[#64748B] bg-white">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#64748B]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Content Area */}
        <div className="flex-1 w-full">{renderItem(currentPage)}</div>
      </div>
    </FormProvider>
  );
};
export default PostInsurance;
