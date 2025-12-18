import { test, expect } from "../fixtures";

test.describe("Auth API", () => {
  let email = `user_auth@example.com`;
  const password = "password123";

  test.beforeEach(async ({ authApi }) => {
    email = `user_auth${Math.random().toString(16)}@example.com`;
    const res = await authApi.register(email, password);
    expect(res.status).toBe(201);
  });

  test("login -> 200, returns token", async ({ authApi }) => {
    const res = await authApi.login(email, password);
    expect(res.status, res.error).toBe(200);
    expect(res.token).toBeTruthy();
  });

  test("login wrong password -> 401", async ({ authApi }) => {
    const res = await authApi.login(email, "wrong_pass");
    expect(res.status, res.error).toBe(401);
  });

  test("login wrong email -> 401", async ({ authApi }) => {
    const res = await authApi.login("a" + email, password);
    expect(res.status, res.error).toBe(401);
  });
});
