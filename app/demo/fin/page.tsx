"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  setAudioClimaticsdisasters,
  setAudioFlashesTech,
  setAudioHack,
  setAudioInstru0_drone,
  setAudioInstrus,
  setAudioNikedal,
  setAudioVerton,
  useAudioAdminStore,
} from "@/store/audio.admin.store";
import { setStart } from "@/store/demo.store";
import { House, RotateCcw, SquareMousePointer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const hack = useAudioAdminStore((store) => store.hack);
  const launch = async () => {
    setClicked(true);
    if (!hack) {
      await setAudioHack().then(() => {
        setStart(true);
      });
      await setAudioInstrus();
      await setAudioNikedal();
      await setAudioInstru0_drone();
      await setAudioClimaticsdisasters();
      await setAudioFlashesTech();
      await setAudioVerton();
    } else {
      setStart(true);
    }
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
        <h2 className="text-lg text-center text-primary font-semibold">FIN ET MERCI !</h2>
        <Link href={"/list"} className="text-sm text-primary flex flex-row items-center gap-3 justify-center">
          <p>Rejouer un tableau en particulier</p> <SquareMousePointer size={20} />
        </Link>
        <p className="text-sm text-justify">
          Evidemment, il s&apos;agit d&apos;un petit échantillon de tableaux de <strong className="italic">smart.phonics</strong>. Et si leurs
          déclenchements sont, ici, automatisés et rapides, durant la performance, ils le sont, en live, par les artistes qui font vivre chaque
          tableau au gré de leur écriture et de leur improvisation avec le public.
        </p>
        <p className="text-sm text-justify">
          <strong>NOTA :</strong> <strong className="italic">smart.phonics</strong> est aussi accompagné d&apos;un écran de projection et d&apos;une
          diffusion sonore avec lesquels les artistes, au plateau, jouent également.
        </p>
        <div className="w-1/2 m-auto mt-2 flex flex-row justify-evenly">
          <Button onClick={launch} className="z-50 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto">
            {!clicked ? (
              <RotateCcw strokeWidth={1} stroke="var(--foreground)" className="size-full" />
            ) : (
              <Spinner size="medium" className="text-foreground size-9"></Spinner>
            )}
          </Button>
          <Button asChild className="z-50 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto">
            <Link href={"/presentation"}>
              <House strokeWidth={1} stroke="var(--foreground)" className="size-full" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
