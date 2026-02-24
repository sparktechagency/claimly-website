import React from "react";
import Button from "../shared/Button";
import HeroImage from "../../../public/Image group 1.png";
import Image from "next/image";
import { InfoIcon } from "../icons-svg/customIcons";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="container mx-auto  py-5 lg:py-16">
      {/* Hero Section */}
      <div className="lg:flex justify-between items-center mx-auto gap-12 xl:gap-20">
        {/* Left side */}
        <div className="flex flex-col flex-1 gap-2 md:gap-8">

          <div className="flex py-1.5 px-4 gap-2.5 items-center border border-[#2563EB] bg-[#2563EB0D] rounded-full w-fit mb-2 md:mb-6">
            <div className="w-4 ">
              <div className="w-3 h-3 bg-[#22C55E] rounded-full "></div>
            </div>
            <p className="tracking-[1px] leading-[120%] text-black">
             Start for free
            </p>
          </div>
          <div className="flex flex-col gap-6 md:gap-9 ">
            <h1 className="font-semibold text-3xl md:text-[44px] leading-[120%]">
              Understand your{" "}
              <span className="text-brand">insurance claim </span> before you
              accept or complain.
            </h1>
            <div className="flex flex-col gap-4">
              <p className="default-text leading-normal!">
                Fill out a short form, upload your documents and Claimly will provide you with a plain-English report on how your insurer may view your claim, what information usually matters most, and how similar situations may typically be treated.
              </p>
              <p className="default-text">
                Prepared and delivered within 24 to 48 hours.
              </p>
            </div>

            <div>
              <Link href='/post_insurance'>
                <Button variant="primary" size="lg" className="font-medium">
                  Analyse My Claim
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <InfoIcon fill="var(--secondary_text)" width={14} height={14} />
              <p className="default-text">
                General information only - not legal or financial advice.
              </p>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <Image
            src={HeroImage}
            alt="Hero Image"
            priority
            className="w-full h-auto max-w-[480px] lg:max-w-[500px] xl:max-w-[550px] transition-transform duration-700 ease-in-out hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
