import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Vercel release configuration", () => {
  it("uses PostgreSQL and generates Prisma Client during install", () => {
    const schema = readFileSync("prisma/schema.prisma", "utf8");
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

    expect(schema).toMatch(/provider\s*=\s*"postgresql"/);
    expect(schema).toContain('directUrl = env("DIRECT_URL")');
    expect(packageJson.scripts.postinstall).toBe("prisma generate");
    expect(packageJson.scripts["vercel-build"]).toContain("prisma migrate deploy");
  });

  it("defines production security headers and a public site URL", () => {
    const nextConfig = readFileSync("next.config.js", "utf8");
    const envExample = readFileSync(".env.example", "utf8");

    expect(nextConfig).toContain("X-Content-Type-Options");
    expect(nextConfig).toContain("Referrer-Policy");
    expect(nextConfig).toContain("Permissions-Policy");
    expect(envExample).toContain("NEXT_PUBLIC_SITE_URL");
  });
});
