"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { setAdminAudio, useAudioAdminStore } from "@/store/audio.admin.store";
import { setStart } from "@/store/demo.store";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const nikedal = useAudioAdminStore((store) => store.nikedal);
  const launch = () => {
    if (!nikedal) {
      setAdminAudio();
    }
    setStart(true);
    setClicked(true);
  };
  return (
    <div className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4">
      <Image
        src={"/fond02.jpg"}
        width={3500}
        height={1500}
        alt="Picture of the performance"
        className="absolute object-cover size-full z-0 blur-xs"
      ></Image>
      <div className="max-w-2xl p-6 rounded-lg shadow-md ring-2 ring-accent flex flex-col gap-3 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs">
        <h2 className="text-lg text-center text-primary font-semibold">FIN</h2>
        <p className="text-sm text-justify">
          Evidemment, il s&apos;agit d&apos;un petit échantillon de tableaux de <strong className="italic">smart.phonics</strong>. Et si leurs
          déclenchements ici sont automatisés et rapides, durant la performance, ils le sont par les artistes qui font vivre chaque tableau au gré de
          leur écriture et improvisation avec le public.
        </p>
        <p className="text-sm text-justify">
          <strong>NOTA :</strong> <strong className="italic">smart.phonics</strong> est aussi accompagné d&apos;un écran de projection et d&apos;une
          diffusion sonore avec lesquels les artistes, au plateau, jouent aussi.
        </p>
        <div className="size-fit m-auto mt-2">
          <Button onClick={launch} className="relative z-50 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto">
            <span className="absolute z-0 size-full animate-ping rounded-full bg-primary"></span>
            {!clicked ? (
              <Play fill="var(--foreground)" stroke="var(--foreground)" className="size-full" />
            ) : (
              <Spinner size="medium" className="text-foreground size-9"></Spinner>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
