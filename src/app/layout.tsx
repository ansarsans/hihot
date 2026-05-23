import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hihotel.kz"),
  title: {
    default: "Hi Hotel",
    template: "%s | Hi Hotel",
  },
  description:
    "Hi Hotel is a cinematic boutique hospitality experience in Almaty and Astana.",
  openGraph: {
    title: "Hi Hotel",
    description:
      "Cinematic boutique hospitality in Almaty and Astana. Calm luxury, modern comfort, and intentional design.",
    type: "website",
    siteName: "Hi Hotel",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hi Hotel",
    description:
      "Cinematic boutique hospitality in Almaty and Astana. Calm luxury and modern comfort.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#090b0e] font-sans text-[#f4efe7]">
        {children}
      </body>
    </html>
  );
}
