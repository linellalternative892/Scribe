import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { getConfig } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const config = getConfig();

export const metadata: Metadata = {
  title: {
    default: `${config.name} Documentation`,
    template: config.seo?.titleTemplate ?? `%s | ${config.name} Docs`,
  },
  description: config.description,
  metadataBase: config.url ? new URL(config.url) : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.url,
    siteName: config.name,
    title: `${config.name} Documentation`,
    description: config.description,
    images: config.seo?.ogImage
      ? [
          {
            url: config.seo.ogImage,
            width: 1200,
            height: 630,
            alt: `${config.name} Documentation`,
          },
        ]
      : [],
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.name} Documentation`,
    description: config.description,
    images: config.seo?.ogImage ? [config.seo.ogImage] : [],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
