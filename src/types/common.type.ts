export type Response<T extends Record<string, unknown>> = {
  success: boolean;
  message: string;
  data: T;
};

export type ErrorResponse =
  | {
      data?: {
        message: string;
        errorMessage: string;
      };
    }
  | undefined;
