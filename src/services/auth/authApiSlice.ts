import { api } from "@/services/api";
import { setCredentials } from "./authslice";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder: {
    mutation: (arg: {
      query: (credentials: any) => { url: string; method: string; data: any };
      onQueryStarted?: any;
    }) => any;
  }) => ({
    loginAction: builder.mutation({
      query: (credentials: any) => ({
        url: "/login",
        method: "POST",
        data: { ...credentials },
      }),
      async onQueryStarted(id: any, { dispatch, queryFulfilled }: any) {
        // `onStart` side-effect

        try {
          const data = await queryFulfilled;
          dispatch(
            setCredentials({
              token: data?.data?.token,
              user: { id: 1, email: "dummy email" },
            })
          );
        } catch (err) {
          // `onError` side-effect
          console.log("Login error", err);
        }
      },
    }),
  }),
});

export const { useLoginActionMutation } = authApiSlice;
