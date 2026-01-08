import { AuthApi } from "../clients/AuthApi";
import { AuthSession, TestUser } from "./types";

export async function createSession(
  authApi: AuthApi,
  user: TestUser
): Promise<AuthSession> {
  const login = await authApi.login(user.email, user.password);
  if (login.status !== 200 || !login.data?.token) {
    throw new Error(`login failed: ${login.status} ${login.error}`);
  }

  return { token: login.data.token };
}
