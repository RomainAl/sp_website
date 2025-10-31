"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAudioAdminStore } from "@/store/audio.admin.store";

import { Play } from "lucide-react";

export function PlayButton() {
  const setAudio = useAudioAdminStore((store) => store.setAudio);
  const onLoad = useAudioAdminStore((store) => store.onLoad);
  return (
    <Button
      onClick={setAudio}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto"
    >
      <span className="absolute z-0 size-full animate-ping rounded-full bg-primary"></span>
      {!onLoad ? (
        <Play fill="var(--foreground)" stroke="var(--foreground)" className="size-full" />
      ) : (
        <Spinner size="medium" className="text-foreground size-9"></Spinner>
      )}
    </Button>
  );
}
