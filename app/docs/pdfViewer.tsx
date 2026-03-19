"use client";

import { Spinner } from "@/components/ui/spinner";
import { Download } from "lucide-react"; // Import des icônes
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth > 800 ? 800 : window.innerWidth * 0.95);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="relative flex flex-col items-center bg-zinc-950 h-screen overflow-y-auto w-full scrollbar-thin scrollbar-thumb-zinc-700">
      <a
        href={file}
        download
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 font-medium group"
      >
        <Download size={20} className="group-hover:bounce" />
        <span className="hidden md:inline">Télécharger</span>
      </a>

      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="relative h-dvh w-dvw flex flex-col gap-2 justify-center items-center">
            <Spinner size="xxlarge" />
          </div>
        }
        className="flex flex-col gap-8 py-12"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={index} className="shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 rounded-sm overflow-hidden">
            <Page pageNumber={index + 1} width={width} renderTextLayer={true} className="max-w-full" />
          </div>
        ))}
      </Document>
    </div>
  );
}
