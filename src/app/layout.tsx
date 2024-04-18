import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Navigation from "./components/Navigation/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media Verse",
  description:
    "Find Organize, and keep track of your favorite movies and tv-shows collection.",
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
