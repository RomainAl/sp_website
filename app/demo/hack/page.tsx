"use client";

import { HackMemo } from "@/components/hack";
import { cn } from "@/lib/utils";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { useEffect } from "react";

export default function Home() {
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const hack = useAudioAdminStore((store) => store.hack);
  useEffect(() => {
    if (audioContext && hack) {
      hack.node.connect(audioContext.destination);
      audioContext.resume();
      hack.parameters.find((p) => p.name === "PLAY").value = 1.0;
    }
    return () => {
      // audioContext?.suspend();
      if (hack && hack.parameters) hack.parameters.find((p) => p.name === "PLAY").value = 0.0;
      hack?.node.disconnect();
    };
  }, [audioContext, hack]);
  return (
    <div className={cn("h-dvh w-dvw max-w-3xl m-auto", { "opacity-50": !hack })}>
      <HackMemo />
    </div>
  );
}
