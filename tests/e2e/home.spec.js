import { test, expect } from "@playwright/test";

test("homepage provides search and the complete category path", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.getByRole("heading", { name: /Hangi ürünün fiyatını anlamak istiyorsun/i })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Teknoloji ara" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Kişisel Teknoloji/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Telefon/ })).toHaveAttribute("href", "/tr/categories/telefonlar");
  await expect(page.getByRole("link", { name: "Fiyat faktörleri", exact: true })).toBeVisible();
});

test("dark theme persists after a reload", async ({ page }) => {
  await page.goto("/tr");
  await page.getByRole("button", { name: "Koyu tema" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("mobile navigation opens accessibly", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/tr");
  const menu = page.getByRole("button", { name: "Menüyü aç" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobil navigasyon" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Menüyü kapat" })).toHaveAttribute("aria-expanded", "true");
});
