import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const apiSlice = createApi({
    reducerPath : "api",
    baseQuery : fetchBaseQuery({
        baseUrl : "https://jobbox-server-nahiannahin.vercel.app"
    }),
    tagTypes : ["jobs","apply","job"],
    endpoints : (builder) => ({}),
})