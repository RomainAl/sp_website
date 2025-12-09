import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { setCurrentVidGosses, setInstaGossesPlayVid, useInstaGossesUserStore } from "@/store/ac.michelet.store";
import { CirclePlay } from "lucide-react";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

type VideoComponentType = ComponentPropsWithoutRef<"div"> & {
  index: number;
  currentIndex?: number;
  pathVid: string;
};

export const VideoComponent = ({ index, currentIndex, pathVid, ...props }: VideoComponentType) => {
  const currentVid_loc = useInstaGossesUserStore((store) => store.currentVidGosses_Loc[index]);
  const ref = useRef<HTMLVideoElement>(null);
  const refS = useRef<HTMLSourceElement>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const isElon = pathVid.indexOf("elon") !== -1;
  const isVertov = pathVid.indexOf("vertov") !== -1;
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (refS.current && ref.current) {
      ref.current.load();
      ref.current.playbackRate = 1;
      if (currentIndex !== undefined && index - currentIndex === 0) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [currentVid_loc]);

  useEffect(() => {
    if (ref.current) {
      if (currentIndex !== undefined && index - currentIndex === 0) {
        setCurrentVidGosses({ currentVidGosses: currentVid_loc });
        ref.current.play();
      } else {
        // ref.current.muted = true;
        ref.current.pause();
      }
    }
    return () => {};
  }, [currentIndex, index]);

  useEffect(() => {
    console.log("TODO : Ecoute des event videos étranges !?");
    if (ref.current) {
      ref.current.onloadeddata = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onloadeddata");
        setPending(false);
      };
      ref.current.onpause = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onpause");
        setIsPlaying(false);
        setPending(false);
      };
      ref.current.onplay = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onplay");
        setIsPlaying(true);
        setPending(false);
      };
      ref.current.onerror = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onerror");
        setIsPlaying(false);
      };
      ref.current.onplaying = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onplaying");
        setIsPlaying(true);
        setPending(false);
      };
      ref.current.onprogress = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onprogress");
        // setIsPlaying(true);
        setPending(true);
      };
      ref.current.onended = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("ended");
        // setIsPlaying(true);
        setPending(true);
      };
      ref.current.onwaiting = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("waiting");
        // setIsPlaying(true);
        setPending(true);
      };
    }
  }, []);

  return (
    <div
      onClick={() => {
        if (ref.current) {
          // if (!isPlaying) {
          ref.current.play().then(() => setIsPlaying(true));
          setInstaGossesPlayVid();
          // }
          ref.current.muted = false;
          ref.current.currentTime = 0;
        }
      }}
      className={cn("relative size-full pointer-events-auto", props.className)}
    >
      {!isPlaying && pending && (
        <div
          className={cn("absolute top-0 flex size-full items-center justify-center bg-[#00000099] z-10", {
            "bg-[#e5733399]": isVertov,
            "rounded-4xl": !isVertov,
          })}
        >
          <div className="relative size-full">
            <div className="absolute top-0 size-full flex items-center justify-center">
              <CirclePlay size={70} color="white" fill="rgb(229, 115, 51)" absoluteStrokeWidth />
            </div>
            <div className="absolute top-0 size-full flex items-center justify-center">
              <Spinner size="xxlarge"></Spinner>
            </div>
          </div>
        </div>
      )}
      {!isPlaying && !pending && (
        <div
          className={cn("absolute top-0 flex size-full  items-center justify-center bg-[#00000099] z-10", {
            "bg-[#e5733399]": isVertov,
            "rounded-4xl": !isVertov,
          })}
        >
          <CirclePlay size={70} color="white" fill="rgb(229, 115, 51)" absoluteStrokeWidth />
        </div>
      )}
      <div className="size-full">
        <video
          className={cn("z-0 object-cover rounded-4xl size-full", { "rounded-none object-contain": isElon, "rounded-none": isVertov })}
          ref={ref}
          autoPlay={isVertov || isElon ? true : false}
          muted={isVertov || isElon ? true : false}
          playsInline
          loop
        >
          <source ref={refS} src={`/acmichelet/${pathVid}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <canvas ref={refCanvas} width={1} height={1}></canvas>
      </div>
    </div>
  );
};
