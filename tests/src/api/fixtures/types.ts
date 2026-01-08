import { APIRequestContext } from "@playwright/test";
import { ProjectsApi } from "../clients/ProjectsApi";

export type Actor = {
  user: TestUser;
  session: AuthSession;
  authedApi: APIRequestContext;
  projectsApi: ProjectsApi;
};

export type TestUser = {
  id: number;
  email: string;
  password: string;
};

export type AuthSession = {
  token: string;
};
