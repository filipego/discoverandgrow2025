export const EMAIL_LOGO_FALLBACK_URL =
  "https://raw.githubusercontent.com/filipego/discoverandgrow2025/codex/site-updates/public/images/discover-and-grow-logo-email.png";
export const EMAIL_LOGO_PREVIEW_URL = "/static/discover-and-grow-logo-email.png";
export const EMAIL_LOGO_URL =
  process.env.NODE_ENV === "production"
    ? EMAIL_LOGO_FALLBACK_URL
    : EMAIL_LOGO_PREVIEW_URL;

export function getEmailLogoUrl(siteUrl?: string): string {
  if (!siteUrl) return EMAIL_LOGO_FALLBACK_URL;

  try {
    return new URL("/images/discover-and-grow-logo-email.png", siteUrl).toString();
  } catch {
    return EMAIL_LOGO_FALLBACK_URL;
  }
}
