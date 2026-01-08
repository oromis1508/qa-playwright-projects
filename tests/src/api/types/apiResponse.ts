export type ApiResponse<T> = {
  status: number;
  data?: T;
  error?: string;
};
