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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 aspect-square rounded-full size-fit border-1 border-accent-foreground"
    >
      {!clicked ? (
        <Play fill="var(--foreground)" stroke="none" className="size-full m-auto" size={30} />
      ) : (
        <Spinner size="medium" className="text-foreground"></Spinner>
      )}
    </Button>
  );
}
