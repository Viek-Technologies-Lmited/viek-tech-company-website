import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.viektech.com"),
  title: "Viek Tech - Innovating with Purpose | Tech Solutions & Academy",
  description:
    "Viek Technologies is a dual-purpose tech hub and academy. We specialize in building purposeful digital solutions for businesses while training the next generation of tech talent.",
  openGraph: {
    title: "Viek Tech - Innovating with Purpose",
    description:
      "Tech solutions and academy specializing in purposeful digital growth.",
    url: "https://www.viektech.com/",
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
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
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
