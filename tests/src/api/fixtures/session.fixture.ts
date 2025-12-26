import { AuthApi } from "../clients/AuthApi";
import { TestUser } from "./user.fixture";

export type AuthSession = {
  token: string;
};

export async function createSession(
  authApi: AuthApi,
  user: TestUser
): Promise<AuthSession> {
  const login = await authApi.login(user.email, user.password);
  if (login.status !== 200 || !login.token) {
    throw new Error(`login failed: ${login.status} ${login.error}`);
  }

  return { token: login.token };
}
