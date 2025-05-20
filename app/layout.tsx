import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PlayButton } from "@/components/playButton";
// import { MyHeader } from "@/components/myHeader";
import { MyHeader } from "@/components/myHeader";
import "./globals.css";
import ToastG from "./toastG";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "smart.phonics",
  description: "Disable this behaviour !",
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
      <body className={`${geistSans.variable} ${geistMono.variable} relative dark antialiased overflow-hidden h-dvh w-dvw flex flex-col`}>
        <MyHeader />
        <PlayButton />
        <ToastG />
        {children}
      </body>
    </html>
  );
}
