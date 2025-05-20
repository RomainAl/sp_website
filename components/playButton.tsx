"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { setAdminAudio, useAudioAdminStore } from "@/store/audio.admin.store";
import { Play } from "lucide-react";
import { useState } from "react";

export function PlayButton() {
  const nikedal = useAudioAdminStore((store) => store.nikedal);
  const init = () => {
    setAdminAudio();
    setClicked(true);
  };
  const [clicked, setClicked] = useState(false);

  if (nikedal) return null;

  return (
    <Button
      onClick={init}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 size-12 rounded-full border-1 border-accent-foreground"
    >
      <span className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary size-full"></span>
      {!clicked ? (
        <Play fill="var(--foreground)" stroke="var(--foreground)" className="size-full" />
      ) : (
        <Spinner size="medium" className="text-foreground size-9"></Spinner>
      )}
    </Button>
  );
}
