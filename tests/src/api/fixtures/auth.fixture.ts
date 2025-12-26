import type { APIRequestContext } from "@playwright/test";
import { AuthApi } from "../clients/AuthApi";

export function createAuthApi(api: APIRequestContext) {
  return new AuthApi(api);
}
