import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
const localeMessages = {
    en: () => import("../messages/en.json").then((module) => module.default),
    tr: () => import("../messages/tr.json").then((module) => module.default),
    de: () => import("../messages/de.json").then((module) => module.default),
    es: () => import("../messages/es.json").then((module) => module.default),
    fr: () => import("../messages/fr.json").then((module) => module.default),
};
export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
    if (!locale || !routing.locales.includes(locale)) {
        locale = routing.defaultLocale;
    }
    return {
        locale,
        messages: await localeMessages[locale](),
    };
});
