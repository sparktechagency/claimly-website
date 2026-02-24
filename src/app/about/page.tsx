import React from "react";
import images from "../../../public/hero 2-Photoroom.svg";
import aboutImages from "../../../public/about.svg";
import Image from "next/image";
import mission from "../../../public/mission.svg"
import vision from "../../../public/vission.svg"
import values from "../../../public/values.svg"

const About = () => {
  return (
    <div>
     <div className="flex flex-col py-10 px-7 lg:py-20 bg-linear-to-l from-[#DBEAFE] to-[#EFF6FF] outline-[1px] outline-[#0000001A] xl:flex-row justify-between items-center  gap-10 ">
       <div className="container mx-auto ">
          <div className="container mx-auto lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
            {/* left */}
            <div className="flex flex-col gap-4">
               <h2 className="text-3xl lg:text-[40px] leading-[120%] font-semibold">
              <span className="bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent">
                About 
              </span>{" "}
              <span className="text-[#2563EB]">Claimly</span>
            </h2>
              <p className="tracking-[1px] leading-[120%] text-color-secondary">
                Helping everyday policyholders understand their insurance claim
                before deciding what to do next.
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

      <div className="container mx-auto ">
         {/* content */}
      <div className="container mx-auto px-8 py-10 md:py-28">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 md:gap-24">
          {/* left */}
          <div>
            <Image
              src={aboutImages}
              alt="about image"
              width={600}
              height={400}
              className="w-full lg:w-[450px]"
            />
          </div>

          {/* right  */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4 md:gap-7">
            <div>
              <h2 className="text-2xl lg:text-[40px] leading-[120%] font-semibold">
                When an insurance <span className="text-brand"> claim</span>  feels unclear, knowing where you stand matters. 
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="default-list-text leading-normal!">
               Claimly has been created by Australians for Australians with over 10 years’ combined experience in the insurance industry, across claims handling, internal dispute resolution, and external disputes through AFCA. We understand how insurers assess claims, what evidence they rely on, and where misunderstandings commonly arise.
              </p>
              <p className="default-list-text leading-normal!">Claimly helps you make sense of your situation by turning your documents and answers into a clear, plain-English report explaining how a claim may be viewed, what factors usually matter, and what options are commonly available next.</p>
              <p className="default-list-text leading-normal!">Claimly provides general information only - not legal or financial advice.</p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom content */}

      <div className="px-8 mt-10 mb-10 lg:mb-28">
         <div className="flex flex-col gap-5 items-center justify-center">
              <h2 className="text-2xl lg:text-[40px] leading-[120%] font-semibold"><span className="text-brand"> Mission</span>, Vision & Values 
              </h2>
              <p className="default-list-text leading-normal! text-center">When claims stay organised, the process becomes faster and stress-free.</p>
            </div>

            {/* boxx */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 mb-28">
                {/* first */}
            <div className="border border-[#DCFCE7] rounded-md px-6 lg:px-12 flex flex-col gap-2 mt-10 mb-10 items-center justify-center bg-white w-full h-full">
                <Image
                src={mission}
                alt="mission"
                width={100}
                height={100}
                className="w-10"
                />
                <p className="text-xl"> Our Mission </p>
                 <p className="default-list-text leading-normal! text-center">When claims stay organized, the process becomes faster and stress-free.</p>
            </div>
            {/* first */}
            <div className="border border-[#FEE2E2] rounded-md px-6 lg:px-12 flex flex-col gap-2 mt-10 mb-10 items-center justify-center bg-white h-full">
                <Image
                src={vision}
                alt="vision"
                width={100}
                height={100}
                className="w-10"
                />
                <p className="text-xl"> Our Vision </p>
                 <p className="default-list-text leading-normal! text-center">To become Australia's most trusted independent claim review service - helping people understand their position before making important decisions.</p>
            </div>
            {/* first */}
            <div className="border border-[#FEF9C3] rounded-md px-6 lg:px-12 flex flex-col gap-2 mt-10 mb-10 items-center justify-center bg-white h-full">
                <Image
                src={values}
                alt="values"
                width={100}
                height={100}
                className="w-10"
                />
                <p className="text-xl"> Our Values </p>
                 <p className="default-list-text leading-normal! text-center">Clarity, independence, and realism. We believe people deserve to understand where they stand.</p>
            </div>
          </div>
      </div>

       


      </div>
    </div>
  );
};

export default About;
