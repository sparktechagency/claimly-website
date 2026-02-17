/* eslint-disable react/no-unescaped-entities */
"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useForgotPasswordMutation } from "@/store/feature/authApi/authApi";
import loginImage from "../../../../public/verify_email.svg";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Inputs = {
    email: string
}

const Page: React.FC = () => {

    const router = useRouter()
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
            const result = await forgotPassword(data).unwrap();
            const email = result?.data?.email
            console.log(result);

            if (result?.success) {
                localStorage.setItem("email", email);
                toast.success(result?.message || "Email sent successfully", {
                    style: {
                        backgroundColor: "#d1fae5",
                        color: "#16a34a",
                        borderLeft: "6px solid #16a34a",
                    },
                });
                router.push("/forgetpass_verify_otp")
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "User doesn't exist", {
                style: {
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    borderLeft: "6px solid #dc2626",
                },
            });
        }
    }



    return (
        <div className="max-w-4xl w-full mx-auto">
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
                            We sent a 6-digit code to your email
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="text-[#1E293B]/70 text-[15px] font-medium mb-2 block">
                                    Email Address
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    required
                                    placeholder="est********************ail.com"
                                    className="w-full text-sm text-[#1E293B] bg-white focus:bg-transparent pl-4 pr-4 py-3.5 rounded-xl border border-[#DBEAFE] focus:border-blue-600 outline-none"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full mt-8 py-3 rounded-md bg-[#2563EB]/80 hover:bg-[#2563EB] text-white text-sm font-medium transition"
                        >
                            {isLoading ? "Loading..." : "Continue"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
