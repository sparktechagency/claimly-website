/* eslint-disable react/no-unescaped-entities */

import loginImage from "../../../../public/verify_email.svg";
import Image from "next/image";
import Link from "next/link";


const Page: React.FC = () => {


  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="flex items-center gap-8">
        {/* Left Image */}
        <div className="w-full hidden lg:block">
          <Image
            priority
            src={loginImage}
            alt="login-image"
            width={100}
            height={100}
            className="w-full scale-110"
          />
        </div>

        {/* Right Form */}
        <div className="w-full p-8 max-w-lg mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#222831]/80 text-3xl">Verify Your Email</h1>
            <p className="text-[#64748B] text-sm">
              We will send you a a 6-digit code to your email
            </p>
          </div>

          <form>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="est********************ail.com"
                  className="w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <Link href="/verify_otp">
              <button
                type="submit"
                className="w-full mt-8 py-3 rounded-md bg-[#2563EB]/80 hover:bg-[#2563EB] text-white text-sm font-medium transition"
              >
                Continue
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
