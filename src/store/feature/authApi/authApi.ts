import { baseQueryWithAuth } from "@/lib/utils/baseQueryWithAuth";
import { TResponse } from "@/types/global";
import { createApi } from "@reduxjs/toolkit/query/react";



const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        register: builder.mutation<TResponse<any>, any>({
            query: (userData: any) => ({
                url: "/user/register",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Auth"]
        }),
        verifyRegisterOtp: builder.mutation<TResponse<any>, any>({
            query: (userData: any) => ({
                url: "/auth/verify-email-otp",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Auth"]
        }),
        login: builder.mutation<TResponse<any>, any>({
            query: (userData: any) => ({
                url: "/auth/login",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Auth"]
        }),
        forgotPassword: builder.mutation<TResponse<any>, any>({
            query: (userData: any) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Auth"]
        }),
        verifyForgetpasswordOtp: builder.mutation<TResponse<any>, any>({
            query: (userData: any) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Auth"]
        }),
    })
})

export const {
    useRegisterMutation,
    useVerifyRegisterOtpMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyForgetpasswordOtpMutation
} = authApi;

export default authApi;