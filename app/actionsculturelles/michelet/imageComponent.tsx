import { cn } from "@/lib/utils";
import { setCurrentVidGosses, useInstaGossesUserStore } from "@/store/ac.michelet.store";
import Image from "next/image";
import { ComponentPropsWithoutRef, useEffect } from "react";

type VideoComponentType = ComponentPropsWithoutRef<"div"> & {
  index: number;
  currentIndex?: number;
  pathVid: string;
};

export const ImageComponent = ({ index, currentIndex, pathVid, ...props }: VideoComponentType) => {
  const currentVid_loc = useInstaGossesUserStore((store) => store.currentVidGosses_Loc[index]);
  const isElon = pathVid.indexOf("elon") !== -1;
  const isVertov = pathVid.indexOf("vertov") !== -1;

  useEffect(() => {
    if (currentIndex !== undefined && index - currentIndex === 0) {
      setCurrentVidGosses({ currentVidGosses: currentVid_loc });
    }
  }, [currentIndex, index]);

  return (
    <div className={cn("relative size-full pointer-events-auto", props.className)}>
      <div className="size-full">
        <Image
          src={`/acmichelet/${pathVid}`}
          alt="rien"
          width={720}
          height={1280}
          className={cn("z-0 object-cover rounded-4xl size-full", { "rounded-none object-contain": isElon, "rounded-none": isVertov })}
        />
      </div>
    </div>
  );
};
