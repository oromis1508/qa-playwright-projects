import type { APIRequestContext } from "@playwright/test";
import type {
  Project,
  ProjectCreateResult,
  ProjectGetResult,
  ProjectsListResult,
} from "../types/project";

export class ProjectsApi {
  constructor(private api: APIRequestContext) {}

  async list(): Promise<ProjectsListResult> {
    const res = await this.api.get("/projects");
    if (res.status() !== 200)
      return { ok: false, status: res.status(), error: await res.text() };
    return {
      ok: true,
      status: 200,
      data: { items: (await res.json()) as Project[] },
    };
  }

  async create(name: string): Promise<ProjectCreateResult> {
    const res = await this.api.post("/projects", { data: { name } });
    if (res.status() !== 201)
      return { ok: false, status: res.status(), error: await res.text() };
    return {
      ok: true,
      status: 201,
      data: { project: (await res.json()) as Project },
    };
  }

  async get(id: number): Promise<ProjectGetResult> {
    const res = await this.api.get(`/projects/${id}`);
    if (res.status() !== 200)
      return { ok: false, status: res.status(), error: await res.text() };
    return {
      ok: true,
      status: 200,
      data: { project: (await res.json()) as Project },
    };
  }
}
