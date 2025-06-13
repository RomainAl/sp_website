"use client";

import { Knob } from "@/components/knob_user";
import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { cn } from "@/lib/utils";
// import { Slider } from "@/components/ui/slider";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { initSoundVisualizerParams, setSoundVisualizerParams } from "@/store/soundVisu.user.store";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUnmount, useWindowSize } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const searchParams = useSearchParams();
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const intruNum: number = searchParams.has("n") ? Number(searchParams.get("n")) : 0;
  const instru = useAudioAdminStore((store) => store.instrus[intruNum]);
  const analyser = useAudioAdminStore((store) => store.audioAnalyser);
  const refOutports = useRef<HTMLParagraphElement>(null);
  const instru0_drone = useAudioAdminStore((store) => store.instru0_drone);
  const { width = 0 } = useWindowSize();
  setSoundVisualizerParams(initSoundVisualizerParams);

  useEffect(() => {
    if (!audioContext || !instru || !analyser || !instru0_drone) {
      return;
    }
    console.log("LOG INSTRU");
    instru.node.connect(analyser);
    instru.node.connect(audioContext.destination);
    if (intruNum === 0) instru0_drone.node.connect(audioContext.destination);
    audioContext.resume();
    if (intruNum === 0) {
      instru0_drone.parameters.find((p) => p.name === "PLAY").value = 1.0;
      instru0_drone.parameters.find((p) => p.name === "MASTER-G").value = 0.15;
    }
    instru.parameters.find((p) => p.name === "OFF-ON").value = 1.0;
    if (instru.outports.length < 1) {
      return;
    } else {
      instru.messageEvent.subscribe((ev) => {
        // Ignore message events that don't belong to an outport
        if (instru.outports.findIndex((elt) => elt.tag === ev.tag) < 0) return;
        // Message events have a tag as well as a payload
        if (refOutports.current) {
          refOutports.current.innerHTML = `<strong>${ev.tag}</strong> : ${ev.payload}`;
        }
      });
    }

    return () => {
      console.log("TODO : NORMALEMENT KILL HERE");
      //   console.log("KILL INSTRU");
      //   analyser?.disconnect();
      //   instru?.node.disconnect();
      //   audioContext?.suspend();
      //   instru.messageEvent.removeAllSubscriptions();
      //   console.log(instru.node);
    };
  }, [audioContext, instru, analyser, instru0_drone, intruNum]);

  useUnmount(() => {
    analyser?.disconnect();
    instru?.node.disconnect();
    if (intruNum === 0 && instru0_drone && instru0_drone.parameters) instru0_drone.parameters.find((p) => p.name === "PLAY").value = 0.0;
    if (intruNum === 0) instru0_drone?.node.disconnect();
    // audioContext?.suspend();
    try {
      instru?.messageEvent?.removeAllSubscriptions();
    } catch (e) {
      console.log(e);
    }
  });

  if (!instru) return null;

  return (
    <>
      <div className="flex h-dvh w-dvw max-w-2xl m-auto flex-col items-center justify-center gap-7">
        {instru?.parameters.length < 10 && (
          <div className="flex w-2/3 flex-col rounded-full border-3 border-accent bg-background shadow transition-colors">
            <SoundwaveCanvas width={width} height={width / 3} analyser={analyser} />
          </div>
        )}
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          {instru?.parameters.map(
            (param) =>
              param.name !== "MASTER-G" &&
              param.name !== "OFF-ON" && (
                <div
                  key={param.name}
                  className={cn("aspect-square w-2/3", {
                    "w-1/3": instru?.parameters.length - 2 > 1,
                    "w-1/5": instru?.parameters.length - 2 >= 10,
                  })}
                >
                  <Knob_RNBO indexI={intruNum} nameP={param.name} paramsNb={instru?.parameters.length - 2} />
                </div>
              )
          )}
        </div>
        <p className="text-xl text-primary" ref={refOutports}></p>
      </div>
    </>
  );
}

const Knob_RNBO = ({ indexI, nameP, paramsNb }: { indexI: number; nameP: string; paramsNb: number }) => {
  console.log("RENDER KNOB");
  const RNBOparam = useAudioAdminStore(useShallow((store) => store.instrus[indexI].parameters.find((p) => p.name === nameP)));
  const setVal = (val: number) => {
    RNBOparam.value = val;
  };

  return (
    <Knob
      Kname={RNBOparam.name}
      Kmin={RNBOparam.min}
      Kmax={RNBOparam.max}
      Kinitval={RNBOparam.initialValue}
      setVal={setVal}
      paramsNb={paramsNb}
      setDirectValue={true}
      unit={RNBOparam.unit}
      duration={700}
    />
  );
};
