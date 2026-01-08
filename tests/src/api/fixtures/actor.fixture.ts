import { request } from "@playwright/test";
import type { AuthApi } from "../clients/AuthApi";
import { ProjectsApi } from "../clients/ProjectsApi";
import { createUser } from "./user.fixture";
import { createSession } from "./session.fixture";
import { Actor } from "./types";

export async function createActor(
  baseURL: string,
  authApi: AuthApi
): Promise<Actor> {
  const user = await createUser(authApi);
  const session = await createSession(authApi, user);

  const authedApi = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return {
    user,
    session,
    authedApi,
    projectsApi: new ProjectsApi(authedApi),
  };
}

export async function disposeActor(actor: Actor) {
  await actor.authedApi.dispose();
}
