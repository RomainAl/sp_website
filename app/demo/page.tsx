"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  setAudioClimaticdisasters,
  setAudioFlashesTech,
  setAudioHack,
  setAudioInstru0_drone,
  setAudioInstrus,
  setAudioNikedal,
  setAudioVerton,
  useAudioAdminStore,
} from "@/store/audio.admin.store";
import { setStart } from "@/store/demo.store";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const hack = useAudioAdminStore((store) => store.hack);
  const onLoad = useAudioAdminStore((store) => store.onLoad);

  useEffect(() => {
    if (clicked && !onLoad) setStart(true);
  }, [onLoad, clicked]);

  const launch = async () => {
    setClicked(true);
    if (!onLoad)
      if (!hack) {
        await setAudioHack().then(() => {
          setStart(true);
        });
        await setAudioInstrus();
        await setAudioNikedal();
        await setAudioInstru0_drone();
        await setAudioClimaticdisasters();
        await setAudioFlashesTech();
        await setAudioVerton();
      } else {
        setStart(true);
      }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4"
    >
      <Image
        src={"/fond01.jpg"}
        width={3500}
        height={1500}
        alt="Picture of the performance"
        className="absolute object-cover size-full top-0 left-0 z-0 blur-sm"
      ></Image>
      <div className="max-w-2xl p-6 rounded-lg shadow-md ring-2 ring-accent flex flex-col gap-3 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs">
        <h2 className="text-lg text-primary font-semibold">Démonstration de smart.phonics</h2>
        <p className="text-sm text-justify">
          <strong className="italic">smart.phonics</strong> utilise les smartphones du public comme dispositif numérique principal, accompagné
          d&apos;un écran de projection et d&apos;une diffusion sonore avec lesquels les artistes, au plateau, jouent également. Cette démonstration
          en ligne donne simplement un aperçu de l&apos;expérience du spectateur lors de la performance.
        </p>

        <p className="text-sm text-justify">
          <strong>NOTA :</strong> Il s&apos;agit d&apos;un petit échantillon de tableaux de <strong className="italic">smart.phonics</strong>. Et si
          leurs déclenchements, ici, sont automatisés et rapides, en live, ils le sont par les artistes qui font vivre chaque tableau selon la
          narration de la performance.
        </p>
        <p className="text-sm text-justify">
          <strong>Durée :</strong> ~ 3 min
        </p>
        <div className="size-fit m-auto mt-2">
          <Button onClick={launch} className="relative z-40 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto">
            <span className="absolute z-0 size-full animate-ping rounded-full bg-primary"></span>
            {!clicked ? (
              <Play fill="var(--foreground)" stroke="var(--foreground)" className="size-full" />
            ) : (
              <Spinner size="medium" className="text-foreground size-9"></Spinner>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
