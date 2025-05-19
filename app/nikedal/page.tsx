"use client";
import { Spinner } from "@/components/ui/spinner";
import { initNikedalStore } from "@/store/nikedal.admin.store";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { ExperienceMemo } from "./experience";

export default function Home() {
  const [dpr, setDpr] = useState(2);
  console.log("🚀 ~ App ~ dpr:", dpr);

  return (
    <div className="size-full">
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
        <Suspense fallback={<Spinner size="xxlarge">LOADING</Spinner>}>
          <ExperienceMemo />
        </Suspense>
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      </Canvas>
    </div>
  );
}
