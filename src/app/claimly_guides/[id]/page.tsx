"use client";
import PageHero from "@/components/shared/PageHero";
import arrwoleft from "../../../../public/arrowleft.svg";
import Image from "next/image";
import Understand from "@/components/Home/Understand";
import { useParams } from "next/navigation";
import { useGetClaimlyGuideByIdQuery } from "@/store/feature/claimlyGuides/claimlyGuidesApi";

const ClaimlyDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClaimlyGuideByIdQuery(id as string);

  const guide = data?.data;

  console.log("guide", guide)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (isError || !guide) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">
          Error loading guide details.
        </p>
      </div>
    );
  }

  return (
    <div>
      {" "}
      {/* Hero */}
      <PageHero />
      <div className="container mx-auto px-6">
        <div className="py-10 md:py-28 ">
          {/* top title */}
          <div className="flex py-1.5 px-4 gap-2.5 items-center border border-[#2563EB] bg-[#2563EB0D] rounded-full w-fit mb-2 md:mb-6 ">
            <div className="w-4 ">
              <Image src={arrwoleft} height={100} width={100} alt="arrowleft" />
            </div>
            <p className="tracking-[1px] leading-[120%] text-[#2563EB]">
              Claimly Guides
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            <h2 className="text-2xl font-bold md:text-3xl leading-[1.5]">
              {guide?.title}
            </h2>
            <p className="default-text leading-normal!">
              {guide?.details}
            </p>
          </div>

          <div>
            <Understand />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimlyDetails;
