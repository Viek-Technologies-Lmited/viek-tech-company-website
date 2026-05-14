import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viek Tech - Innovating with Purpose | Tech Solutions & Academy",
  description:
    "Viek Technologies is a dual-purpose tech hub and academy. We specialize in building purposeful digital solutions for businesses while training the next generation of tech talent.",
  generator: "v0.app",
  // --- ADD THIS SECTION BELOW ---
  openGraph: {
    title: "Viek Tech - Innovating with Purpose",
    description:
      "Tech solutions and academy specializing in purposeful digital growth.",
    url: "https://v0-viek-tech-company-website.vercel.app/",
    siteName: "Viek Tech",
    images: [
      {
        url: "/images/logo2.jpeg", // Points to your logo in public/images/
        width: 1200,
        height: 630,
        alt: "Viek Tech Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viek Tech",
    description: "Innovating with Purpose",
    images: ["/images/logo2.jpeg"], // Same logo for Twitter/X
  },
  // --- END OF ADDED SECTION ---
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
