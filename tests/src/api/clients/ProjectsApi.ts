// import type { APIRequestContext } from "@playwright/test";
// import type { Project } from "../types/project";

// export class ProjectsApi {
//   constructor(private api: APIRequestContext) {}

//   async list(): Promise<Project[]> {
//     const res = await this.api.get("/projects");
//     return res.json();
//   }

//   async create(name: string): Promise<Project> {
//     const res = await this.api.post("/projects", { data: { name } });
//     return res.json();
//   }
// }
