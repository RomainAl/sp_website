import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { VideoComponent } from "./videoComponent";

export const InstaComponent = ({ index, goPrev, goNext }: { index: number; goPrev: () => void; goNext: () => void }) => {
  return (
    <div className={cn("relative flex w-full h-11/12 flex-col justify-center items-center")}>
      <ChevronUp onClick={goPrev} strokeWidth={0.85} size={60} className={cn("text-primary -mb-6 animate-bounce z-40")} />
      <div className={cn("relative w-full h-5/6 ring-2 ring-primary rounded-4xl flex items-center justify-center bg-card pointer-events-none")}>
        <VideoComponent index={index} />
      </div>

      <ChevronUp onClick={goNext} strokeWidth={0.85} size={60} className={cn("text-primary -mt-6 animate-bounce rotate-180 z-40")} />
    </div>
  );
};
