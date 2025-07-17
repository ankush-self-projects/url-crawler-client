export function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  // Accept if it matches a domain pattern (e.g., github.com, www.india.com, react.dev)
  const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
  if (domainPattern.test(trimmed)) return true;
  // Accept if it's a valid URL with protocol
  let testUrl = trimmed;
  if (!/^https?:\/\//i.test(testUrl)) {
    testUrl = 'http://' + testUrl;
  }
  try {
    new URL(testUrl);
    return true;
  } catch {
    return false;
  }
} 