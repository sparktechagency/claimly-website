import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { TResponse } from "@/types/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const webApi = createApi({
    reducerPath: "webApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/v1`,
    }),
    tagTypes: ["WebApi"],
    endpoints: (builder) => ({
        getTermsConditions: builder.query<TResponse<any>, void>({
            query: () => ({
                url: '/manage-Web/get-terms-conditions',
                method: 'GET'
            }),
            providesTags: ["WebApi"]
        }),
        getPrivacyPolicy: builder.query<TResponse<any>, void>({
            query: () => ({
                url: '/manage-Web/get-privacy-policy',
                method: 'GET'
            }),
            providesTags: ["WebApi"]
        }),
        getFaq: builder.query<TResponse<any>, void>({
            query: () => ({
                url: '/manage-Web/get-faq',
                method: 'GET'
            }),
            providesTags: ["WebApi"]
        }),
          contactUs: builder.mutation({
            query: (data) => ({
                url: '/manage-Web/add-contact-us',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['WebApi']
        }),

    }),
});



export const {
    useGetTermsConditionsQuery,
    useGetPrivacyPolicyQuery,
    useGetFaqQuery,
    useContactUsMutation
} = webApi;

export default webApi;