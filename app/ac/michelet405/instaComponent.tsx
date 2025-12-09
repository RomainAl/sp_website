import { InstaAvatar } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { useInstaGossesUserStore } from "@/store/ac.michelet.store";
import { nicoTexts } from "@/store/txt.store";
import { ChevronUp } from "lucide-react";
import { ImageComponent } from "./imageComponent";
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
  postPathVid?: string;
  goPrev: () => void;
  goNext: () => void;
}) => {
  const currentVid_loc = useInstaGossesUserStore((store) => store.currentVidGosses_Loc[index]);
  const vidMeta = useInstaGossesUserStore((store) => store.vidGossesMeta[currentVid_loc]);
  const textsRand = Math.random() < 0 ? true : false;
  const iTexts = Math.floor(Math.random() * nicoTexts.length);
  const isElon = false;
  const isVertov = false;

  return (
    <div className={"relative flex w-full h-11/12 md:w-2/3 md:m-auto flex-col justify-center items-center max-h-svh"}>
      <ChevronUp
        onClick={goPrev}
        strokeWidth={0.85}
        size={60}
        className={cn("text-primary -mb-6 animate-bounce z-40", { "text-accent": isElon || isVertov })}
      />

      <div className="relative w-full h-full ring-2 ring-primary rounded-4xl flex items-center justify-center bg-card pointer-events-none">
        <div className="absolute top-0 size-full flex flex-col justify-between z-20">
          <div className="flex flex-col justify-between bg-[#00000099] px-4 py-2  gap-3 rounded-t-4xl z-20 backdrop-blur-xs">
            <div className="flex flex-row gap-3 items-center text-sm">
              <InstaAvatar name={vidMeta.name} />
              <div>
                <strong className="text-primary">{vidMeta.name}</strong>
              </div>
            </div>

            {!isElon && !isVertov && <p className="text-xxs xs:text-xs">{vidMeta.description}</p>}
          </div>
          {textsRand && (
            <div
              className={cn(
                "flex flex-1 text-foreground justify-center items-center font-bold text-center p-4 text-sm xs:text-4xl overflow-hidden",
                { "xs:text-3xl font-bold": nicoTexts[iTexts].length > 100 },
                { "xs:text-2xl font-bold": nicoTexts[iTexts].length > 200 },
                { "xs:text-xl font-bold": nicoTexts[iTexts].length > 300 },
                { "xs:text-sm font-bold": nicoTexts[iTexts].length > 400 }
              )}
            >
              {nicoTexts[iTexts]}
            </div>
          )}
          {!isVertov && (
            <div
              className={cn("px-4 py-2 w-full flex flex-row gap-3 items-center rounded-b-4xl z-20  bg-[#00000099] backdrop-blur-xs", {
                "rounded-none": isElon,
              })}
            >
              <p className="text-xxs xs:text-xs italic text-primary">
                {isElon ? "#X #AvenirMeilleur #MAGA #TheFuture #Mars #NewGoldenAge #SecureBorders" : vidMeta.hashtag}
              </p>

              <InstaComLike />
            </div>
          )}
        </div>
        {textsRand && (
          <div
            className={cn(
              "rounded-4xl size-full bg-[#ac4e0299] xs:bg-gradient-to-r xs:from-primary xs:to-accent",
              { "xs:bg-gradient-to-l": iTexts % 4 === 0 },
              { "xs:bg-gradient-to-t": iTexts % 4 === 1 },
              { "xs:bg-radial": iTexts % 4 === 2 }
            )}
          ></div>
        )}
        {vidMeta.file.includes("mp4") ? (
          <VideoComponent index={index} currentIndex={currentIndex} pathVid={vidMeta.file} className={cn("block", { hidden: textsRand })} />
        ) : (
          <ImageComponent index={index} currentIndex={currentIndex} pathVid={vidMeta.file} className={cn("block", { hidden: textsRand })} />
        )}
      </div>

      <ChevronUp
        onClick={goNext}
        strokeWidth={0.85}
        size={60}
        className={cn("text-primary -mt-6 animate-bounce rotate-180 z-40", { "text-accent": isElon })}
      />
    </div>
  );
};
