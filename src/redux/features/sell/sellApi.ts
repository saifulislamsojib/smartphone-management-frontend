import { baseApi } from "@/redux/api/baseApi";
import { Response } from "@/types/common.type";
import { Sell, SellPayload } from "@/types/sell.type";
import objectToParams, { ObjectToParamsProp } from "@/utils/objectToParams";

const smartphoneApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellList: builder.query<Response<Sell[]>, ObjectToParamsProp>({
      query: (payload = {}) => ({
        url: `sell${objectToParams(payload)}`,
        method: "GET",
      }),
      providesTags: ["sell-list"],
    }),
    addSell: builder.mutation<Response<Sell>, SellPayload>({
      query: (payload) => ({
        url: "sell",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["sell-list", "smartphone-list"],
    }),
  }),
});

export const { useGetSellListQuery, useAddSellMutation } = smartphoneApi;
