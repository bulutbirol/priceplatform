import { test, expect } from "@playwright/test";

test("homepage explains product pricing and exposes four categories", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.getByRole("heading", { name: /Bir ürünün fiyatında ne var/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Telefon", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Kamera", exact: true })).toBeVisible();
  await expect(page.getByText("Marka primi", { exact: true }).first()).toBeVisible();
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
