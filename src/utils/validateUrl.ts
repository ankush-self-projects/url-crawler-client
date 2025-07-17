export function isValidUrl(url: string): boolean {
  const trimmed = url.trim();

  // Accept localhost with optional port
  if (/^localhost(:\d+)?$/.test(trimmed)) return true;

  // Accept domain names with at least one dot and valid TLD (2-24 chars)
  if (/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,24}$/.test(trimmed)) return true;

  // Try with protocol for the URL constructor, but only accept if hostname has a dot or is localhost
  let testUrl = trimmed;
  if (!/^https?:\/\//i.test(testUrl)) {
    testUrl = 'http://' + testUrl;
  }
  try {
    const urlObj = new URL(testUrl);
    const hostname = urlObj.hostname;
    if (
      hostname === 'localhost' ||
      /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,24}$/.test(hostname)
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
} 