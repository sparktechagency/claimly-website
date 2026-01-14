"use client"
import Image from "next/image";
import images from "../../../public/hero 2-Photoroom.svg";
import { useGetPrivacyPolicyQuery } from "@/store/feature/web/webApi";

const PrivacyPolicy = () => {


  const { data, isLoading, error } = useGetPrivacyPolicyQuery()
  console.log("data", data?.data?.description)


  return (
    <div>
      {/* ===== HERO / HEADING ===== */}

      <div className="flex flex-col py-10 px-7 lg:py-20 lg:px-24 bg-linear-to-l from-[#DBEAFE] to-[#EFF6FF] xl:flex-row justify-between items-center  gap-10 ">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
              {/* left */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl lg:text-[40px] leading-[120%] font-semibold">
                  {" "}
                  <span className="bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent">
                    {" "}
                    Privacy
                  </span>{" "}
                  <span className="text-[#2563EB]">Policy</span>{" "}
                </h2>

                <p className="tracking-[1px] leading-[120%] text-color-secondary">
                  We protect your personal and claim information with secure
                  storage and strict access controls.
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
  <div className="text-slate-700 space-y-6 text-sm lg:text-base leading-relaxed">
    <div className="space-y-3">
      {/* <h3 className="font-semibold text-slate-900">🔒 Privacy Policy</h3> */}

      <div
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{
          __html: data?.data?.description || "",
        }}
      />
    </div>
  </div>
</div>

    </div>
  );
};

export default PrivacyPolicy;
