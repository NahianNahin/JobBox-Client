import { apiSlice } from "../api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/user",
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled();
                    dispatch(getUser(data.email));
                    console.log(res);
                }
                catch (error) {
                    // Error Handle
                }
            }

        }),
        getUserById: builder.query({
            query: (data) => ({
                url: `/users/${data}`,
            }),

        }),
        addMessage: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/chat",
                body: data
            }),

        }),

    })
});

export const { useRegisterMutation, useGetUserByIdQuery, useAddMessageMutation } = authApi;