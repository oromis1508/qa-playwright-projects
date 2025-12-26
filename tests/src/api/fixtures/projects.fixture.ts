import type { APIRequestContext } from "@playwright/test";
import { ProjectsApi } from "../clients/ProjectsApi";

export function createProjectsApi(api: APIRequestContext) {
  return new ProjectsApi(api);
}
