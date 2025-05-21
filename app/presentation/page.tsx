"use client";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useInstaUserStore } from "@/store/insta.user.store";
import { useState } from "react";
import { useIsMounted, useUnmount } from "usehooks-ts";
import { InstaComponent } from "./instaComponent";
export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const vidMeta = useInstaUserStore((store) => store.vidMeta);
  const isMounted = useIsMounted();

  useUnmount(() => {
    api?.destroy();
  });

  return (
    <div className="h-dvh w-dvw max-w-2xl m-auto">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="h-dvh w-dvw max-w-2xl -ml-2 -mt-2">
          {vidMeta.map((_, index) => (
            <CarouselItem key={index} className="basis-full pl-4 pt-4 flex items-center">
              {isMounted() && <InstaComponent index={index} goPrev={() => api?.scrollPrev()} goNext={() => api?.scrollNext()} />}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
