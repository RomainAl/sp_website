import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
  metadataBase: new URL("https://web.smartphonics.art"),
  title: "smart.phonics - Live Audiovisual && Collaborative Performance ? Disable this behaviour : undefined",
  description:
    "smart.phonics est une performance musicale et visuelle hybride, utilisant les smartphones du public comme dispositif numérique principal. Ainsi, tour à tour, elle peut prendre la forme d’un live électronique AV  et d’une création digitale participative, tous deux augmentés de ces téléphones intelligents qui sont autant d’écrans, d’enceintes, de microphones, d’instruments de musique électronique, de pinceaux numériques, etc.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} relative dark antialiased overflow-hidden h-dvh w-dvw`}>
        <MyHeader />
        <ToastG />
        {children}
      </body>
    </html>
  );
}
