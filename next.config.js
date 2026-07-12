import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default withNextIntl({
  turbopack: { root: projectRoot },
});
