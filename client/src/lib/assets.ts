// Prefix public asset paths with the Vite base URL.
// This is needed for GitHub Pages subdirectory hosting.
// When a custom domain is connected, BASE_URL becomes "/" and this is a no-op.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Avoid double slashes
  if (path.startsWith("/")) path = path.slice(1);
  return base + path;
}
