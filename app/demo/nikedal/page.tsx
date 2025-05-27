"use client";

import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { setSoundVisualizerParams } from "@/store/soundVisu.user.store";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const analyser = useAudioAdminStore((store) => store.audioAnalyser);
  const nikedal = useAudioAdminStore((store) => store.nikedal);
  const { width = 0, height = 0 } = useWindowSize();
  const refAudio = useRef<HTMLAudioElement>(null);

  setSoundVisualizerParams({
    fftSize: 128,
    rectSize: 400,
    rectSize_: 400,
    gain: 20,
    color: "white",
    smoothingTimeConstant: 1.0,
    rand: 0,
    stroke: true,
  });

  const changeParams = () => {
    const r = Math.random();
    const params = {
      fftSize: 128,
      rectSize: 500 * r,
      rectSize_: 500 * r,
      gain: 20 * r * r,
      color: "white",
      smoothingTimeConstant: 1.0,
      rand: 0,
      stroke: true,
    };
    setSoundVisualizerParams(params);
  };

  useEffect(() => {
    if (audioContext && analyser && nikedal) {
      console.log("LOG NIKEDAL");
      analyser.disconnect();
      nikedal.node.connect(analyser).connect(audioContext.destination);
      audioContext.resume();
      nikedal.parameters.find((p) => p.name === "OFF-ON").value = 1.0;
    }
    return () => {
      console.log("KILL NIKEDAL");
      analyser?.disconnect();
      // audioContext?.suspend();
      nikedal?.node.disconnect();
    };
  }, [audioContext, analyser, nikedal]);

  useEffect(() => {
    const ii = setInterval(() => {
      changeParams();
    }, 500);
    return () => {
      if (ii) clearInterval(ii);
    };
  }, []);

  return (
    <>
      <div className="size-full" onClick={changeParams}>
        <SoundwaveCanvas
          onClick={() => {
            refAudio?.current?.play();
          }}
          width={width}
          height={height}
          analyser={analyser}
        />
      </div>
    </>
  );
}
