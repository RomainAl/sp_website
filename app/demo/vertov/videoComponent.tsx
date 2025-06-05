import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { CirclePlay } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const VideoComponent = ({ index, currentIndex }: { index: number; currentIndex?: number }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (ref.current) {
      if (currentIndex !== undefined && index - currentIndex === 0) {
        ref.current.play().then(() => {
          setIsPlaying(true);
        });
      } else {
        ref.current.pause();
        setIsPlaying(false);
      }
    }
  }, [currentIndex, index]);

  useEffect(() => {
    console.log("TODO : Ecoute des event videos étranges !?");
    if (ref.current) {
      ref.current.onloadeddata = () => {
        setPending(false);
      };
      ref.current.onpause = () => {
        setIsPlaying(false);
        setPending(false);
      };
      ref.current.onplay = () => {
        setIsPlaying(true);
        setPending(false);
      };
      ref.current.onerror = () => {
        setIsPlaying(false);
      };
      ref.current.onplaying = () => {
        setIsPlaying(true);
        setPending(false);
      };
      ref.current.onwaiting = () => {
        // setIsPlaying(true);
        setPending(true);
      };
    }
  }, []);

  return (
    <div
      onClick={() => {
        if (ref.current) {
          if (!isPlaying) {
            ref.current.play().then(() => setIsPlaying(true));
          }
          // ref.current.currentTime = 0;
        }
      }}
      className="relative size-full pointer-events-auto"
    >
      {!isPlaying && pending && (
        <div className={cn("absolute top-0 flex size-full items-center justify-center z-10 bg-[#e5733399]")}>
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
        <div className={cn("absolute top-0 flex size-full  items-center justify-center bg-[#e5733399] z-10")}>
          <CirclePlay size={70} color="white" fill="rgb(229, 115, 51)" absoluteStrokeWidth />
        </div>
      )}
      <div className="size-full">
        <video className={cn("z-0 object-cover rounded-none size-full")} ref={ref} autoPlay={true} muted={true} playsInline loop>
          <source src={`/vertov${index}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
