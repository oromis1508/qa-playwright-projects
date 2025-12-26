import { request, type APIRequestContext } from "@playwright/test";

export async function createApi(baseURL: string): Promise<APIRequestContext> {
  return request.newContext({ baseURL });
}
