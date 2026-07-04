import "./globals.css";
import { getSiteData } from "@/lib/site-data";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSiteData();
  const theme = data?.settings?.publicTheme || "amber";

  return (
    <html lang="en" className={`theme-${theme}`}>
      <body>{children}</body>
    </html>
  );
}