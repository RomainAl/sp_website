"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "motion/react";
import Image from "next/image";

// import {
//   setAudioClimaticsdisasters,
//   setAudioFlashesTech,
//   setAudioHack,
//   setAudioInstru0_drone,
//   setAudioInstrus,
//   setAudioNikedal,
//   setAudioVerton,
//   setSetAudio,
// } from "@/store/audio.admin.store";

export default function Home() {
  console.log("RENDER ACCUEIL");
  // setSetAudio(async () => {
  //   await setAudioNikedal();
  //   await setAudioHack();
  //   await setAudioInstrus();
  //   await setAudioInstru0_drone();
  //   await setAudioClimaticsdisasters();
  //   await setAudioFlashesTech();
  //   await setAudioVerton();
  // });
  // return <Nikedal />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4"
    >
      <Image
        src={"/fond02.jpg"}
        width={3500}
        height={1500}
        alt="Picture of the performance"
        className="absolute object-cover size-full top-0 left-0 z-0 blur-sm"
      ></Image>
      <div className="max-w-2xl p-6 sm:p-10 rounded-lg shadow-md ring-2 ring-accent flex flex-col gap-3 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs">
        <h2 className="text-lg text-primary font-semibold">Performance en cours</h2>
        <p className="text-sm text-justify">
          <strong className="italic">smart.phonics</strong> utilise vos smartphones comme dispositif numérique principal. Pour accéder au site Web de
          la performance, veuillez d&apos;abord vous connectez au wifi <strong className="text-primary font-black">&quot;smartphonics&quot;</strong>.
        </p>
        <Button asChild>
          <a href="WIFI:T:nopass;S:WifiTest;;">Se connecter au Wi-Fi (Android)</a>
        </Button>
        <Button asChild>
          <a href="intent://settings/wifi#Intent;scheme=android;package=com.android.settings;end">Ouvrir les réglages Wi-Fi</a>
        </Button>
        <Button asChild>
          <a href={"App-Prefs:root=WIFI"}>Ouvrir les réglages Wi-Fi (iPhone/iPad)</a>
        </Button>
        <div className="size-fit m-auto mt-2">
          <Button className="relative z-40 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto">
            {/* <span className="absolute z-0 size-full animate-ping rounded-full bg-primary"></span> */}
            <Spinner size="medium" className="text-foreground size-9"></Spinner>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
