"use client";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { initInstaGossesCurrentVid, setInstaGossesPlayVid } from "@/store/ac.michelet.store";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { useEffect, useState } from "react";
import { useIsMounted, useUnmount } from "usehooks-ts";
import { InstaComponent } from "./instaComponent";
export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentI, setCurrentI] = useState(0);
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (api !== undefined) {
      api.on("select", () => {
        setCurrentI(api.selectedScrollSnap());
      });
      // api.on("pointerDown", () => {
      //   setInstaPlayVid();
      // });
    }
  }, [api]);

  useEffect(() => {
    if (!audioContext) return;
    initInstaGossesCurrentVid();
    audioContext.resume();
    setInstaGossesPlayVid();
  }, [audioContext]);

  useUnmount(() => {
    api?.destroy();
    // audioContext?.suspend();
    setInstaGossesPlayVid(false);
  });

  return (
    <div className="size-full">
      <Carousel setApi={setApi} opts={{ loop: true }} orientation="vertical">
        <CarouselContent className="h-dvh w-dvw -ml-2 -mt-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full pl-4 pt-4 flex items-center">
              {isMounted() && (
                <InstaComponent
                  index={index}
                  currentIndex={currentI}
                  postPathVid=""
                  goPrev={() => api?.scrollPrev()}
                  goNext={() => api?.scrollNext()}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
