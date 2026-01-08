import { uniqueProjectName } from "../../helpers/data";
import { test, expect } from "../fixtures";

test.describe("Projects API", () => {
  test.describe("unauthorized", () => {
    test("list -> 401", async ({ projectsApi }) => {
      const res = await projectsApi.list();
      expect(res.status).toBe(401);
    });

    test("create -> 401", async ({ projectsApi }) => {
      const res = await projectsApi.create(uniqueProjectName("unauth"));
      expect(res.status).toBe(401);
    });

    test("get -> 401", async ({ projectsApi }) => {
      const res = await projectsApi.get(1);
      expect(res.status).toBe(401);
    });
  });

  test.describe("authorized - create", () => {
    test("create -> 201, returns Project", async ({ actorA }) => {
      const name = uniqueProjectName("ok");
      const res = await actorA.projectsApi.create(name);

      expect(res.status, res.error).toBe(201);
      expect(res.data!.project.id).toBeGreaterThan(0);
      expect(res.data!.project.name).toBe(name);
      expect(res.data!.project.ownerId).toBeTruthy();
    });

    test("validation: create empty name -> 400", async ({ actorA }) => {
      const res = await actorA.projectsApi.create("");

      expect(res.status).toBe(400);
      expect(res.error).toBeTruthy();
    });
  });

  test.describe("authorized - get", () => {
    test("list -> 200 contains owned project", async ({ actorA, projectA }) => {
      const res = await actorA.projectsApi.list();

      expect(res.status, res.error).toBe(200);
      expect(res.data!.items.map((p) => p.id)).toContain(projectA.id);
    });

    test("get -> 200 returns owned project", async ({ actorA, projectA }) => {
      const res = await actorA.projectsApi.get(projectA.id);

      expect(res.status, res.error).toBe(200);
      expect(res.data!.project.id).toBe(projectA.id);
      expect(res.data!.project.name).toBe(projectA.name);
      expect(res.data!.project.ownerId).toBe(projectA.ownerId);
    });

    test("ownership: user B cannot GET user A project -> 403", async ({
      actorB,
      projectA,
    }) => {
      const res = await actorB.projectsApi.get(projectA.id);

      expect(res.status).toBe(403);
    });

    test("isolation: user B list does NOT contain user A project", async ({
      actorB,
      projectA,
    }) => {
      const res = await actorB.projectsApi.list();

      expect(res.status, res.error).toBe(200);
      expect(res.data!.items.map((p) => p.id)).not.toContain(projectA.id);
    });
  });

  test.describe("authorized - update", () => {
    test("update own project -> 200, returns updated project", async ({
      actorA,
      projectA,
    }) => {
      const newName = uniqueProjectName("upd");
      const res = await actorA.projectsApi.update(projectA.id, newName);

      expect(res.status, res.error).toBe(200);
      expect(res.data!.project.id).toBe(projectA.id);
      expect(res.data!.project.name).toBe(newName);
      expect(res.data!.project.ownerId).toBe(actorA.user.id);
    });

    test("update with empty name -> 400", async ({ actorA, projectA }) => {
      const res = await actorA.projectsApi.update(projectA.id, "");

      expect(res.status).toBe(400);
      expect(res.error).toBeTruthy();
    });

    test("ownership: user B cannot update user A project -> 403", async ({
      actorB,
      projectA,
    }) => {
      const res = await actorB.projectsApi.update(
        projectA.id,
        uniqueProjectName("forbidden")
      );

      expect(res.status).toBe(403);
    });

    test("update non-existing project -> 404", async ({ actorA }) => {
      const res = await actorA.projectsApi.update(
        999999,
        uniqueProjectName("missing")
      );

      expect(res.status).toBe(404);
    });
  });

  test.describe("authorized - delete", () => {
    test("delete own project -> 204, then get -> 404", async ({ actorA }) => {
      const created = await actorA.projectsApi.create(uniqueProjectName("del"));
      expect(created.status, created.error).toBe(201);

      const id = created.data!.project.id;

      const del = await actorA.projectsApi.delete(id);
      expect(del.status, del.error).toBe(204);

      const got = await actorA.projectsApi.get(id);
      expect(got.status).toBe(404);
    });

    test("ownership: user B cannot delete user A project -> 403", async ({
      actorB,
      projectA,
    }) => {
      const res = await actorB.projectsApi.delete(projectA.id);
      expect(res.status).toBe(403);
    });

    test("delete non-existing project -> 404", async ({ actorA }) => {
      const res = await actorA.projectsApi.delete(999999);
      expect(res.status).toBe(404);
    });
  });
});
