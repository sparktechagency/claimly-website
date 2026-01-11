import { baseQueryWithAuth } from "@/lib/utils/baseQueryWithAuth";
import { TResponse } from "@/types/global";
import { createApi } from "@reduxjs/toolkit/query/react";


const insurerApi = createApi({
    reducerPath: "insurerApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Insurer"],
    endpoints: (builder) => ({
        postInsurer: builder.mutation<TResponse<any>, any>({
            query: (insurerData: any) => ({
                url: '/insurer/create-insurer',
                method: 'POST',
                body: insurerData,
            }),
            invalidatesTags: ["Insurer"]
        }),
        getMyInsurer: builder.query<TResponse<any>, string>({
            query: (status: string) => ({
                url: '/insurer/my-insurers',
                method: 'GET',
                body: {
                    status
                }
            }),
        }),
    }),
});



export const {
    usePostInsurerMutation,
    useGetMyInsurerQuery
} = insurerApi;

export default insurerApi;