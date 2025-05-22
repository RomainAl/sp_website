"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { initNikedalStore, nikedalParamsTopStore, setNikedalParam } from "@/store/nikedal.admin.store";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ChevronLeft, ChevronRight, Palette } from "lucide-react";
import { motion } from "motion/react";
import { memo, useRef, useState } from "react";
import { ExperienceMemo } from "./experience";

export default function Home() {
  const [dpr, setDpr] = useState(2);
  const [created, setCreated] = useState(false);
  console.log("🚀 ~ App ~ dpr:", dpr);
  const pointId = useRef(0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className="relative h-dvh w-dvw"
      onPan={(e, pointInfo) => {
        if (pointId.current !== e.pointerId) {
          if (pointInfo.offset.x < -100) {
            setNikedalParam({ camRotYPlus: Date.now() });
            pointId.current = e.pointerId;
          } else if (pointInfo.offset.x > 100) {
            setNikedalParam({ camRotYMoins: Date.now() });
            pointId.current = e.pointerId;
          }
        }
      }}
    >
      {!created ? (
        <div className="relative h-dvh w-dvw flex justify-center items-center">
          <Spinner size="xxlarge" />
        </div>
      ) : (
        <FooterMemo />
      )}

      <Canvas
        fallback={<div className="h-dvh w-dvw flex justify-center items-center">Sorry no WebGL supported!</div>}
        onCreated={() => setCreated(true)}
        id="experienceCanvas"
        resize={{ offsetSize: true }}
        gl={{ antialias: true, precision: "mediump" }}
        dpr={dpr}
        shadows
        camera={{
          fov: 120,
          near: 0.1,
          far: 100,
          position: [initNikedalStore.camDist, 0, 0],
        }}
      >
        <ExperienceMemo />
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      </Canvas>
    </motion.div>
  );
}

const FooterMemo = memo(function Footer() {
  console.log("RENDER FOOTER");
  const RotatePlus = () => {
    setNikedalParam({ camRotYPlus: Date.now() });
  };
  const RotateMoins = () => {
    setNikedalParam({ camRotYMoins: Date.now() });
  };
  const count = useRef<number>(0);

  const RandomParams = () => {
    console.log(count.current);
    setNikedalParam(nikedalParamsTopStore[count.current % nikedalParamsTopStore.length]);
    count.current++;
  };

  return (
    <div className="absolute rounded-t-2xl bottom-0 left-1/2 -translate-x-1/2 w-fit max-w-lg flex flex-row justify-center items-center gap-7 p-5 z-10 bg-[#00000077]">
      <Button onClick={RotateMoins} className="rounded-full size-12 md:size-16 border-1 border-accent-foreground">
        <ChevronLeft className="size-full -ml-0.5" />
      </Button>
      <Button onClick={RandomParams} className="rounded-full size-12 md:size-16 border-1 border-accent-foreground">
        <Palette className="size-full" />
      </Button>
      <Button onClick={RotatePlus} className="rounded-full size-12 md:size-16 border-1 border-accent-foreground">
        <ChevronRight className="size-full ml-0.5" />
      </Button>
    </div>
  );
});
