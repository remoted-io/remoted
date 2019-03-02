export function normalizeUrl(url: string) {
  const normalizedUrl = new URL(url);
  return `${normalizedUrl.host}${normalizedUrl.pathname}`;
}