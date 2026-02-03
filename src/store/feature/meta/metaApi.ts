import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const metaApi = createApi({
    reducerPath: "metaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/v1`,
    }),
    tagTypes: ["metaApi"],
    endpoints: (builder) => ({
        getInsurerChartData: builder.query<any, void>({
            query: () => ({
                url: '/meta/insurer-chart-data',
                method: 'GET'
            }),
            providesTags: ["metaApi"]
        }),
    }),
});



export const {
    useGetInsurerChartDataQuery
} = metaApi;

export default metaApi;