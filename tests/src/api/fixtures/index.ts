import { test as base, expect } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";

import { createApi } from "./api.fixture";
import { createAuthApi } from "./auth.fixture";
import { createProject, createProjectsApi } from "./projects.fixture";

import type { AuthApi } from "../clients/AuthApi";
import type { ProjectsApi } from "../clients/ProjectsApi";

import { createActor, disposeActor } from "./actor.fixture";
import { Actor } from "./types";
import { Project } from "../types/project";

type ApiFixtures = {
  api: APIRequestContext;
  authApi: AuthApi;
  projectsApi: ProjectsApi; // unauth
  projectA: Project;

  actorA: Actor;
  actorB: Actor;
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

  actorA: async ({ baseURL, authApi }, use) => {
    const actor = await createActor(baseURL!, authApi);

    await use(actor);
    await disposeActor(actor);
  },

  actorB: async ({ baseURL, authApi }, use) => {
    const actor = await createActor(baseURL!, authApi);

    await use(actor);
    await disposeActor(actor);
  },

  projectA: async ({ actorA }, use) => {
    const project = await createProject(actorA, "projA");

    await use(project);
  },
});

export { expect };
