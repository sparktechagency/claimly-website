import React from "react";
import { ListIcon } from "../icons-svg/customIcons";
import Image from "next/image";
import logofirst from "../../../public/aami.svg";
import logosecond from "../../../public/allianz.svg";
import logothird from "../../../public/youi.svg";
import logofourth from "../../../public/budget.svg";
import logofifth from "../../../public/qbe.svg";
import logosixth from "../../../public/nrma-insurance-logo-brandlogos.net_lenuv62fu.svg";

const LogoSection = () => {
  return (
    <div className="container mx-auto py-10 lg:py-28">
      <div className="flex flex-col lg:flex-row p-6 lg:p-16 bg-linear-to-br from-[#DBEAFE] to-[#F9FAFB] rounded-[40px] outline-[1px] outline-[#0000001A] xl:flex-row justify-between items-center  gap-10">
        {/* left section */}
        <div className="flex flex-1 flex-col gap-4 md:gap-2.5">
          <div>
            <h2 className="text-2xl lg:text-[32px] xl:text-[40px] leading-[120%] font-semibold mb-3">
              Everyday Australians are Using{" "}
              <span className="text-brand"> Claimly</span> with insurers like
            </h2>

            {/* right section */}
            <div className="w-full flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-5 justify-center items-center md:hidden">
              <div className="py-5.5 md:py-6 px-6 lg:px-14 lg:py-8.5 xl:py-10 6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
                <Image
                  src={logosixth}
                  height={100}
                  width={100}
                  alt="AAMI"

                  className="object-cover"
                />
              </div>
              <div className="py-2 px-6 lg:px-14 lg:py-6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
                <Image
                  src={logofirst}
                  height={100}
                  width={100}
                  alt="AAMI"
                  className="object-cover"
                />
              </div>
              <div className="py-2 px-6 lg:px-14 lg:py-6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center ">
                <Image
                  src={logosecond}
                  height={100}
                  width={100}
                  alt="AAMI"
                  className="object-cover"
                />
              </div>
              <div className="py-2 px-6 lg:px-14 lg:py-6  bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
                <Image
                  src={logothird}
                  height={100}
                  width={100}
                  alt="AAMI"
                  className="object-cover"
                />
              </div>
              <div className="py-2 px-6 lg:px-14 lg:py-6  bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
                <Image
                  src={logofourth}
                  height={100}
                  width={100}
                  alt="AAMI"
                  className="object-cover"
                />
              </div>
              <div className="py-2 px-6 lg:px-14 lg:py-6  bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
                <Image
                  src={logofifth}
                  height={100}
                  width={100}
                  alt="AAMI"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
          <div className="flex flex-col gap-4">
            <p className="default-list-text">
              Claimly reviews claims across all Australian general insurers.
            </p>
            <p className="default-list-text">Our reports reference insurer obligations under the Insurance Contracts Act, the General Insurance Code of Practice, and ASIC complaint standards.</p>
          </div>
          <div>
            <ul className="mt-2.5 space-y-2.5">
              {[
                "Review of insurer decisions and correspondence",
                "Reference to relevant policy wording",
                "Consideration of applicable regulatory standards",
                "Structured complaint guidance (if appropriate)"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <ListIcon className="list-icon shrink-0 mt-0.5" />
                  <span className="default-list-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* right section */}
        <div className="w-full flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-5 justify-center items-center hidden md:grid">

          <div className="py-5.5 md:py-6 px-6 lg:px-14 lg:py-8.5 xl:py-10 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
            <Image
              src={logosixth}
              height={100}
              width={100}
              alt="AAMI"
              className="object-cover"
            />
          </div>

          <div className="py-2 px-6 lg:px-14 lg:py-6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
            <Image
              src={logofirst}
              height={100}
              width={100}
              alt="AAMI"
              className="object-cover"
            />
          </div>

          <div className="py-2 px-6 lg:px-14 lg:py-6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
            <Image
              src={logosecond}
              height={100}
              width={100}
              alt="AAMI"
              className="object-cover"
            />
          </div>

          <div className="py-2 px-6 lg:px-14 lg:py-6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
            <Image
              src={logothird}
              height={100}
              width={100}
              alt="AAMI"
              className="object-cover"
            />
          </div>

          <div className="py-2 px-6 lg:px-14 lg:py-6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
            <Image
              src={logofourth}
              height={100}
              width={100}
              alt="AAMI"
              className="object-cover"
            />
          </div>

          <div className="py-2 px-6 lg:px-14 lg:py-6 bg-white border border-[#2563EB] rounded-lg flex items-center justify-center">
            <Image
              src={logofifth}
              height={100}
              width={100}
              alt="AAMI"
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default LogoSection;
