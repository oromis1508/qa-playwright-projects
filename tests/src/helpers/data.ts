export function uniqueEmail(prefix = "user"): string {
  const rnd = Math.random().toString(16).slice(2);
  return `${prefix}_${Date.now()}_${rnd}@example.com`;
}

export function uniqueProjectName(prefix = "project") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
