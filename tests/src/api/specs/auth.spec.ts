import { test, expect } from "../fixtures";

function uniqueEmail(prefix = "user") {
  const rnd = Math.random().toString(16).slice(2);
  return `${prefix}_${Date.now()}_${rnd}@example.com`;
}

test.describe("Auth API", () => {
  test.describe("register", () => {
    const password = "password123";

    test("register -> 201, returns {id, email}", async ({ authApi }) => {
      const email = uniqueEmail("reg_ok");
      const res = await authApi.register(email, password);

      expect(res.status, res.error).toBe(201);
      expect(res.data?.email).toBe(email);
      expect(typeof res.data?.id).toBe("number");
    });

    test("register same email twice -> 400", async ({ authApi }) => {
      const email = uniqueEmail("reg_dup");
      const first = await authApi.register(email, password);

      expect(first.status, first.error).toBe(201);

      const second = await authApi.register(email, password);

      expect(second.status, second.error).toBe(400);
      expect(second.error).toBeTruthy();
    });

    test("register invalid email -> 400", async ({ authApi }) => {
      const res = await authApi.register("not-an-email", password);

      expect(res.status, res.error).toBe(400);
      expect(res.error).toBeTruthy();
    });

    test("register short password -> 400", async ({ authApi }) => {
      const email = uniqueEmail("reg_short");
      const res = await authApi.register(email, "wrong");

      expect(res.status, res.error).toBe(400);
      expect(res.error).toBeTruthy();
    });

    test("register empty email -> 400", async ({ authApi }) => {
      const res = await authApi.register("", "password123");

      expect(res.status, res.error).toBe(400);
      expect(res.error).toBeTruthy();
    });

    test("register empty password -> 400", async ({ authApi }) => {
      const email = uniqueEmail("reg_empty_pass");
      const res = await authApi.register(email, "");

      expect(res.status, res.error).toBe(400);
      expect(res.error).toBeTruthy();
    });
  });

  test.describe("login", () => {
    test("login -> 200, returns token", async ({
      authApi,
      actorA: { user },
    }) => {
      const res = await authApi.login(user.email, user.password);

      expect(res.status, res.error).toBe(200);
      expect(res.data?.token).toBeTruthy();

      const parts = res.data?.token?.split(".");

      expect(parts).toHaveLength(3);
    });

    test("login wrong password -> 401", async ({
      authApi,
      actorA: { user },
    }) => {
      const res = await authApi.login(user.email, "wrong_pass");

      expect(res.status, res.error).toBe(401);
      expect(res.error).toBeTruthy();
    });

    test("login wrong email -> 401", async ({ authApi, actorA: { user } }) => {
      const res = await authApi.login("a" + user.email, user.password);

      expect(res.status, res.error).toBe(401);
      expect(res.error).toBeTruthy();
    });

    test("login invalid email format -> 400", async ({
      authApi,
      actorA: { user },
    }) => {
      const res = await authApi.login("not-an-email", user.password);

      expect(res.status, res.error).toBe(400);
      expect(res.error).toBeTruthy();
    });

    test("login empty email -> 400", async ({ authApi }) => {
      const res = await authApi.login("", "password123");

      expect(res.status, res.error).toBe(400);
      expect(res.error).toBeTruthy();
    });

    test("login empty password -> 400", async ({
      authApi,
      actorA: { user },
    }) => {
      const res = await authApi.login(user.email, "");

      expect(res.status, res.error).toBe(400);
      expect(res.error).toBeTruthy();
    });
  });
});
