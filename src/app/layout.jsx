import "./globals.css";

const themeBootScript = `
  (() => {
    try {
      const preference = localStorage.getItem("theme") || "system";
      const isDark = preference === "dark" ||
        (preference === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
      const theme = isDark ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = theme;
    } catch (_) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  })();
`;

export const metadata = {
  title: {
    default: "Fiyatın Anatomisi",
    template: "%s · Fiyatın Anatomisi",
  },
  description: "Teknolojik ürünlerin fiyatını oluşturan parçaları basitçe anlayın.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
