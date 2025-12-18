import { request } from "@playwright/test";

export async function resetDb(baseURL: string) {
  const api = await request.newContext({ baseURL });

  const res = await api.post("/__test__/reset");
  if (res.status() !== 204) {
    throw new Error(`DB reset failed: ${res.status()} ${await res.text()}`);
  }

  await api.dispose();
}
