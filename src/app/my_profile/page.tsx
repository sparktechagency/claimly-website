import React from "react";
import back from "../../../public/back.svg";
import man from "../../../public/man.png";
import edit from "../../../public/edit.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button";

const page = () => {
  return (
    <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-28">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2 text-[#64748B]">
          <Link
            href="/"
            className="hover:text-[#2563EB] transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <Image
              src={back}
              alt="clock"
              width={100}
              height={100}
              className="w-3"
            />
            My Profile
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex">
          <div className="border border-[#DBEAFE] rounded-full flex items-center overflow-hidden">
            <Image
              src={man}
              alt="man"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="border border-[#DBEAFE] rounded-md py-3 px-4 w-full">
            <p className="text-xl font-medium">Name</p>
            <p className="text-sm text-[#64748B]">Mojahid Islam</p>
          </div>
          <div className="border border-[#DBEAFE] rounded-md py-3 px-4 w-full">
            <p className="text-xl font-medium">Email</p>
            <p className="text-sm text-[#64748B]">Mojahid@gmail.com</p>
          </div>
        </div>

        <div>
          <div className="border border-[#DBEAFE] rounded-md py-3 px-4 w-full">
            <p className="text-xl font-medium">Phone Number </p>
            <p className="text-sm text-[#64748B]">+880 1737705577</p>
          </div>
        </div>
        <div className="flex-1 ">
          <Link href="/my_claims">
            <Button
              rightIcon={
                <Image
                  src={edit}
                  alt="arrow icon"
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-1 w-4 h-4 ml-2.5"
                />
              }
              variant="primary"
              size="lg"
              className="font-medium"
            >
              Update Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
