"use client";

import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// On charge le viewer SANS SSR
const Viewer = dynamic(() => import("./pdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="relative h-dvh w-dvw flex flex-col gap-2 justify-center items-center">
      <Spinner size="xxlarge" />
      <p className="text-foreground">Chargement du lecteur...</p>
    </div>
  ),
});

function PdfContent() {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("file") || "smartphonics_DOSSIER.pdf";
  const filePath = `/${fileName}`;

  return <Viewer file={filePath} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* ⚠️ IMPORTANT : useSearchParams nécessite un Suspense en Next.js */}
      <Suspense
        fallback={
          <div className="relative h-dvh w-dvw flex justify-center items-center">
            <Spinner size="xxlarge" />
          </div>
        }
      >
        <PdfContent />
      </Suspense>
    </main>
  );
}
