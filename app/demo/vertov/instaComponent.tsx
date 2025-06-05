import { InstaAvatarJpgMemo } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { InstaComLike } from "./instaComLike";
import { VideoComponent } from "./videoComponent";

export const InstaComponent = ({
  index,
  currentIndex,
  goPrev,
  goNext,
}: {
  index: number;
  currentIndex?: number;
  goPrev: () => void;
  goNext: () => void;
}) => {
  return (
    <div className={cn("relative flex size-full flex-col justify-center items-center")}>
      <div className="absolute size-full flex flex-row justify-between items-center z-40 pointer-events-none">
        <ChevronUp
          onClick={goPrev}
          strokeWidth={0.85}
          size={60}
          className="text-primary -rotate-90 -ml-3 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
        <ChevronUp
          onClick={goNext}
          strokeWidth={0.85}
          size={60}
          className="text-primary rotate-90 -mr-3 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
      </div>

      <div className={cn("relative size-full ring-2 flex items-center justify-center bg-card pointer-events-none ring-accent rounded-none")}>
        <div className="absolute top-0 size-full flex flex-col z-20 justify-between">
          <div className={cn("flex flex-col justify-between p-4 gap-3 rounded-t-4xl z-20 rounded-none bg-transparent backdrop-blur-none")}>
            <div className="flex flex-row gap-3 items-center text-sm">
              <div className="size-20">
                <InstaAvatarJpgMemo name={"vertov"} />
              </div>
              <div>
                <strong className="text-primary font-black text-sm xs:text-xl">Dziga Vertov</strong>
                {index == 0 && <p className="text-xs italic text-center">{"Contenu suggéré"}</p>}
                {index == 1 && <p className="text-xs italic text-center">{"Reels"}</p>}
                {index == 2 && <p className="text-xs italic text-center">{"Story pour toi"}</p>}
              </div>
            </div>
          </div>

          <div className={cn("p-4 w-full flex flex-row gap-3 items-center z-20  bg-[#00000099] backdrop-blur-xs border-b-2 border-b-accent")}>
            <p className="text-xs italic text-primary">#ManWithAMovieCamera #LaSixièmePartieDuMonde #SymphonieDuDonbass #Berceuse #CinemaOeil</p>
            <InstaComLike />
          </div>
        </div>
        <VideoComponent index={index} currentIndex={currentIndex} />
      </div>
    </div>
  );
};
