import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation/Navigation";


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
        </main>
      </body>
    </html>
  );
}
