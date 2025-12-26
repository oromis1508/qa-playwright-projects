import { request, type APIRequestContext } from "@playwright/test";
import { AuthSession } from "./session.fixture";

export async function createAuthedApi(
  baseURL: string,
  session: AuthSession
): Promise<APIRequestContext> {
  return request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${session.token}`,
    },
  });
}
