"use client";

import { useState } from "react";
import images from "../../../public/hero 2-Photoroom.svg";
import Image from "next/image";
import { useGetFaqQuery } from "@/store/feature/web/webApi";
import { FaSpinner } from "react-icons/fa";
import noFaqImage from "../../../public/Group (1).png";

interface FAQItem {
  question: string;
  answer: string;
}


const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };
  const { data, isLoading } = useGetFaqQuery()
  console.log("faq", data?.data)
  const faqData = data?.data
  return (
    <div>
      {/* heading */}
      <div className="flex flex-col py-10 px-7 lg:py-20  bg-linear-to-l from-[#DBEAFE] to-[#EFF6FF] outline-[1px] outline-[#0000001A] xl:flex-row justify-between items-center  gap-10 ">
        <div className="container mx-auto  lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
              {/* left */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl lg:text-[40px] leading-[120%] font-semibold">
                  <span className="bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent">
                    FA
                  </span>
                  <span className="text-[#2563EB]">Q</span>
                </h2>

                <p className="tracking-[1px] leading-[120%] text-color-secondary">
                  Find quick answers about account setup, claim submissions,
                  uploads, and PDF reports.
                </p>
              </div>

              {/* right */}
              <div className="w-">
                <Image
                  src={images}
                  alt="hro"
                  width={100}
                  height={100}
                  className="md:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-28">
        {/* FAQ List */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <p className="animate-spin text-[#2563EB]">
              <FaSpinner className="text-3xl" />
            </p>
          </div>
        ) : faqData && faqData.length > 0 ? (
          <div className="divide-y divide-gray-300">
            {faqData.map((item: any, index: any) => {
              const isOpen = activeIndex === index;

              return (
                <div key={index}>
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full flex items-center gap-4 py-6 text-left font-medium transition-colors
                  ${isOpen
                        ? "text-blue-700"
                        : "text-slate-900 hover:text-blue-700"
                      }
                `}
                  >
                    <span className="flex-1 text-base md:text-[24px] leading-[140%]">
                      {item.question}
                    </span>

                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-[14px] h-[14px] fill-current shrink-0"
                    >
                      {/* minus */}
                      <path d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z" />

                      {/* plus */}
                      {!isOpen && (
                        <path d="M215.579 40.421C215.579 18.132 233.711 0 256 0s40.421 18.132 40.421 40.421v431.158C296.421 493.868 278.289 512 256 512s-40.421-18.132-40.421-40.421V40.421z" />
                      )}
                    </svg>
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "max-h-[500px] pb-6" : "max-h-0"}
                `}
                  >
                    <p className="text-[15px] md:text-base text-slate-600 leading-relaxed!">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-[#DBEAFE] rounded-xl bg-[#F8FAFC]">
            <div className="w-20 h-20 bg-[#EFF6FF] rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Image
                src={noFaqImage}
                alt="No FAQ"
                width={40}
                height={40}
                className="opacity-80"
              />
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">No Questions Found</h3>
            <p className="text-[#64748B] text-sm max-w-sm">
              We couldn't find any frequently asked questions at the moment. Please check back later or contact our support team.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Faq;
