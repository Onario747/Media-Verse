import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Navigation from "./components/Navigation/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media Verse",
  description: "Get Latest Info about your favorite Movie's and Tv-show's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <Navigation />
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
