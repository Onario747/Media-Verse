import Navigation from "@/components/Navigation/Navigation";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Media Verse | Get Latest Info about your favorite Movie's and Tv-show's",
  description:
    "Find Organize, and keep track of your favorite movies and Tv-shows collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <Navigation />
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
