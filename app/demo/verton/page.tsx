"use client";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { errorMess } from "@/store/elon.store";
import { setToast } from "@/store/shared.store";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { useInterval, useIsMounted, useUnmount } from "usehooks-ts";
import { ElonSpeechMemo } from "./elonSpeech";
import { InstaComponent } from "./instaComponent";

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ delay: 1712, stopOnInteraction: true, stopOnFocusIn: false, playOnInit: true }));
  const plugin_speed = useRef(Autoplay({ delay: 53, stopOnInteraction: false, stopOnFocusIn: false }));
  const [elonSpeech, setElonSpeech] = useState(false);
  const [invert, setInvert] = useState(false);
  const [elonSpeed, setElonSpeed] = useState(false);
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const verton = useAudioAdminStore((store) => store.verton);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (audioContext && verton) {
      verton.node.connect(audioContext.destination);
      audioContext.resume();
      verton.parameters.find((p) => p.name === "PLAY").value = 1.0;
    }
    return () => {
      // audioContext?.suspend();
      if (verton && verton.parameters) verton.parameters.find((p) => p.name === "PLAY").value = 0.0;
      verton?.node.disconnect();
    };
  }, [audioContext, verton]);

  useInterval(() => {
    setElonSpeed(true);
    setTimeout(() => {
      setElonSpeed(false);
    }, Math.random() * 2000);
  }, 5000);

  useInterval(() => {
    setInvert(true);
    setTimeout(() => {
      setInvert(false);
    }, Math.random() * 1000);
  }, 9000);

  useInterval(() => {
    setElonSpeech(true);
    setTimeout(() => {
      setElonSpeech(false);
    }, Math.random() * 4000);
  }, 10000);

  useInterval(() => {
    const err = errorMess[Math.floor(Math.random() * errorMess.length)];
    setToast({
      type: "error",
      data: { title: `ERROR : ${err.message}`, content: err.explication },
      position: "bottom-center",
      autoClose: Math.round(Math.random() * 10000 + 200),
    });
  }, verton && 3000);

  useUnmount(() => {
    api?.destroy();
  });

  return (
    <div className={cn("size-full max-w-2xl m-auto", { invert: invert, "bg-blue-500": invert, "opacity-40": !verton })}>
      <Carousel plugins={elonSpeed ? [plugin_speed.current] : [plugin.current]} setApi={setApi} opts={{ loop: true }} orientation="vertical">
        <CarouselContent className="h-dvh w-dvw max-w-2xl -ml-2 -mt-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full  pl-4 pt-4 flex items-center">
              <div className="absolute top-0 size-full z-30 pointer-events-none">{elonSpeech && <ElonSpeechMemo index={index} />}</div>
              {isMounted() && <InstaComponent index={index} goPrev={() => api?.scrollPrev()} goNext={() => api?.scrollNext()} />}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
