import { cn } from "@/lib/utils";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

export const VideoComponent = ({ index }: { index: number }) => {
  const [filter, setFilter] = useState(false);

  useInterval(() => {
    setFilter(true);
    setTimeout(() => {
      setFilter(false);
    }, Math.random() * 3000);
  }, 4500);

  return (
    <div className="relative size-full pointer-events-auto">
      <div className="size-full">
        <video
          className={cn("z-0 rounded-4xl size-full object-cover", { "hue-rotate-180 brightness-125 contrast-200 size-full object-cover": filter })}
          autoPlay
          muted
          playsInline
          loop
        >
          <source src={`video${index + 9}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
