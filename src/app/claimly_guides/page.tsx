"use client"
import Button from "@/components/shared/Button";
import images from "../../../public/hero 2-Photoroom.svg";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { useGetClaimlyGuidesQuery } from "@/store/feature/claimlyGuides/claimlyGuidesApi";



const ClaimlyGuides = () => {

  const { data, isLoading, error } = useGetClaimlyGuidesQuery();

  console.log("claimlyguides", data?.data)
  const guidesData = data?.data || [];

  return (
    <div>
      {/* Hero */}
      <div className="flex flex-col py-10 px-7 lg:py-20 bg-linear-to-l from-[#DBEAFE] to-[#EFF6FF] outline-[1px] outline-[#0000001A] xl:flex-row justify-between items-center  gap-10 ">
        <div className="container mx-auto ">
          <div className="container mx-auto lg:px-8">
            <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
              {/* left */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl lg:text-[40px] leading-[120%] font-semibold">
                  <span className="bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent">
                    Claimly
                  </span>{" "}
                  <span className="text-[#2563EB]">Guides</span>
                </h2>

                <p className="tracking-[1px] leading-[120%] text-color-secondary">
                  Learn how claims and complaints actually work
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

      {/* Main content */}
      <div className="container mx-auto px-8 py-4 lg:my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 md:py-28">
          {guidesData.map((item: any) => (
            <div
              key={item._id}
              className="border border-[#2563EB] py-[44px] px-[32px] rounded-2xl bg-[#EFF6FF] flex flex-col justify-between gap-6 lg:gap-6"
            >
              <p className="text-xl lg:text-2xl font-bold">{item.title}</p>

              <Link href={`/claimly_guides/${item._id}`}>
                <Button
                  rightIcon={
                    <MdArrowOutward className="text-xl" />
                  }
                  variant="outline"
                  size="lg"
                  className="font-medium"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimlyGuides;
