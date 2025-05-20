"use client";
import { Button } from "@/components/ui/button";
import { initNikedalStore, setNikedalParam } from "@/store/nikedal.admin.store";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ChevronLeft, ChevronRight, SquareDot } from "lucide-react";
import { memo, useState } from "react";
import { ExperienceMemo } from "./experience";

export default function Home() {
  const [dpr, setDpr] = useState(2);
  console.log("🚀 ~ App ~ dpr:", dpr);

  return (
    <div className="relative size-full">
      <Canvas
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
      <FooterMemo />
    </div>
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
  const RandomParams = () => {
    setNikedalParam({
      strokeW: Math.random() * 3,
      doLine: Math.round(Math.random()),
      doBox: Math.round(Math.random()),
      fillMix: Math.round(Math.random()),
      doGlitch: Math.round(Math.random()),
      doBloom: Math.round(Math.random()),
      bloomIntensity: Math.random() * 20, // -10 to 50
      compress: Math.random(),
      textSize: 20 * Math.round(Math.random()),
      brightness: Math.random() * 2 - 1,
    });
  };
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg flex flex-row justify-center items-center gap-7 p-5 z-10 bg-[#00000077]">
      <Button onClick={RotateMoins} className="aspect-square rounded-full size-fit border-1 border-accent-foreground">
        <ChevronLeft className="size-full" size={24} />
      </Button>
      <Button onClick={RandomParams} className="aspect-square rounded-full size-fit border-1 border-accent-foreground">
        <SquareDot className="size-full" size={24} />
      </Button>
      <Button onClick={RotatePlus} className="aspect-square rounded-full size-fit border-1 border-accent-foreground">
        <ChevronRight className="size-full" size={24} />
      </Button>
    </div>
  );
});
