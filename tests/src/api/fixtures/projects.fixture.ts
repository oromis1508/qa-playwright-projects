import { expect, type APIRequestContext } from "@playwright/test";
import { ProjectsApi } from "../clients/ProjectsApi";
import { Project } from "../types/project";
import { uniqueProjectName } from "../../helpers/data";
import { Actor } from "./types";

export function createProjectsApi(api: APIRequestContext) {
  return new ProjectsApi(api);
}

export async function createProject(
  actor: Actor,
  projectName: string
): Promise<Project> {
  const name = uniqueProjectName(projectName);
  const res = await actor.projectsApi.create(name);

  expect(res.status, res.error).toBe(201);

  return {
    id: res.data!.project.id,
    name: res.data!.project.name,
    ownerId: res.data!.project.ownerId,
  };
}
