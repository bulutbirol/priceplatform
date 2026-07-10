import { getRequestConfig } from "next-intl/server";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
    locales: ["en", "tr", "de", "es", "fr"],
    defaultLocale: "en",
    localePrefix: "always",
});
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? "en";
    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
