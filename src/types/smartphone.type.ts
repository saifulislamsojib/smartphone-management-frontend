import { User } from "./user.type";

export type SmartPhone = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: number;
  screenSize: number;
  cameraQuality: string;
  batteryLife: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
};

export type SmartPhonePayload = Omit<
  SmartPhone,
  "_id" | "createdAt" | "updatedAt" | "createdBy"
> & { id?: string };
