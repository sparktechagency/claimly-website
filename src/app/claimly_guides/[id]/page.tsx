"use client";
import PageHero from "@/components/shared/PageHero";
import arrwoleft from "../../../../public/arrowleft.svg";
import Image from "next/image";
import Understand from "@/components/Home/Understand";
import { useParams } from "next/navigation";
import { useGetClaimlyGuideByIdQuery } from "@/store/feature/claimlyGuides/claimlyGuidesApi";
import { FaSpinner } from "react-icons/fa";
import DOMPurify from "dompurify";
import Link from "next/link";

const ClaimlyDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClaimlyGuideByIdQuery(id as string);

  const guide = data?.data;

  // Sanitize HTML (Security purpose)
  const sanitizedDetails = guide?.details
    ? DOMPurify.sanitize(guide.details)
    : "";

  return (
    <div>
      <PageHero />

      <div className="container mx-auto px-6">
        <div className="py-10 md:py-28">
          {/* top title */}
          <Link href="/claimly_guides" className="flex py-1.5 px-4 gap-2.5 items-center border border-[#2563EB] bg-[#2563EB0D] rounded-full w-fit mb-2 md:mb-6">
            <div className="w-4">
              <Image src={arrwoleft} height={100} width={100} alt="arrowleft" />
            </div>
            <p className="tracking-[1px] leading-[120%] text-[#2563EB]">
              Claimly Guides
            </p>
          </Link>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <FaSpinner className="text-3xl text-[#2563EB] animate-spin" />
            </div>
          ) : isError ? (
            <div className="text-center text-red-500">
              Failed to load guide.
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              <h2 className="text-2xl font-bold md:text-3xl leading-[1.5]">
                {guide?.title}
              </h2>

              {/* Rich Text Render */}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedDetails }}
              />
            </div>
          )}

          <div className="mt-10">
            <Understand />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimlyDetails;