import { test as base } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";

import { createApi } from "./api.fixture";
import { createUser, type TestUser } from "./user.fixture";
import { createAuthedApi } from "./authed.fixture";
import { AuthApi } from "../clients/AuthApi";
import { ProjectsApi } from "../clients/ProjectsApi";
import { AuthSession, createSession } from "./session.fixture";
import { createAuthApi } from "./auth.fixture";
import { createProjectsApi } from "./projects.fixture";

type ApiFixtures = {
  api: APIRequestContext;
  authApi: AuthApi;
  projectsApi: ProjectsApi;

  user: TestUser;
  session: AuthSession;
  authedApi: APIRequestContext;
  projectsAuthedApi: ProjectsApi;
};

export const test = base.extend<ApiFixtures>({
  api: async ({ baseURL }, use) => {
    const api = await createApi(baseURL!);
    await use(api);
    await api.dispose();
  },

  authApi: async ({ api }, use) => {
    await use(createAuthApi(api));
  },

  projectsApi: async ({ api }, use) => {
    await use(createProjectsApi(api));
  },

  user: async ({ authApi }, use) => {
    await use(await createUser(authApi));
  },

  session: async ({ authApi, user }, use) => {
    await use(await createSession(authApi, user));
  },

  authedApi: async ({ baseURL, session }, use) => {
    const api = await createAuthedApi(baseURL!, session);
    await use(api);
    await api.dispose();
  },

  projectsAuthedApi: async ({ authedApi }, use) => {
    await use(new ProjectsApi(authedApi));
  },
});

export { expect } from "@playwright/test";
