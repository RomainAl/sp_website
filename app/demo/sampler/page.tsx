"use client";

import { Knob_button } from "@/components/knob_button";
import { Knob } from "@/components/knob_user";
import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { Slider } from "@/components/ui/slider";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { initSoundVisualizerParams, setSoundVisualizerParams } from "@/store/soundVisu.user.store";
import { setStreamWebcam, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useUnmount, useWindowSize } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const sampler = useAudioAdminStore((store) => store.sampler);
  const analyser = useAudioAdminStore((store) => store.audioAnalyser);
  const refOutports = useRef<HTMLParagraphElement>(null);
  const stream = useWebrtcUserStore((store) => store.webcamStream);
  const { width = 0 } = useWindowSize();
  setSoundVisualizerParams(initSoundVisualizerParams);

  useEffect(() => {
    if (!audioContext || !sampler || !(stream && stream.active)) {
      return;
    }
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(sampler.node);
    return () => {
      source?.disconnect();
    };
  }, [stream, audioContext, sampler]);

  useEffect(() => {
    if (!audioContext || !sampler || !analyser) {
      return;
    }
    console.log("LOG SAMPLER");
    sampler.node.connect(analyser);
    sampler.node.connect(audioContext.destination);
    audioContext.resume();
    if (sampler.outports.length < 1) {
      return;
    } else {
      sampler.messageEvent.subscribe((ev) => {
        // Ignore message events that don't belong to an outport
        if (sampler.outports.findIndex((elt) => elt.tag === ev.tag) < 0) return;
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
  }, [audioContext, sampler, analyser]);

  useUnmount(() => {
    analyser?.disconnect();
    sampler?.node.disconnect();
    stream?.getTracks().forEach((track) => {
      track.stop();
    });
    // audioContext?.suspend();
    try {
      sampler?.messageEvent?.removeAllSubscriptions();
    } catch (e) {
      console.log(e);
    }
  });

  if (!sampler)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }} className="size-full">
        <Image
          priority={true}
          className="size-full object-cover z-0 blur-lg opacity-50"
          src={`/demo_instru-n_0.jpg`}
          width={1000}
          height={500}
          alt={`Picture of intru demo`}
        />
      </motion.div>
    );

  return (
    <div className="flex h-dvh w-dvw max-w-2xl m-auto flex-col items-center justify-center gap-7">
      <div className="flex w-4/5 flex-col rounded-full ring-2 ring-accent bg-background shadow transition-colors">
        <SoundwaveCanvas width={width} height={width / 3} analyser={analyser} />
      </div>

      {!stream && (
        <Button
          onClick={() => {
            setStreamWebcam();
          }}
        >
          Active Mic
        </Button>
      )}

      <div className="relative flex w-full flex-row flex-wrap items-center justify-center gap-4">
        <div className={cn("relative aspect-square w-1/5")}>
          <Knob_button_RNBO nameP={"REC"} />
        </div>
        <div className={cn("relative aspect-square w-1/5")}>
          <Knob_button_RNBO nameP={"PLAY"} />
        </div>
        <div className={cn("relative aspect-square w-1/5")}>
          <Knob_button_RNBO nameP={"LOOP"} />
        </div>
      </div>
      <div className={cn("relative aspect-square w-1/3")}>
        <Knob_RNBO nameP={"SPEED"} />
      </div>
      <div className="relative flex w-full flex-row items-center justify-evenly gap-4">
        <div className="relative flex w-1/3 flex-col items-center justify-center gap-4">
          <div className={cn("relative aspect-square w-full")}>
            <Knob_RNBO nameP={"TRANSP"} />
          </div>
          <div className={cn("relative aspect-square w-full")}>
            <Knob_RNBO nameP={"MIX"} />
          </div>
        </div>
        <div className="relative flex w-1/3 flex-col items-center justify-center gap-4">
          <div className={cn("relative aspect-square w-full")}>
            <Knob_RNBO nameP={"FEED"} />
          </div>
          <div className={cn("relative aspect-square w-full")}>
            <Knob_RNBO nameP={"DEL"} />
          </div>
        </div>
      </div>
      <p className="text-xl text-primary" ref={refOutports}></p>
    </div>
  );
}

const Knob_button_RNBO = ({ nameP }: { nameP: string }) => {
  console.log("RENDER KNOB BUTTON");
  const RNBOparam = useAudioAdminStore(useShallow((store) => store.sampler!.parameters.find((p) => p.name === nameP)));
  const setVal = (val: number) => {
    RNBOparam.value = val;
  };

  return <Knob_button Kname={nameP} Kinitval={RNBOparam.initialValue} setVal={setVal} />;
};

const Knob_RNBO = ({ nameP }: { nameP: string }) => {
  console.log("RENDER KNOB");
  const RNBOparam = useAudioAdminStore(useShallow((store) => store.sampler!.parameters.find((p) => p.name === nameP)));
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
      paramsNb={100}
      setDirectValue={true}
      unit={RNBOparam.unit}
      duration={700}
    />
  );
};
