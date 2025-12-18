import { type APIRequestContext } from "@playwright/test";
import type {
  LoginResponse,
  LoginResult,
  RegisterResponse,
  RegisterResult,
} from "../types/auth";

export class AuthApi {
  constructor(private api: APIRequestContext) {}

  async register(email: string, password: string): Promise<RegisterResult> {
    const res = await this.api.post("/auth/register", {
      data: { email, password },
    });
    if (res.status() !== 201)
      return { email, status: res.status(), error: await res.text() };
    const responseData = (await res.json()) as RegisterResponse;
    return {
      status: res.status(),
      ...responseData,
    };
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const res = await this.api.post("/auth/login", {
      data: { email, password },
    });
    if (res.status() !== 200)
      return { status: res.status(), error: await res.text() };
    const body = (await res.json()) as LoginResponse;
    return { status: res.status(), ...body };
  }
}
