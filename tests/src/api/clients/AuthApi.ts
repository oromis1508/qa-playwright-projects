import { type APIRequestContext } from "@playwright/test";
import type { LoginData, RegisterData } from "../types/auth";
import { ApiResponse } from "../types/apiResponse";

export class AuthApi {
  constructor(private api: APIRequestContext) {}

  async register(
    email: string,
    password: string
  ): Promise<ApiResponse<RegisterData>> {
    const res = await this.api.post("/auth/register", {
      data: { email, password },
    });
    if (res.status() !== 201)
      return { status: res.status(), error: await res.text() };
    const responseData = (await res.json()) as RegisterData;
    return {
      status: res.status(),
      data: responseData,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginData>> {
    const res = await this.api.post("/auth/login", {
      data: { email, password },
    });
    if (res.status() !== 200)
      return { status: res.status(), error: await res.text() };
    const body = (await res.json()) as LoginData;
    return { status: res.status(), data: body };
  }
}
