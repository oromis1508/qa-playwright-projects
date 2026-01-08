import { uniqueEmail } from "../../helpers/data";
import type { AuthApi } from "../clients/AuthApi";
import { TestUser } from "./types";

export async function createUser(authApi: AuthApi): Promise<TestUser> {
  const email = uniqueEmail("user");
  const password = "password123";

  const res = await authApi.register(email, password);
  if (res.status !== 201 || !res.data?.id) {
    throw new Error(`register failed: ${res.status} ${res.error}`);
  }

  return { id: res.data.id, email, password };
}
