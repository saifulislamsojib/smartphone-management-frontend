export type Sell = {
  smartphone: string;
  status: "done" | "rejected" | "pending" | "ongoing";
  buyerName: string;
  saleDate: string;
  createdAt: string;
  updatedAt: string;
  sellBy: string;
  quantity: number;
};

export type SellPayload = Omit<Sell, "createdAt" | "updatedAt" | "sellBy">;
