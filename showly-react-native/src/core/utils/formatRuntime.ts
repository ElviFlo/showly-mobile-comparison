export function formatRuntime(runtime?: number | null): string {
  if (!runtime) return "Unknown runtime";
  return `${runtime} min`;
}