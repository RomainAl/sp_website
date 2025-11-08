"use client";
import { Knob } from "@/components/knob_user";
import { RendererCleaner } from "@/components/renderCleaner";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { initShaderStore, setShaderParam, shaderParamsDefStore } from "@/store/shader.admin.store";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import Image from "next/image";
import { memo, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { ExperienceMemo } from "./experience";
export default function Home() {
  console.log("RENDER INSTRU PAGE !");
  const [dpr, setDpr] = useState(2);
  console.log("🚀 ~ App ~ dpr:", dpr);
  const camera = new THREE.OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1 // far
  );
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const climaticdisasters = useAudioAdminStore((store) => store.climaticdisasters);
  // const pointId = useRef(0);

  useEffect(() => {
    if (audioContext && climaticdisasters) {
      climaticdisasters.node.connect(audioContext.destination);
      audioContext.resume();
      climaticdisasters.parameters.find((p) => p.name === "PLAY").value = 1.0;
    }
    return () => {
      // audioContext?.suspend();
      if (climaticdisasters && climaticdisasters.parameters) climaticdisasters.parameters.find((p) => p.name === "PLAY").value = 0.0;
      climaticdisasters?.node.disconnect();
    };
  }, [audioContext, climaticdisasters]);

  if (!climaticdisasters)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }} className="size-full">
        <Image
          priority={true}
          className="size-full object-cover z-0 blur-sm contrast-200 brightness-75 opacity-50"
          src={`/demo_climaticdisasters.jpg`}
          width={1000}
          height={500}
          alt={`Picture of intru demo`}
        />
      </motion.div>
    );

  return (
    <motion.div
      className="h-dvh w-dvw  max-w-3xl m-auto"
      // onPan={(_, pointInfo) => {
      //   console.log(pointInfo);
      // }}
    >
      <Canvas gl={{ antialias: true }} dpr={dpr} flat orthographic camera={camera}>
        <RendererCleaner />
        <Suspense fallback={<div>LOADING...</div>}>
          {/* <color args={["#555555"]} attach="background" /> */}
          <ExperienceMemo />
        </Suspense>
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      </Canvas>
      <FooterMemo />
    </motion.div>
  );
}

const FooterMemo = memo(function Footer() {
  console.log("RENDER CLIMATIC FOOTER");
  setShaderParam({
    ["uCamZ" as keyof typeof shaderParamsDefStore]: 0.5,
  });

  const setVal = (val: number | boolean, name?: string) => {
    if (name === "uNoiseAmp0") {
      setShaderParam({
        [name as keyof typeof shaderParamsDefStore]: val,
        ["uColContrast" as keyof typeof initShaderStore]: Number(val) / 2.0 + 1.0,
        ["uColSat" as keyof typeof initShaderStore]: Number(val) / 2.0 + 1.0,
        ["uColBright" as keyof typeof initShaderStore]: (5.0 * Number(val)) / 20.0,
        ["uLightAmp" as keyof typeof initShaderStore]: 1.0 - Number(val) / 40.0,
      });
    } else {
      setShaderParam({ [name as keyof typeof shaderParamsDefStore]: val });
    }
  };
  return (
    <div className="absolute rounded-t-2xl bottom-0 h-fit left-1/2 -translate-x-1/2 w-fit max-w-lg flex flex-row justify-center p-5 gap-2 items-center z-10">
      {Object.keys(shaderParamsDefStore).map((name, i) => (
        <div key={i} className="w-23 xs:w-30 md:w-35 flex aspect-square">
          <Knob
            Kname={name}
            Kdisplayname={i === 0 ? "Destroy" : i === 1 ? "Trees" : "Camera"}
            Kmin={shaderParamsDefStore[name as keyof typeof shaderParamsDefStore][0]}
            Kmax={shaderParamsDefStore[name as keyof typeof shaderParamsDefStore][1]}
            Kinitval={initShaderStore[name as keyof typeof shaderParamsDefStore]}
            setVal={setVal}
            paramsNb={100}
          />
        </div>
      ))}
    </div>
  );
});
