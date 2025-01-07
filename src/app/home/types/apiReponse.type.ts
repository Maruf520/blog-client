export interface ApiResponse<T> {
  isSuccess: boolean;
  isFailure: boolean;
  error: Error | null;
  data: T;
}
