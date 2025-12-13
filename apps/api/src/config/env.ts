import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  JWT_SECRET: required("JWT_SECRET"),
  DATABASE_URL: process.env.DATABASE_URL ?? "file:./dev.db",
};
