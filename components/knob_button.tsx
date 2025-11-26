import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  Kname: string;
  Kinitval: number;
  setVal: (val: number, name?: string) => void;
  midiCC?: number;
  color?: string;
};

export function Knob_button({ Kname, Kinitval, setVal, midiCC, color, children }: PropsWithChildren<Props>) {
  const [count, setCount] = useState(0);
  // const al_out = useMidiStore((store) => store.al_out);
  const refPath = useRef<SVGPathElement>(null);
  const refDiv = useRef<HTMLDivElement>(null);
  const viewBoxSize = 110;
  const R = 50;
  const stroke = 10;
  const startCircle = useMemo(() => {
    const a = (2.5 * Math.PI) / 2;
    const x = R * Math.cos(a) + viewBoxSize / 2;
    const y = -(R * Math.sin(a)) + viewBoxSize / 2;
    return { x, y, a };
  }, []);

  const stopCircle = useMemo(() => {
    const a = (-0.5 * Math.PI) / 2;
    const x = R * Math.cos(a) + viewBoxSize / 2;
    const y = -(R * Math.sin(a)) + viewBoxSize / 2;
    return { x, y };
  }, []);

  const handleClick = () => {
    if (refPath.current) {
      if (Kname.includes("_trig10")) {
        refPath.current.style.fill = color === "white" ? "var(--foreground)" : "var(--primary)";
        setCount((count) => count + 1);
        setVal(count + 1, Kname);
        setTimeout(() => {
          if (refPath.current) refPath.current.style.fill = "none";
        }, 10000);
      } else if (Kname.includes("_trig")) {
        refPath.current.style.fill = color === "white" ? "var(--foreground)" : "var(--primary)";
        setCount((count) => count + 1);
        setVal(count + 1, Kname);
        setTimeout(() => {
          if (refPath.current) refPath.current.style.fill = "none";
        }, 500);
      } else {
        if (!refPath.current.style.fill || refPath.current.style.fill === "none") {
          refPath.current.style.fill = color === "white" ? "var(--foreground)" : "var(--primary)";
          setVal(1, Kname);
        } else {
          refPath.current.style.fill = "none";
          setVal(0, Kname);
        }
      }
    }
  };

  useEffect(() => {
    if (refPath.current && Kinitval) refPath.current.style.fill = color === "white" ? "var(--foreground)" : "var(--primary)";
  }, [Kinitval, color, midiCC]);

  return (
    <div ref={refDiv} onClick={handleClick} className={cn("flex size-full touch-none flex-col items-center justify-center")}>
      <div className="absolute top-0 left-0 size-full flex justify-center items-center z-40">{children}</div>
      {Kname.includes("_count") && (
        <div className="absolute top-0 size-full flex items-center justify-center">
          <p>{count}</p>
        </div>
      )}
      <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} strokeWidth={stroke}>
        <path
          ref={refPath}
          fill="none"
          d={`M${startCircle.x} ${startCircle.y} A 50 50 0 1 1 ${stopCircle.x} ${stopCircle.y}`}
          className="stroke-accent"
        />
      </svg>
    </div>
  );
}
