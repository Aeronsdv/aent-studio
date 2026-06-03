import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aent.studio"),
  title: {
    default: "Aent Studio | Elite Digital Design & Development",
    template: "%s | Aent Studio",
  },
  description: "We craft high-performance web applications, custom SaaS panels, and premium digital brand systems that push beyond complexity toward your true potential.",
  keywords: [
    "Aent Studio",
    "Digital Design Studio",
    "Web Development Studio",
    "Next.js Development",
    "SaaS Panel",
    "Brand Systems",
    "Frontend Engineering",
    "UI/UX Design",
    "Premium Design Studio",
    "Istanbul Digital Agency"
  ],
  authors: [{ name: "Aent Studio", url: "https://aent.studio" }],
  creator: "Aent Studio",
  publisher: "Aent Studio",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aent.studio",
    siteName: "Aent Studio",
    title: "Aent Studio | Elite Digital Design & Development",
    description: "We craft high-performance web applications, custom SaaS panels, and premium digital brand systems that push beyond complexity toward your true potential.",
    images: [
      {
        url: "/aent.png",
        width: 1200,
        height: 630,
        alt: "Aent Studio - Digital Design & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aent Studio | Elite Digital Design & Development",
    description: "We craft high-performance web applications, custom SaaS panels, and premium digital brand systems that push beyond complexity toward your true potential.",
    images: ["/aent.png"],
    creator: "@aentstudio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

