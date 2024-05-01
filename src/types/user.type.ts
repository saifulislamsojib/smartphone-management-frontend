export type Role = "super-admin" | "manager" | "seller";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type Auth = {
  token: string;
  user: User;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
} & LoginPayload;
