"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { Play } from "lucide-react";
import { useState } from "react";

export function PlayButton({ onLoad = false, init }: { onLoad?: boolean; init: () => void }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      onClick={
        clicked
          ? () => null
          : () => {
              init();
              setClicked(true);
            }
      }
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 size-12 md:size-16 rounded-full border-1 border-accent-foreground pointer-events-auto"
    >
      <span className="absolute z-0 size-full animate-ping rounded-full bg-primary"></span>
      {!clicked && !onLoad ? (
        <Play fill="var(--foreground)" stroke="var(--foreground)" className="size-full" />
      ) : (
        <Spinner size="medium" className="text-foreground size-9"></Spinner>
      )}
    </Button>
  );
}
