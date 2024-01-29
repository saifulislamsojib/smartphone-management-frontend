export type Response<T extends object> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
  };
};

export type ErrorResponse =
  | {
      data?: {
        message: string;
        errorMessage: string;
      };
    }
  | undefined;
