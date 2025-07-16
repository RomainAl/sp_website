"use client";

import { Knob } from "@/components/knob_user";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { flash, setFlashesSpeed, setFlashesTime, setFlashesTrig, setStreamWebcam, useWebrtcUserStore, vibrate } from "@/store/webrtc.user.store";
import { Phone, TriangleAlert } from "lucide-react";
import { memo, useEffect, useRef } from "react";
import { useInterval, useMediaQuery, useUnmount } from "usehooks-ts";

export default function Home() {
  console.log("RENDU FLASHES");
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const refDiv = useRef<HTMLDivElement>(null);
  const stream = useWebrtcUserStore((store) => store.webcamStream);
  const flashes_time = useWebrtcUserStore((state) => state.flashes_time);
  const flashes_speed = useWebrtcUserStore((state) => state.flashes_speed);
  const timeout1 = useRef<NodeJS.Timeout | null>(null);
  const timeout2 = useRef<NodeJS.Timeout | null>(null);
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const flashesTech = useAudioAdminStore((store) => store.flashesTech);
  const matches = useMediaQuery("(min-width: 1024px)");
  const setAudio = useAudioAdminStore((store) => store.setAudio);

  useEffect(() => {
    vibrate([100, 50, 100, 50, 1000]);
  }, []);

  useInterval(() => vibrate([100, 50, 100, 50, 1000]), !stream || !stream.active ? 5000 : null);

  useInterval(
    () => {
      setFlashesTrig(Date.now());
    },
    stream && stream.active ? flashes_speed : null
  );

  useEffect(() => {
    if (audioContext && flashesTech) {
      flashesTech.node.connect(audioContext.destination);
      audioContext.resume();
      flashesTech.parameters.find((p) => p.name === "PLAY").value = 1.0;
    }
    return () => {
      // audioContext?.suspend();
      if (flashesTech && flashesTech.parameters) flashesTech.parameters.find((p) => p.name === "PLAY").value = 0.0;
      flashesTech?.node.disconnect();
    };
  }, [audioContext, flashesTech]);

  useEffect(() => {
    if (!stream || !stream.active) return;
    console.log("REND STREAM");
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  useUnmount(() => {
    stream?.getTracks().forEach((track) => {
      track.stop();
    });
    setFlashesTrig(0);
  });

  useEffect(() => {
    const unsubscribeFlash = useWebrtcUserStore.subscribe(
      (state) => state.flashes_trig,
      async (value) => {
        if (value !== 0) {
          await flash(true);
          const flashes_t = flashes_time * flashes_speed;
          if (myVideoRef.current) myVideoRef.current.style.filter = "invert(1)";
          if (refDiv.current) refDiv.current.style.backgroundColor = "white";

          if (timeout1.current) {
            clearTimeout(timeout1.current);
            timeout1.current = null;
          }
          if (timeout2.current) {
            clearTimeout(timeout2.current);
            timeout2.current = null;
          }
          timeout1.current = setTimeout(async () => {
            await flash(false);
          }, flashes_t);

          timeout2.current = setTimeout(() => {
            if (myVideoRef.current) myVideoRef.current.style.filter = "";
            if (refDiv.current) refDiv.current.style.backgroundColor = "black";
          }, flashes_t);
        }
      }
    );
    return () => {
      unsubscribeFlash();
      if (timeout1.current) {
        clearTimeout(timeout1.current);
        timeout1.current = null;
      }
      if (timeout2.current) {
        clearTimeout(timeout2.current);
        timeout2.current = null;
      }
    };
  }, [flashes_time, flashes_speed]);

  return (
    <div className="h-dvh w-dvw">
      {!stream && matches && (
        <div className="absolute bottom-0 w-full p-10 gap-3 flex flex-row text-primary items-center justify-center">
          <TriangleAlert />
          <p className="text-center">Vous ne semblez pas sur un smartphone, impossible donc de contrôler le flash !</p>
          <TriangleAlert />
        </div>
      )}
      {!stream || !stream.active ? (
        <div ref={refDiv} className="size-full flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 size-20 md:size-30 rounded-full border-1 border-accent-foreground pointer-events-auto">
            <span className="absolute z-0 size-full animate-ping rounded-full bg-primary pointer-events-none"></span>
            <Button
              variant={"default"}
              className="size-full focus:outline-2 focus:outline-2-offset-2 focus:outline-primary z-10"
              size={"circle"}
              onClick={() => {
                if (!flashesTech) setAudio();
                setStreamWebcam(1);
              }}
            >
              <Phone className="size-1/3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="size-full flex items-center justify-center">
          {!stream || !stream.active ? (
            <Spinner size="xlarge" />
          ) : (
            <video className={"hue-rotate-180 brightness-125 contrast-200 size-full object-cover"} playsInline ref={myVideoRef} autoPlay muted />
          )}
          <FooterMemo />
        </div>
      )}
    </div>
  );
}

const FooterMemo = memo(function Footer() {
  console.log("RENDER FOOTER");

  return (
    <div className="absolute rounded-t-2xl  bottom-0 left-1/2 -translate-x-1/2 w-fit max-w-lg flex flex-row justify-center items-center gap-7 p-5 z-10">
      <div className="w-25 xs:w-40 md:w-45">
        <Knob
          Kname={"FLASH_TIME"}
          Kmax={0.9}
          Kmin={0.1}
          Kinitval={0.5}
          unit="%"
          setVal={(val) => {
            setFlashesTime(val);
          }}
          setDirectValue={true}
          paramsNb={100}
          color="white"
          duration={700}
        />
      </div>
      <div className="w-25 xs:w-40 md:w-45">
        <Knob
          Kname={"FLASH_SPEED"}
          Kmax={1}
          Kmin={0}
          Kinitval={0}
          setVal={(val) => {
            setFlashesSpeed(800 / Math.pow(2, Math.round(val * 4)));
          }}
          unit="%"
          setDirectValue={true}
          paramsNb={100}
          color="white"
          duration={700}
        />
      </div>
    </div>
  );
});
