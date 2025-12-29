import Image from "next/image";
import Link from "next/link";
import backIcon from "../../../public/back.svg";
import lock from "../../../public/Group (12).svg";
import cross from "../../../public/Frame (10).svg";
import arrow from "../../../public/Vector 87.svg";
import redarrow from "../../../public/Vector 87 (1).svg";

const page = () => {
  return (
    <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-28">
      <div>
        <Link href="/">
          <div className="mb-10">
            <Link
              href="/my_profile"
              className="flex items-center gap-2 text-[#64748B] hover:text-[#2563EB] transition-colors mb-4 group"
            >
              <Image
                src={backIcon}
                alt="back"
                width={12}
                height={12}
                className="w-3"
              />
              <span className="text-sm font-medium hover:underline">
                Account Setting
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {/* change pass */}
            <div className="bg-linear-to-l from-[#DBEAFE]/20 to-[#DBEAFE] flex items-center gap-3 py-6 px-6 rounded-xl border-[#DBEAFE] justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <Image
                    src={lock}
                    alt="lock"
                    width={100}
                    height={100}
                    className="w-6"
                  />
                </div>
                <div>
                  <p className="text-xl text-[#64748B]">Change password </p>
                </div>
              </div>

              <div>
                <Image
                  src={arrow}
                  alt="back"
                  width={12}
                  height={12}
                  className="w-3"
                />
              </div>
            </div>
            {/* delete */}
            <div className="bg-linear-to-l from-[#FBCFE8]/20 to-[#FBCFE8]/80 flex items-center gap-3 py-6 px-6 rounded-xl border-[#DBEAFE] justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <Image
                    src={cross}
                    alt="lock"
                    width={100}
                    height={100}
                    className="w-6"
                  />
                </div>
                <div>
                  <p className="text-xl text-[#ef4444]">Delete account  </p>
                </div>
              </div>

              <div>
                <Image
                  src={redarrow}
                  alt="back"
                  width={12}
                  height={12}
                  className="w-3"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
