// import React from "react";
// import leftSideImage from "../../../public/leftside_image.svg";
// import Image from "next/image";
// import { InfoIcon, ListIcon } from "../icons-svg/customIcons";
// import imgg from "../../../public/maximize-circle.svg"
// const WhoHelp = () => {
//   return (
//     <div className="mt-10 md:mt-28">
//       <div className="py-2 lg:py-32">
//         <div className=" border-2 border-blue-800 flex  flex-row lg items-center justify-center gap-10 lg:gap-10">
//           {/* leftt side */}
//           <div className=" border-2 border-blue-800 h-full flex w-full basis-1/2 items-center justify-center px-4 md:px-0 mb-10 md:mb-0">
//             <Image
//               src={leftSideImage}
//               width={100}
//               height={100}
//               alt="left-side-image"
//               className=" w-full h-full "
//             />
//           </div>
//           {/* right side */}
//           <div className="basis-1/2 flex flex-col gap-4 md:gap-2 lg:gap-3">
//             <div>
//               <h2 className="text-2xl lg:text-[40px] leading-[120%] font-semibold">
//                 Who we <span className="text-brand"> help</span>
//               </h2>
//             </div>
//             <div className="flex flex-col gap-4">
//               <p className="default-list-text leading-normal!">
//                 Claimly is for people who feel stuck, unsure, or worn down by an
//                 insurance claim. If you’re not sure whether an offer is fair, a
//                 decision makes sense, or things just aren’t moving, Claimly
//                 helps you understand where you stand before you decide what to
//                 do next.
//               </p>
//               <p className="default-list-text">Your report may include:</p>
//             </div>
//             <div>
//               <ul className="mt-2.5 space-y-2.5">
//                 {[
//                   "Disputes about repairs versus write-off decisions",
//                   "Disagreements about market value or settlement amounts",
//                   "Questions around pre-existing damage or non-disclosure",
//                   "Claims that feel stalled, delayed, or stuck in review",
//                   "Situations where you’re considering a complaint but aren’t sure it’s worth it",
//                 ].map((item, index) => (
//                   <li key={index} className="flex items-center  gap-2.5">
//                     {/* <ListIcon className="list-icon shrink-0 mt-0.5" /> */}
//                     <Image src={imgg} width={100} height={100} alt="af" className="w-3"/>
//                     <span className="default-list-text">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="flex gap-1 ">
//               <InfoIcon fill="var(--secondary_text)" width={14} height={14} />
//               <p className="default-text ">
//                 If your situation is urgent, involves serious injury, or
//                 significant financial loss, you should seek independent legal
//                 advice.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhoHelp;


import React from "react";
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
                Who we <span className="text-brand">help</span>
              </h2>

              <p className="default-list-text leading-relaxed">
                Claimly is for people who feel stuck, unsure, or worn down by an
                insurance claim. If you’re not sure whether an offer is fair, a
                decision makes sense, or things just aren’t moving, Claimly helps
                you understand where you stand before you decide what to do
                next.
              </p>

              <p className="default-list-text font-medium">
                What we help with:
              </p>

              <ul className="space-y-3">
                {[
                  'Liability in dispute',
                  "Disputes about repairs versus write-off decisions",
                  "Disagreements about market value or settlement amounts",
                  "Questions around pre-existing damage or non-disclosure",
                  "Claims that feel stalled, delayed, or stuck in review",
                  "Situations where you’re considering a complaint but aren’t sure it’s worth it",
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
