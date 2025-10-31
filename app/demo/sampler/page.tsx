"use client";

import { Knob_button } from "@/components/knob_button";
import { Knob } from "@/components/knob_user";
import { SoundwaveCanvas } from "@/components/soundwaveCanvas";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
// import { Slider } from "@/components/ui/slider";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { setStreamWebcam, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { Mic, Mic2, Play, Repeat } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
import { useUnmount, useWindowSize } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const sampler = useAudioAdminStore((store) => store.sampler);
  const analyser = useAudioAdminStore((store) => store.audioAnalyser);
  // const refOutports = useRef<HTMLParagraphElement>(null);
  const stream = useWebrtcUserStore((store) => store.webcamStream);
  const { width = 0 } = useWindowSize();
  const setAudio = useAudioAdminStore((store) => store.setAudio);

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
    // if (sampler.outports.length < 1) {
    //   return;
    // } else {
    //   sampler.messageEvent.subscribe((ev) => {
    //     // Ignore message events that don't belong to an outport
    //     if (sampler.outports.findIndex((elt) => elt.tag === ev.tag) < 0) return;
    //     // Message events have a tag as well as a payload
    //     if (refOutports.current) {
    //       refOutports.current.innerHTML = `<strong>${ev.tag}</strong> : ${ev.payload}`;
    //     }
    //   });
    // }

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
      // sampler?.messageEvent?.removeAllSubscriptions();
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
    <div className="relative h-dvh w-dvw max-w-2xl m-auto flex flex-col items-center justify-evenly">
      {!stream && (
        <div className="absolute size-full bg-[#000000AA] backdrop-blur-xs flex items-center justify-center z-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 size-20 md:size-30 rounded-full border-1 border-accent-foreground pointer-events-auto">
            <span className="absolute z-0 size-full animate-ping rounded-full bg-primary pointer-events-none"></span>
            <Button
              variant={"default"}
              className="size-full focus:outline-2 focus:outline-2-offset-2 focus:outline-primary z-10"
              size={"circle"}
              onClick={() => {
                if (!sampler) setAudio();
                setStreamWebcam();
              }}
            >
              <Mic className="size-1/3" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex w-4/5 flex-col rounded-full ring-2 ring-accent bg-background shadow transition-colors">
        <SoundwaveCanvas width={width} height={width / 3} analyser={analyser} />
      </div>

      <div className="relative flex w-full flex-row flex-wrap items-center justify-center gap-3">
        <div className={cn("relative aspect-square w-1/4 pointer-events-none", { "pointer-events-auto": stream })}>
          <Knob_button_RNBO nameP={"REC"} />
        </div>
        <div className={cn("relative aspect-square w-1/4")}>
          <Knob_button_RNBO nameP={"PLAY"} />
        </div>
        <div className={cn("relative aspect-square w-1/4")}>
          <Knob_button_RNBO nameP={"LOOP"} />
        </div>
      </div>

      <div className="flex w-4/5 flex-row justify-evenly items-center gap-2 pb-4 -mt-2">
        <p className="text-xl font-bold">SPEED</p>
        <Slider
          className="bg-primary w-1/2 flex-1"
          defaultValue={[sampler.parameters.find((p) => p.name === "SPEED").initialValue]}
          max={sampler.parameters.find((p) => p.name === "SPEED").max}
          min={sampler.parameters.find((p) => p.name === "SPEED").min}
          step={0.01}
          onValueChange={(val) => {
            sampler.parameters.find((p) => p.name === "SPEED").value = val;
          }}
        ></Slider>
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
      {/* <p className="text-xl text-primary" ref={refOutports}></p> */}
    </div>
  );
}

const Knob_button_RNBO = ({ nameP }: { nameP: string }) => {
  console.log("RENDER KNOB BUTTON");
  const RNBOparam = useAudioAdminStore(useShallow((store) => store.sampler!.parameters.find((p) => p.name === nameP)));
  const setVal = (val: number) => {
    if (nameP === "PLAY") {
      RNBOparam.value = 1 - RNBOparam.value;
    } else if (nameP === "REC") {
      RNBOparam.value = 1;
      setTimeout(() => {
        RNBOparam.value = 0;
      }, 10000);
    } else {
      RNBOparam.value = val;
    }
  };

  return (
    <Knob_button Kname={nameP === "PLAY" ? "PLAY_trig" : nameP === "REC" ? "REC_trig10" : nameP} Kinitval={RNBOparam.initialValue} setVal={setVal}>
      {/* <p className="text-sm font-bold mb-1">{nameP}</p> */}
      {nameP === "REC" && <Mic2 className="mb-1" />}
      {nameP === "PLAY" && <Play className="mb-1" />}
      {nameP === "LOOP" && <Repeat className="mb-1" />}
    </Knob_button>
  );
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
      paramsNb={10}
      setDirectValue={true}
      unit={RNBOparam.unit}
      duration={700}
    />
  );
};
