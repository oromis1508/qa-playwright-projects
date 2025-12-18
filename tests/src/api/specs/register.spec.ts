import { test, expect } from "../fixtures";

test.describe("Register API", () => {
  test("register -> 201, returns {id, email}", async ({ authApi }) => {
    const email = `user201@example.com`;
    const password = "password123";

    const res = await authApi.register(email, password);
    expect(res.status, res.error).toBe(201);

    expect(res.email).toBe(email);
    expect(typeof res.id).toBe("number");
  });

  test("register same email twice -> 400", async ({ authApi }) => {
    const email = `user400@example.com`;
    const password = "password123";

    const first = await authApi.register(email, password);
    expect(first.status, first.error).toBe(201);

    const second = await authApi.register(email, password);
    expect(second.status, second.error).toBe(400);
  });
});
