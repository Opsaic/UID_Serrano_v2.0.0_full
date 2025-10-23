import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Providers from "@/lib/theme";
export const metadata = { title: "UID Serrano v1.0.0", description: "Project Planning & Execution System" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers><Analytics /><Analytics />
      </body>
    </html>
  );
}
