"use client";

import { Spinner } from "@/components/ui/spinner";
import { Download, Minus, Plus } from "lucide-react";
import { useEffect, useState, useRef } from "react"; // Ajout de useRef
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [width, setWidth] = useState(0);
  const [scale, setScale] = useState(1);

  // 1. Ref pour accéder au scroll du parent
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth > 800 ? 800 : window.innerWidth * 0.95);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 2. Fonction de zoom intelligente
  const handleZoom = (delta: number) => {
    const container = containerRef.current;
    if (!container) return;

    // Sauvegarde de la position relative (pourcentage du scroll actuel)
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = container;

    // On calcule le centre de la vue actuelle
    const centerX = (scrollLeft + clientWidth / 2) / scrollWidth;
    const centerY = (scrollTop + clientHeight / 2) / scrollHeight;

    setScale((prev) => {
      const nextScale = Math.max(0.5, Math.min(3, prev + delta));

      // 3. Après le rendu du nouveau scale, on réajuste le scroll
      // On utilise un petit timeout pour laisser le temps à react-pdf de redessiner
      setTimeout(() => {
        if (containerRef.current) {
          const newScrollWidth = containerRef.current.scrollWidth;
          const newScrollHeight = containerRef.current.scrollHeight;

          containerRef.current.scrollLeft = centerX * newScrollWidth - clientWidth / 2;
          containerRef.current.scrollTop = centerY * newScrollHeight - clientHeight / 2;
        }
      }, 50);

      return nextScale;
    });
  };

  return (
    <div
      ref={containerRef} // 4. Liaison de la ref
      className="relative h-screen w-full overflow-auto bg-accent scrollbar-thin scrollbar-thumb-zinc-700"
    >
      {/* BOUTONS FLOTTANTS */}
      <div className="fixed bottom-8 right-8 z-50 flex landscape:flex-col portrait:flex-row gap-3 items-end">
        <button
          onClick={() => handleZoom(0.4)}
          disabled={scale >= 3}
          className="flex h-12 w-12 items-center justify-center bg-primary hover:bg-zinc-800 text-white rounded-full shadow-2xl transition-all"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => handleZoom(-0.4)}
          disabled={scale <= 0.5}
          className="flex h-12 w-12 items-center justify-center bg-primary hover:bg-zinc-800 text-white rounded-full shadow-2xl transition-all"
        >
          <Minus size={22} strokeWidth={2.5} />
        </button>
        <a
          href={file}
          download
          className="flex h-12 w-12 items-center justify-center bg-primary hover:bg-zinc-800 text-white rounded-full shadow-2xl transition-all group"
        >
          <Download size={20} className="group-hover:animate-bounce" />
        </a>
      </div>

      <div className="grid justify-items-center min-w-full min-h-full py-12">
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="fixed inset-0 flex justify-center items-center bg-zinc-950 z-10">
              <Spinner size="xxlarge" />
            </div>
          }
          className="m-0 p-0 border-none flex flex-col gap-8 items-center"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div
              key={index}
              className="shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 rounded-sm overflow-hidden bg-white"
              style={{ width: width * scale }}
            >
              <Page pageNumber={index + 1} width={width} scale={scale} renderTextLayer={true} className="m-0 p-0 block" />
            </div>
          ))}
        </Document>
      </div>

      <style jsx global>{`
        .react-pdf__Page__canvas {
          margin: 0 auto !important;
          display: block !important;
        }
        .react-pdf__Page {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}
