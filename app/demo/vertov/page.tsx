"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useIsMounted, useUnmount } from "usehooks-ts";
import { InstaComponent } from "./instaComponent";
export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentI, setCurrentI] = useState(0);
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

  useUnmount(() => {
    api?.destroy();
  });

  return (
    <div className="size-full max-w-2xl m-auto">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="size-full -ml-2 -mt-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full pl-4 pt-4">
              {isMounted() && (
                <InstaComponent
                  index={index}
                  currentIndex={currentI}
                  goPrev={() => api?.scrollPrev(false)} // SNIF PAS DE TRANSITION DOUCE !
                  goNext={() => api?.scrollNext(false)}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
