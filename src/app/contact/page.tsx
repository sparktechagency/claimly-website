"use client"
import Image from "next/image";
import images from "../../../public/hero 2-Photoroom.svg";
import ContactImage from "../../../public/contact_headphone.svg";
import gmail from "../../../public/call.svg";
import location from "../../../public/call (1).svg";
import { useContactUsMutation } from "@/store/feature/web/webApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [contactUs, { isLoading: isSubmitting }] = useContactUsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const res = await contactUs(data).unwrap();
      if (res.success) {
        toast.success(res.message || "Message sent successfully!");
        reset();
      } else {
        toast.error(res.message || "Failed to send message.");
      }
    } catch (error: any) {
      console.error("Contact submission error:", error);
      toast.error(error?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      {/* ===== HERO / HEADING ===== */}

      <div className="flex flex-col py-10 px-7 lg:py-20 bg-linear-to-l from-[#DBEAFE] to-[#EFF6FF] xl:flex-row justify-between items-center  gap-10 ">
        <div className="container mx-auto lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
              {/* left */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl lg:text-[40px] leading-[120%] font-semibold"> <span className="bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent"> Contact</span>{" "}<span className="text-[#2563EB]">Us</span> </h2>

                <p className="tracking-[1px] leading-[120%] text-color-secondary">
                  Have questions or feedback? We're here to help. Send us a message and our team will get back to you soon.
                </p>
              </div>

              {/* right */}
              <div className="w-">
                <Image
                  src={images}
                  alt="hro"
                  width={100}
                  height={100}
                  className="md:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ===== CONTACT CONTENT ===== */}
      <section className="container mx-auto px-6 lg:px-24 my-12 lg:my-28">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={ContactImage}
              alt="Contact illustration"
              className="w-full max-w-lg h-auto"
            />
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:p-6 md:p-8">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your name"
                  className={`w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border ${errors.name ? "border-red-500" : "border-[#DBEAFE]"} focus:border-[#bdd5f5] outline-none focus:bg-transparent transition-all`}
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Enter your email"
                  className={`w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border ${errors.email ? "border-red-500" : "border-[#DBEAFE]"} focus:border-[#bdd5f5] outline-none focus:bg-transparent transition-all`}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Enter subject"
                  className={`w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border ${errors.subject ? "border-red-500" : "border-[#DBEAFE]"} focus:border-[#bdd5f5] outline-none focus:bg-transparent transition-all`}
                />
                {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder="Write your message"
                  rows={6}
                  className={`w-full rounded-md px-4 pt-3 bg-slate-100 text-slate-900 text-sm border ${errors.message ? "border-red-500" : "border-[#DBEAFE]"} focus:border-[#bdd5f5] outline-none focus:bg-transparent transition-all resize-none`}
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-blue-400 text-white text-sm font-medium py-3 rounded-md transition-all px-20 cursor-pointer flex items-center justify-center gap-2 min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="flex md:gap-12 max-w-6xl mx-auto flex-col md:flex-row justify-center">
          <div className="border border-[#DBEAFE] rounded-md mt-10 mb-10 items-center  w-full h-full flex p-6 gap-4">
            <div>
              <Image
                src={gmail}
                alt="mission"
                width={100}
                height={100}
                className="w-10"
              />
            </div>
            <div>
              <p className="text-xl"> Contact Email </p>
              <p className="default-list-text leading-normal! text-center">
                Support@claimly.au
              </p>
            </div>
          </div>

          <div className="border border-[#DBEAFE] rounded-md mt-10 mb-10 items-center  w-full h-full flex p-6 gap-4 ">
            <div>
              <Image
                src={location}
                alt="mission"
                width={100}
                height={100}
                className="w-10"
              />
            </div>
            <div>
              <p className="text-xl">Location </p>
              <p className="default-list-text leading-normal! text-center">
                Sydney, NSW
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
