import { resetDb } from "./src/helpers/dbHelper";
import { env } from "./src/helpers/env";

export default async function globalTeardown() {
  await resetDb(env.API_URL);
}
