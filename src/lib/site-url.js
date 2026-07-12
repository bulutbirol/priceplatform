export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "priceplatform.vercel.app";
  const withProtocol = /^https?:\/\//.test(configured) ? configured : `https://${configured}`;
  return withProtocol.replace(/\/$/, "");
}
