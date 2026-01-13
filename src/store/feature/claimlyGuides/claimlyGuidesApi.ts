import { baseQueryWithAuth } from "@/lib/utils/baseQueryWithAuth";
import { TResponse } from "@/types/global";
import { createApi } from "@reduxjs/toolkit/query/react";


const claimlyGuidesApi = createApi({
    reducerPath: "claimlyGuidesApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["ClaimlyGuides"],
    endpoints: (builder) => ({

        getClaimlyGuides: builder.query<TResponse<any>, void>({
            query: () => ({
                url: '/claimlyGuide',
                method: 'GET',
            }),
        }),

        getClaimlyGuideById: builder.query<TResponse<any>, string>({
            query: (id) => ({
                url: `/claimlyGuide/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'ClaimlyGuides', id }],
        }),

    }),
});



export const {
    useGetClaimlyGuidesQuery,
    useGetClaimlyGuideByIdQuery
} = claimlyGuidesApi;

export default claimlyGuidesApi;