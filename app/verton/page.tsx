"use client";
import { InstaComponent } from "@/app/verton/instaComponent";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { useInterval, useIsMounted, useUnmount } from "usehooks-ts";
import { ElonSpeechMemo } from "./elonSpeech";

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
      verton.parameters.find((p) => p.name === "OFF-ON").value = 1.0;
    }
    return () => {
      audioContext?.suspend();
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

  useUnmount(() => {
    api?.destroy();
  });

  return (
    <div className={cn("size-full max-w-2xl m-auto", { invert: invert, "bg-blue-500": invert })}>
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
