import axios from "axios";
import type { NavigateFunction } from "react-router-dom";

type ApiError = { message?: string };

export function getApiErrorMessage(e: unknown, fallback: string) {
  if (axios.isAxiosError<ApiError>(e)) {
    return e.response?.data?.message ?? fallback;
  }
  return fallback;
}

export function redirectIfProjectMissing(
  e: unknown,
  navigate: NavigateFunction
): boolean {
  if (!axios.isAxiosError(e)) return false;

  const status = e.response?.status;
  if (status === 403 || status === 404) {
    navigate("/", { replace: true });
    return true;
  }

  return false;
}
