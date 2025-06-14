"use client";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useInstaUserStore } from "@/store/insta.user.store";
import { motion } from "motion/react";
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
    <motion.div className="h-dvh max-w-3xl m-auto" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }}>
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="h-dvh w-dvw max-w-3xl -ml-2 -mt-2">
          {vidMeta.map((_, index) => (
            <CarouselItem key={index} className="basis-full pl-4 pt-4 flex items-center">
              {isMounted() && <InstaComponent index={index} goPrev={() => api?.scrollPrev()} goNext={() => api?.scrollNext()} />}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
}
