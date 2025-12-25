import React from "react";
import Button from "../shared/Button";
import HeroImage from "../../../public/hero_imge.png";
import Image from "next/image";
import { InfoIcon } from "../icons-svg/customIcons";

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="lg:flex justify-around items-center mx-auto">
        {/* Left side */}
        <div className="flex flex-col flex-1 gap-2 md:gap-8">
          {/* top title */}
          <div className="flex py-1.5 px-4 gap-2.5 items-center border border-[#2563EB] bg-[#2563EB0D] rounded-full w-fit mb-2 md:mb-6">
            <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full"></div>
            <p className="tracking-[1px] leading-[120%]">
              Free during early access
            </p>
          </div>

          <div className="flex flex-col gap-6 md:gap-9 ">
            <h1 className="font-bold text-3xl md:text-[44px] leading-[120%]">
              Understand your{" "}
              <span className="text-brand">insurance claim </span> before you
              accept or complain.
            </h1>
            <div className="flex flex-col gap-4">
              <p className="default-text">
                Fill out a short form, upload your documents and Claimly will
                provide you with a plain-English report on how your insurer may
                view your claim, what information usually matters most, and how
                similar situations may typically be treated. Prepared and
                delivered within 24 to 48 hours.
              </p>
              <p className="default-text">
                Prepared and delivered within 24 to 48 hours.
              </p>
            </div>

            <div>
              <Button variant="primary" size="lg" className="font-medium">
                Analyse My Claim
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <InfoIcon fill="var(--secondary_text)" width={14} height={14} />
              <p className="default-text">
                Prepared and delivered within 24 to 48 hours.
              </p>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex-1 flex items-end justify-end">
          <Image src={HeroImage} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
