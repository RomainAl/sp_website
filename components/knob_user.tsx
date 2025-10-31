import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "motion/react";
import { MouseEvent, useEffect, useMemo, useRef } from "react";

export function Knob({
  Kname,
  Kmax,
  Kmin,
  Kinitval,
  setVal,
  paramsNb,
  setDirectValue,
  unit,
  color,
  duration,
  Kdisplayname,
}: {
  Kname: string;
  Kmax: number;
  Kmin: number;
  Kinitval: number;
  setVal: (val: number, name?: string) => void;
  paramsNb?: number;
  setDirectValue?: boolean;
  unit?: string;
  color?: string;
  duration?: number;
  Kdisplayname?: string;
}) {
  console.log("RENDER KNOB");
  // const al_out = useMidiStore((store) => store.al_out);
  const refPath = useRef<SVGPathElement>(null);
  const refLine = useRef<SVGLineElement>(null);
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

  const aa = useMotionValue((Kinitval - Kmin) / (Kmax - Kmin));

  const aaa = useSpring(aa, { bounce: 0, duration: duration, restDelta: 0.1 });

  useMotionValueEvent(aaa, "change", (latest) => {
    if (!setDirectValue) {
      setVal(latest * (Kmax - Kmin) + Kmin, Kname);
    }
  });

  useMotionValueEvent(aa, "change", (latest) => {
    if (setDirectValue) setVal(latest * (Kmax - Kmin) + Kmin, Kname);
  });

  const pathD = useTransform(() => {
    const aaaa = startCircle.a - (aaa.get() * (3 * Math.PI)) / 2;
    return `M${startCircle.x} ${startCircle.y} A 50 50 0 ${startCircle.a - aaaa > Math.PI ? 1 : 0} 1 ${R * Math.cos(aaaa) + viewBoxSize / 2} ${
      -(R * Math.sin(aaaa)) + viewBoxSize / 2
    }`;
  });
  const xl = useTransform(() => `${(R + stroke / 2) * Math.cos(startCircle.a - (aaa.get() * (3 * Math.PI)) / 2) + viewBoxSize / 2}`);
  const yl = useTransform(() => `${-((R + stroke / 2) * Math.sin(startCircle.a - (aaa.get() * (3 * Math.PI)) / 2)) + viewBoxSize / 2}`);
  const displayVal = useTransform(() => {
    let displayVal = "";
    switch (unit) {
      case "%":
        displayVal = `${Math.round(100 * aaa.get())}%`;
        break;
      default:
        displayVal = `${aaa.get() * (Kmax - Kmin) + Kmin}`.substring(0, 4);
    }
    return displayVal;
  });

  useEffect(() => {
    const myDiv = refDiv.current;
    const divRect = myDiv?.getBoundingClientRect();
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && myDiv && divRect) {
        const touch = e.touches[0];
        let param = Math.min(Math.max((touch.clientX - divRect.left) / divRect.width, 0), 1);
        const yy = (touch.clientY - divRect.top) / divRect.height;
        if (yy >= 0.6)
          if (param > 0.5) {
            param = Math.min(Math.max(param + (yy - 0.6), 0), 1);
          } else {
            param = Math.min(Math.max(param - (yy - 0.6), 0), 1);
          }
        aa.set(param);
      }
    };

    if (myDiv) {
      myDiv.addEventListener("touchmove", handleTouchMove, { passive: false });
    }
    return () => {
      if (myDiv) {
        console.log("TOCHECK = Close touche event ?");
        myDiv.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [aa, Kinitval, Kmin, Kmax, setVal]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const divRect = refDiv.current?.getBoundingClientRect();
    if (divRect) {
      let param = Math.min(Math.max((e.clientX - divRect.left) / divRect.width, 0), 1);
      const yy = (e.clientY - divRect.top) / divRect.height;
      if (yy >= 0.6)
        if (param > 0.5) {
          param = Math.min(Math.max(param + (yy - 0.6), 0), 1);
        } else {
          param = Math.min(Math.max(param - (yy - 0.6), 0), 1);
        }
      aa.set(param);
    }
  };

  return (
    <div
      ref={refDiv}
      onClick={handleClick}
      className={"flex size-full touch-none flex-col items-center justify-center ring-2 ring-accent rounded-2xl bg-[#00000077] backdrop-blur-xs"}
    >
      <p
        className={cn("m-auto text-sm font-bold text-foreground select-none text-center", {
          "text-xl": paramsNb && paramsNb <= 10,
          "text-xs font-medium text-primary": paramsNb && paramsNb >= 100,
          "text-foreground": color === "white",
        })}
      >
        {Kdisplayname ? Kdisplayname : Kname}
      </p>
      <div className="relative w-3/4 select-none">
        <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} fill="none" strokeWidth={stroke}>
          <path d={`M${startCircle.x} ${startCircle.y} A 50 50 0 1 1 ${stopCircle.x} ${stopCircle.y}`} className="stroke-accent" />
          <motion.path ref={refPath} d={pathD} className={cn("stroke-primary", { "stroke-foreground": color === "white" })} />
          <motion.line
            ref={refLine}
            x1={viewBoxSize / 2}
            y1={viewBoxSize / 2}
            x2={xl}
            y2={yl}
            className={cn("stroke-primary", { "stroke-foreground": color == "white" })}
          />
        </svg>
        <div className="absolute top-0 flex size-full items-end justify-center">
          <motion.p
            className={cn("text-xs font-black text-primary", {
              "text-base": paramsNb && paramsNb <= 10,
              "text-xs font-medium": paramsNb && paramsNb >= 100,
              "text-foreground": color === "white",
            })}
          >
            {displayVal}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
