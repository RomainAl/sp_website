import { cn } from "@/lib/utils";
import { speetchElon } from "@/store/elon.store";
import { memo, useEffect, useRef } from "react";

export const ElonSpeechMemo = memo(function ElonSpeech({ index }: { index: number }) {
  const refDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refDiv.current) refDiv.current.innerHTML = speetchElon;
    const doScroll = setInterval(() => {
      if (refDiv.current) {
        refDiv.current.scrollTop += 100 * Math.round(Math.pow(Math.random(), 10));
        if (refDiv.current.scrollTop >= refDiv.current.scrollHeight - refDiv.current.clientHeight) {
          // clearInterval(doScroll);
          refDiv.current.scrollTop = 0;
        }
      }
    }, 10);
    return () => clearInterval(doScroll);
  }, []);

  return <div ref={refDiv} className={cn("size-full overflow-hidden text-sm text-primary px-1", { "text-white": index === 0 })}></div>;
});
