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
});
