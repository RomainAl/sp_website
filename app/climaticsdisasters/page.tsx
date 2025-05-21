"use client";
import { Knob } from "@/components/knob_user";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { initShaderStore, setShaderParam, shaderParamsDefStore } from "@/store/shader.admin.store";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { memo, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import Experience from "./experience";
export default function Home() {
  console.log("RENDER INSTRU PAGE !");
  const [dpr, setDpr] = useState(1);
  const camera = new THREE.OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1 // far
  );
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const climaticsdisasters = useAudioAdminStore((store) => store.climaticsdisasters);
  // const pointId = useRef(0);

  useEffect(() => {
    if (audioContext && climaticsdisasters) {
      climaticsdisasters.node.connect(audioContext.destination);
      audioContext.resume();
      climaticsdisasters.parameters.find((p) => p.name === "OFF-ON").value = 1.0;
    }
    return () => {
      // audioContext?.suspend();
      climaticsdisasters?.node.disconnect();
    };
  }, [audioContext, climaticsdisasters]);

  return (
    <motion.div
      className="h-dvh w-dvw"
      // onPan={(_, pointInfo) => {
      //   console.log(pointInfo);
      // }}
    >
      <Canvas gl={{ antialias: true, precision: "mediump" }} dpr={dpr} flat orthographic camera={camera}>
        <Suspense fallback={<div>LOADING...</div>}>
          {/* <color args={["#555555"]} attach="background" /> */}
          <Experience />
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
    ["uCamZ" as keyof typeof shaderParamsDefStore]: 5,
  });

  const setVal = (val: number | boolean, name?: string) => {
    setShaderParam({ [name as keyof typeof shaderParamsDefStore]: val });
  };
  return (
    <div className="absolute bottom-0 h-fit left-1/2 -translate-x-1/2 w-full max-w-lg flex flex-row justify-center py-5 items-center z-10 bg-[#00000077]">
      {Object.keys(shaderParamsDefStore).map((name, i) => (
        <div key={i} className="w-1/3 flex aspect-square">
          <Knob
            Kname={name}
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
