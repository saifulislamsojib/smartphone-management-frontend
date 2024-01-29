import { SmartPhone } from "./smartphone.type";

export type Sell = {
  _id: string;
  smartphone: string;
  status: "done" | "rejected" | "pending" | "ongoing";
  buyerName: string;
  saleDate: string;
  createdAt: string;
  updatedAt: string;
  sellBy: string;
  quantity: number;
};

export type SellView = Omit<Sell, "smartphone"> & {
  smartphoneInfo: SmartPhone;
};

export type SellPayload = Omit<Sell, "createdAt" | "updatedAt" | "sellBy">;
