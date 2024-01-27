import { baseApi } from "@/redux/api/baseApi";
import { Response } from "@/types/common.type";
import { SmartPhone, SmartPhonePayload } from "@/types/smartphone.type";

const smartphoneApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSmartphones: builder.query<
      Response<SmartPhone[]>,
      Record<string, unknown>
    >({
      query: (payload) => ({
        url: "smartphone",
        method: "GET",
        params: payload,
      }),
      providesTags: ["smartphone-list"],
    }),
    addSmartphone: builder.mutation<Response<SmartPhone>, SmartPhonePayload>({
      query: (payload) => ({
        url: "smartphone",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["smartphone-list"],
    }),
    editSmartphone: builder.mutation<Response<SmartPhone>, SmartPhonePayload>({
      query: ({ id, ...payload }) => ({
        url: `smartphone/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["smartphone-list"],
    }),
  }),
});

export const {
  useGetSmartphonesQuery,
  useAddSmartphoneMutation,
  useEditSmartphoneMutation,
} = smartphoneApi;
