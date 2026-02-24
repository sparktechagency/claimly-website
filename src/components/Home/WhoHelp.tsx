import Image from "next/image";
import leftSideImage from "../../../public/leftside_image.svg";
import imgg from "../../../public/maximize-circle.svg";
import { InfoIcon } from "../icons-svg/customIcons";

const WhoHelp = () => {
  return (
    <section className="mt-10 md:mt-10 lg:mt-10">
      <div className="container mx-auto px-4">
        <div className="py-10 lg:py-24">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-6 ">
            
            {/* Left side image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={leftSideImage}
                  alt="Who we help illustration"
                  fill
                  className="w-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right side content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-5">
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] leading-tight font-semibold">
                How we can help <span className="text-brand">you</span>
              </h2>

              <p className="default-list-text leading-relaxed">
                Claimly is for people who feel stuck, unsure, or worn down by an
                insurance claim. If you’re not sure whether an offer is fair, a
                decision makes sense, or things just aren’t moving, Claimly helps
                you understand where you stand before you decide what to do
                next.
              </p>

              <p className="default-list-text font-medium">
                This may include, but is not limited to:
              </p>

              <ul className="space-y-3">
                {[
                  'Liability disputes',
                  "Repair vs write-off decisions",
                  "Market value or settlement disputes",
                  "Identifying policy entitlements",
                  "Non-disclosure or pre-existing damage issues",
                  "Delayed or stalled claims",
                  "Deciding whether to lodge a complaint"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Image
                      src={imgg}
                      alt="list icon"
                      width={16}
                      height={16}
                      className="mt-1 shrink-0"
                    />
                    <span className="default-list-text leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-2 pt-2">
                <InfoIcon
                  fill="var(--secondary_text)"
                  width={16}
                  height={16}
                  className="mt-0.5 shrink-0"
                />
                <p className="default-text leading-relaxed">
                  If your situation is urgent, involves serious injury, or
                  significant financial loss, you should seek independent legal
                  advice.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoHelp;
