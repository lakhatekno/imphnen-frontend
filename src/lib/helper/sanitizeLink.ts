export function sanitizeLink(link: string): string {
  const trimmed = link.trim();

  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}