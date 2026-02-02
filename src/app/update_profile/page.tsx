"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import backIcon from "../../../public/back.svg";
import photo_camera from "../../../public/photo_camera.svg";
import save from "../../../public/Vector (2).svg";

import { useRouter } from "next/navigation";
import Button from "@/components/shared/Button";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "@/store/feature/myProfileApi/myProfileApi";
import { toast } from "sonner";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: profileData } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  

  const [profileImage, setProfileImage] = useState<string>("/man.png");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileData?.data) {
      const user = profileData.data;
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      if (user.normalUser?.[0]?.profile_image) {
        setProfileImage(user.normalUser?.[0]?.profile_image);
      }
    }
  }, [profileData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("phone", formData.phone);
      if (imageFile) {
        submitData.append("profile_image", imageFile);
      }

      const res = await updateProfile(submitData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully!", {
          style: {
            backgroundColor: "#dcfce7",
            color: "#166534",
            borderLeft: "6px solid #16a34a",
          },
        });
        router.push("/my_profile");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile", {
        style: {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          borderLeft: "6px solid #dc2626",
        },
      });
    }
  };

  return (
    <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-28">
      {/* Header */}
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
            Update Profile
          </span>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          {/* Profile Image Section */}
          <div className="flex items-center gap-6">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border border-[#DBEAFE] shadow-sm relative">
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white w-6 h-6 mb-1" />
                  <span className="text-white text-[10px] font-bold uppercase">
                    Update Photo
                  </span>
                </div>
              </div>

              {/* Camera Badge (Always Visible) */}
              <div className="absolute -bottom-1 -right-1 bg-[#2563EB] p-1.5 rounded-full border-2 border-white shadow-sm shadow-blue-200 group-hover:scale-110 transition-transform w-8">
                <Image
                  src={photo_camera}
                  alt="camera"
                  width={100}
                  height={100}
                />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                name="profile_image"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="flex gap-6">
              <div className="w-full">
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full text-sm text-[#1E293B]/70 bg-white pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none transition-all"
                />
              </div>

              {/* Email Address */}
              <div className="w-full">
                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full text-sm text-[#1E293B]/70 bg-gray-50 pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] cursor-not-allowed outline-none"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+ 61 412 345 678"
                className="w-full text-sm text-[#1E293B]/70 bg-white pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex-1 ">
              <Button
                type="submit"
                disabled={isSaving}
                rightIcon={
                  <Image
                    src={save}
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
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
