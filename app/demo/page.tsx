"use client";

import { Button } from "@/components/ui/button";
import { setStart } from "@/store/demo.store";
import { Play } from "lucide-react";

export default function Home() {
  const launch = () => {
    setStart(true);
  };
  return (
    <div className="h-dvh w-dvw max-w-3xl m-auto flex flex-col items-center justify-center gap-3 p-4">
      <div className="bg-card p-6 rounded-lg shadow-md ring-1 ring-accent flex flex-col gap-3">
        <h2 className="text-lg text-primary font-semibold">Démonstration de smart.phonics</h2>
        <p className="text-sm text-justify">
          <strong className="italic">smart.phonics</strong> utilise les smartphones du public comme dispositif numérique principal, accompagné
          d&apos;un écran de projection et d&apos;une diffusion sonore sur lesquels les artistes, au plateau, jouent aussi.
        </p>
        <p className="text-sm">Cette démonstration en ligne donne un aperçu de l&apos;expérience du spectateur lors de la performance.</p>
        <p className="text-sm">
          <strong>NOTA :</strong> Evidemment, il s&apos;agit d&apos;un petit échantillon de tableaux de{" "}
          <strong className="italic">smart.phonics</strong>. Et si leurs déclenchements ici sont automatisés et rapides, en Live, ils le sont par les
          artistes qui font vivre chaque tableau au gré de leur écriture et improvisation.
        </p>
        <div className="size-fit m-auto">
          <Button onClick={launch} className="relative z-50 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto">
            <span className="absolute z-0 size-full animate-ping rounded-full bg-primary"></span>
            <Play fill="var(--foreground)" stroke="var(--foreground)" className="size-full" />
          </Button>
        </div>
      </div>
    </div>
  );
}
