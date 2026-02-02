
"use client"

import React from "react";
import back from "../../../public/back.svg";
import edit from "../../../public/edit.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { useGetMyProfileQuery } from "@/store/feature/myProfileApi/myProfileApi";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { FaSpinner } from "react-icons/fa";

const ProfilePage = () => {
  const user = {
    name: "Mojahid Islam",
    email: "Mojahid@gmail.com",
    phone: "+880 1737705577",
    image: null,
  };
  const { data, isLoading } = useGetMyProfileQuery()
  const userData = data?.data
  const userName = data?.data?.fullName
  // console.log(userData)

  const firstLetter = userName?.trim().charAt(0).toUpperCase();

  const profileImage = data?.data?.normalUser?.[0]?.profile_image

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
              alt="back"
              width={12}
              height={12}
              className="w-3"
            />
            My Profile
          </Link>
        </div>
      </div>

      {
        isLoading?(
           <div className="flex items-center justify-center min-h-[40vh]">
                    <p className="animate-spin text-[#2563EB]">
                      <FaSpinner className="text-3xl" />
                    </p>
                  </div>
        ):(
          <div className="flex flex-col gap-6">
        {/* Profile Image Section */}
        <div className="flex">
          <div className="relative w-24 h-24 border border-[#DBEAFE] rounded-full flex items-center justify-center overflow-hidden bg-[#2563EB]">
            {userData?.normalUser?.[0]?.profile_image ? (
              <Image
                src={profileImage}
                alt={userData?.fullName || "Profile"}
                fill
                className="object-cover"
              />
            ) : userData?.profile_image ? (
              <Image
                src={`${getBaseUrl()}/${userData.profile_image.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={userData?.fullName || "Profile"}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-white text-4xl font-bold select-none">
                {firstLetter}
              </span>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="border border-[#DBEAFE] rounded-md py-3 px-4 w-full">
            <p className="text-lg font-semibold text-gray-900">Name</p>
            <p className="text-sm text-[#64748B]">{userData?.fullName}</p>
          </div>
          <div className="border border-[#DBEAFE] rounded-md py-3 px-4 w-full">
            <p className="text-lg font-semibold text-gray-900">Email</p>
            <p className="text-sm text-[#64748B]">{userData?.email}</p>
          </div>
        </div>

        <div>
          <div className="border border-[#DBEAFE] rounded-md py-3 px-4 w-full">
            <p className="text-lg font-semibold text-gray-900">Phone Number</p>
            <p className="text-sm text-[#64748B]">{userData?.phone}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-1 mt-2">
          <Link href="/update_profile">
            <Button
              rightIcon={
                <Image
                  src={edit}
                  alt="edit icon"
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
        )
        
      }

      
    </div>
  );
};

export default ProfilePage;
