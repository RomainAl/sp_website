import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// import { MyHeader } from "@/components/myHeader";
import "./globals.css";
import Layout_mine from "./layout_mine";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://web.smartphonics.art"),
  title: "smart.phonics - Live audiovisuel & Performance collaborative",
  description:
    "smart.phonics est une performance musicale et visuelle hybride, utilisant les smartphones du public comme dispositif numérique principal.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} relative dark antialiased overflow-hidden overscroll-none h-dvh w-dvw`}>
        <Layout_mine>{children}</Layout_mine>
      </body>
    </html>
  );
}
