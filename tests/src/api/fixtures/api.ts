import {
  test as base,
  request,
  type APIRequestContext,
} from "@playwright/test";
import { AuthApi } from "../clients/AuthApi";

type ApiFixtures = {
  api: APIRequestContext;
  authApi: AuthApi;
};

export const test = base.extend<ApiFixtures>({
  api: async ({ baseURL }, use) => {
    const api = await request.newContext({ baseURL });
    await use(api);
    await api.dispose();
  },

  authApi: async ({ api }, use) => {
    await use(new AuthApi(api));
  },
});

export { expect } from "@playwright/test";
