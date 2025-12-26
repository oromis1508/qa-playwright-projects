import { uniqueEmail } from "../../helpers/data";
import type { AuthApi } from "../clients/AuthApi";

export type TestUser = {
  email: string;
  password: string;
};

export async function createUser(authApi: AuthApi): Promise<TestUser> {
  const email = uniqueEmail("user");
  const password = "password123";

  const reg = await authApi.register(email, password);
  if (reg.status !== 201) {
    throw new Error(`register failed: ${reg.status} ${reg.error}`);
  }

  return { email, password };
}
