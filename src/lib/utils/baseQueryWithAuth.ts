import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getBaseUrl } from "./getBaseUrl";
import { getToken } from "./getToken";


export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1`,
    credentials: "include",
    prepareHeaders(headers, api) {
        const token = getToken();
        if(token){
            headers.set("Authorization", `${token}`);
        }
        return headers;
    },
})