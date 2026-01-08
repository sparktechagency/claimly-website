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
                url: "/auth/verify-otp",
                method: "POST",
                body: userData
            }),
            invalidatesTags: ["Auth"]
        })
    })
})

export const { useRegisterMutation, useVerifyRegisterOtpMutation } = authApi;

export default authApi;