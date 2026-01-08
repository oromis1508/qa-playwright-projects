import type { APIRequestContext } from "@playwright/test";
import type { Project, ProjectData, ProjectsListData } from "../types/project";
import { ApiResponse } from "../types/apiResponse";

export class ProjectsApi {
  constructor(private api: APIRequestContext) {}

  async list(): Promise<ApiResponse<ProjectsListData>> {
    const res = await this.api.get("/projects");
    if (res.status() !== 200)
      return { status: res.status(), error: await res.text() };
    return { status: 200, data: { items: (await res.json()) as Project[] } };
  }

  async create(name: string): Promise<ApiResponse<ProjectData>> {
    const res = await this.api.post("/projects", { data: { name } });
    if (res.status() !== 201)
      return { status: res.status(), error: await res.text() };
    return { status: 201, data: { project: (await res.json()) as Project } };
  }

  async get(id: number): Promise<ApiResponse<ProjectData>> {
    const res = await this.api.get(`/projects/${id}`);
    if (res.status() !== 200)
      return { status: res.status(), error: await res.text() };
    return { status: 200, data: { project: (await res.json()) as Project } };
  }

  async update(
    id: number,
    name: string
  ): Promise<ApiResponse<{ project: Project }>> {
    const res = await this.api.put(`/projects/${id}`, { data: { name } });

    if (res.status() !== 200)
      return { status: res.status(), error: await res.text() };

    return { status: 200, data: { project: (await res.json()) as Project } };
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const res = await this.api.delete(`/projects/${id}`);

    if (res.status() !== 204)
      return { status: res.status(), error: await res.text() };

    return { status: 204 };
  }
}
