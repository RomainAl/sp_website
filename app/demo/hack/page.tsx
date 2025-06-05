"use client";

import { HackMemo } from "@/components/hack";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { useEffect } from "react";

export default function Home() {
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const hack = useAudioAdminStore((store) => store.hack);
  useEffect(() => {
    if (audioContext && hack) {
      hack.node.connect(audioContext.destination);
      audioContext.resume();
      hack.parameters.find((p) => p.name === "OFF-ON").value = 1.0;
    }
    return () => {
      // audioContext?.suspend();
      hack?.node.disconnect();
    };
  }, [audioContext, hack]);
  return (
    <div className="h-dvh w-dvw  max-w-3xl m-auto">
      <HackMemo />
    </div>
  );
}
