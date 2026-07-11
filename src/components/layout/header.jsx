"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe2, Menu, Monitor, Moon, Search, Sun, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getUiCopy } from "@/lib/ui-copy";

const themeIcons = { light: Sun, dark: Moon, system: Monitor };

function resolvedTheme(theme) {
  if (theme !== "system") return theme;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const resolved = resolvedTheme(theme);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

function ThemeSwitcher({ copy }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "system";
    return window.localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    applyTheme(theme);
    if (theme !== "system" || !window.matchMedia) return undefined;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");
    media.addEventListener?.("change", handleChange);
    return () => media.removeEventListener?.("change", handleChange);
  }, [theme]);

  const selectTheme = (nextTheme) => {
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className="theme-switcher" role="group" aria-label={copy.theme}>
      {["light", "dark", "system"].map((value) => {
        const Icon = themeIcons[value];
        return (
        <button
          key={value}
          type="button"
          aria-label={copy[value]}
          aria-pressed={theme === value}
          className="theme-switcher__button"
          onClick={() => selectTheme(value)}
        >
          <Icon aria-hidden="true" size={15} strokeWidth={1.8} />
        </button>
        );
      })}
    </div>
  );
}

export function Header({ locale }) {
  const t = useTranslations("navigation");
  const copy = getUiCopy(locale).header;
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    ["categories", `/${locale}/categories`],
    ["guides", `/${locale}/guides`],
    ["pricingFactors", `/${locale}/pricing-factors`],
    ["comparisons", `/${locale}/comparisons`],
  ];

  const handleLocaleChange = (nextLocale) => {
    const path = pathname.replace(/^\/(tr|en)/, `/${nextLocale}`);
    router.push(path || `/${nextLocale}`);
  };

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href={`/${locale}`} className="wordmark" aria-label={copy.home}>
          <span className="wordmark__mark" aria-hidden="true">₺</span>
          <span>
            <strong>Fiyatın</strong>
            <small>Anatomisi</small>
          </span>
        </Link>
        <span className="beta-badge" title={copy.betaTitle}>{copy.beta}</span>

        <nav className="desktop-nav" aria-label={copy.navigation}>
          {navItems.map(([key, href]) => (
            <Link key={key} href={href}>{t(key)}</Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href={`/${locale}/search`} className="icon-button" aria-label={copy.search}>
            <Search aria-hidden="true" size={18} />
          </Link>
          <ThemeSwitcher copy={copy} />
          <label className="locale-select" aria-label={copy.language}>
            <Globe2 aria-hidden="true" size={16} />
            <select value={currentLocale} onChange={(event) => handleLocaleChange(event.target.value)}>
              <option value="tr">TR</option>
              <option value="en">EN</option>
            </select>
          </label>
          <button
            type="button"
            className="icon-button mobile-menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label={copy.mobileNavigation}>
          {navItems.map(([key, href], index) => (
            <Link key={key} href={href} onClick={() => setMobileOpen(false)}>
              <span>0{index + 1}</span>{t(key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
