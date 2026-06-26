import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONG Centre Bemba Tagaçira — Pharmacopée Africaine | Abidjan, Côte d'Ivoire",
  description:
    "Organisation ivoirienne dédiée à la valorisation de la pharmacopée africaine par la rigueur scientifique. Recherche biochimique, standardisation et transmission des savoirs ancestraux.",
  keywords: [
    "ONG",
    "pharmacopée africaine",
    "Côte d'Ivoire",
    "Abidjan",
    "ethnobotanique",
    "Scoparia dulcis",
    "médecine traditionnelle",
    "recherche biochimique",
  ],
  authors: [{ name: "ONG Centre Bemba Tagaçira" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ONG Centre Bemba Tagaçira — Pharmacopée Africaine",
    description:
      "La science au service de la tradition, la tradition pour la protection de la vie.",
    type: "website",
    locale: "fr_CI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONG Centre Bemba Tagaçira — Pharmacopée Africaine",
    description:
      "La science au service de la tradition, la tradition pour la protection de la vie.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
