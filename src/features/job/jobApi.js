import { apiSlice } from "../api/apiSlice";


const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/job",
                body: data
            }),
            invalidatesTags: ["jobs"]
        }),
        applyJob: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/apply",
                body: data
            }),
            invalidatesTags: ["apply"]
        }),
        addQuestion: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/query",
                body: data
            }),
            invalidatesTags: ["job"]
        }),
        addReply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/reply",
                body: data
            }),
            invalidatesTags: ["job"]
        }),
        toggleAppState: builder.mutation({
            query: (data, id) => ({
                method: "PUT",
                url: `/job/application/${id}`,
                body: data
            }),

        }),
        getJobs: builder.query({
            query: () => ({
                url: "/jobs",
            }),
            providesTags: ["jobs"]
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
            }),
            providesTags: ["apply"]
        }),
        getAppliedJobs: builder.query({
            query: (id) => ({
                url: `/applied-jobs/${id}`,
            }),
            providesTags: ["apply"]
        }),

    })
});

export const {
    usePostJobMutation,
    useGetJobsQuery,
    useGetJobByIdQuery,
    useApplyJobMutation,
    useGetAppliedJobsQuery,
    useAddQuestionMutation,
    useAddReplyMutation,
    useToggleAppStateMutation
} = jobApi;