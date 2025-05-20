import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useAudioUserStore } from "@/store/audio.user.store";
import { setCurrentVid, setInstaPlayVid, useInstaUserStore, vidNb, vidVertovNb } from "@/store/insta.user.store";
import { useMessUserStore } from "@/store/mess.user.store";
import { sendMess, setStream } from "@/store/webrtc.user.store";
import { CirclePlay } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

export const VideoComponent = ({
  index,
  currentIndex,
  pathVid,
  postPathVid,
}: {
  index: number;
  currentIndex?: number;
  pathVid: string;
  postPathVid?: string;
}) => {
  const currentVid_loc = useInstaUserStore((store) => store.currentVid_Loc[index]);
  const ref = useRef<HTMLVideoElement>(null);
  const refS = useRef<HTMLSourceElement>(null);
  const [pending, setPending] = useState<boolean>(true);
  const playVidGlobal = useInstaUserStore((store) => store.playVidGlobal);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const peerSoundRef = useRef<MediaStreamAudioDestinationNode>(null);
  const soundRef = useRef<MediaElementAudioSourceNode>(null);
  const isElon = pathVid.indexOf("elon") !== -1;
  const isVertov = pathVid.indexOf("vertov") !== -1;
  const elonMode = useMessUserStore((store) => store.elonMode);
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const gain_node = useAudioUserStore((store) => store.gain_node);

  useInterval(
    () => {
      if (ref.current) {
        ref.current.currentTime = 1 + Math.random() * 0.05;
        ref.current.playbackRate = Math.random() * 1.5 + 0.5;
      }
    },
    isElon && elonMode === 127 ? 856 : null
  );

  useEffect(() => {
    if (isElon && ref.current && elonMode && isPlaying) {
      if (elonMode !== 127) {
        try {
          ref.current.currentTime = (elonMode * ref.current.duration + Math.random() * 0.01) / 100;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [isElon, elonMode, isPlaying]);

  useEffect(() => {
    if (audioContext && ref.current && !soundRef.current && !isElon && !isVertov)
      soundRef.current = audioContext.createMediaElementSource(ref.current);
  }, [audioContext, isVertov, isElon]);

  useEffect(() => {
    if (audioContext && ref.current && !peerSoundRef.current && !isElon && !isVertov)
      peerSoundRef.current = audioContext.createMediaStreamDestination();
  }, [audioContext, isVertov, isElon]);

  useEffect(() => {
    if (refS.current && ref.current) {
      ref.current.load();
      ref.current.playbackRate = 1;
      if (isElon) {
        ref.current.play();
      } else {
        if (playVidGlobal && currentIndex !== undefined && index - currentIndex === 0) {
          ref.current.play();
        } else {
          ref.current.pause();
        }
      }
    }
  }, [currentVid_loc, playVidGlobal, isElon]);

  useEffect(() => {
    if (ref.current) {
      if (!isElon) {
        if (playVidGlobal && currentIndex !== undefined && index - currentIndex === 0) {
          setCurrentVid({ currentVid: currentVid_loc, vidNumber: isVertov ? vidVertovNb : vidNb });
          ref.current.play();
          if (!isVertov) {
            sendMess({ currentInstaVid: currentVid_loc });
            // ref.current.muted = false;
            if (peerSoundRef.current && refCanvas.current) {
              const stream = new MediaStream();
              soundRef.current?.connect(peerSoundRef.current);
              stream.addTrack(peerSoundRef.current.stream.getAudioTracks()[0]);
              stream.addTrack(refCanvas.current.captureStream(0).getVideoTracks()[0]);
              setStream(stream);
            }
            if (audioContext && gain_node) soundRef.current?.connect(gain_node).connect(audioContext.destination);
          }
        } else {
          // ref.current.muted = true;
          ref.current.pause();
          soundRef.current?.disconnect();
        }
      }
    }
    return () => {
      soundRef.current?.disconnect();
    };
  }, [playVidGlobal, currentIndex, isElon, isVertov, audioContext, index, gain_node]);

  useEffect(() => {
    console.log("TODO : Ecoute des event videos étranges !?");
    if (ref.current) {
      ref.current.onloadeddata = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onloadeddata");
        setPending(false);
      };
      ref.current.onpause = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onpause");
        setIsPlaying(false);
        setPending(false);
      };
      ref.current.onplay = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onplay");
        setIsPlaying(true);
        setPending(false);
      };
      ref.current.onerror = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onerror");
        setIsPlaying(false);
      };
      ref.current.onplaying = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onplaying");
        setIsPlaying(true);
        setPending(false);
      };
      ref.current.onprogress = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("onprogress");
        // setIsPlaying(true);
        setPending(true);
      };
      ref.current.onended = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("ended");
        // setIsPlaying(true);
        setPending(true);
      };
      ref.current.onwaiting = () => {
        if (currentIndex !== undefined && index - currentIndex === 0) console.log("waiting");
        // setIsPlaying(true);
        setPending(true);
      };
    }
  }, []);

  useEffect(() => {
    const unsubscribeGain = useMessUserStore.subscribe(
      (state) => state.gain,
      (value) => {
        if (gain_node && value) gain_node.gain.value = value;
      }
    );

    return () => {
      unsubscribeGain();
    };
  }, [gain_node]);

  return (
    <div
      onClick={() => {
        if (ref.current) {
          // if (!isPlaying) {
          ref.current.play().then(() => setIsPlaying(true));
          setInstaPlayVid();
          // }
          ref.current.muted = false;
          ref.current.currentTime = 0;
        }
      }}
      className="relative size-full pointer-events-auto"
    >
      {!isPlaying && pending && (
        <div
          className={cn("absolute top-0 flex size-full items-center justify-center bg-[#00000099] z-10", {
            "bg-[#e5733399]": isVertov,
            "rounded-4xl": !isVertov,
          })}
        >
          <div className="relative size-full">
            <div className="absolute top-0 size-full flex items-center justify-center">
              <CirclePlay size={70} color="white" fill="rgb(229, 115, 51)" absoluteStrokeWidth />
            </div>
            <div className="absolute top-0 size-full flex items-center justify-center">
              <Spinner size="xxlarge"></Spinner>
            </div>
          </div>
        </div>
      )}
      {!isPlaying && !pending && (
        <div
          className={cn("absolute top-0 flex size-full  items-center justify-center bg-[#00000099] z-10", {
            "bg-[#e5733399]": isVertov,
            "rounded-4xl": !isVertov,
          })}
        >
          <CirclePlay size={70} color="white" fill="rgb(229, 115, 51)" absoluteStrokeWidth />
        </div>
      )}
      <div className="size-full">
        <video
          className={cn("z-0 object-cover rounded-4xl size-full", { "rounded-none object-contain": isElon, "rounded-none": isVertov })}
          ref={ref}
          autoPlay={isVertov || isElon ? true : false}
          muted={isVertov || isElon ? true : false}
          playsInline
          loop
        >
          <source ref={refS} src={`${pathVid}${currentVid_loc}${postPathVid ?? ""}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <canvas ref={refCanvas} width={1} height={1}></canvas>
      </div>
    </div>
  );
};
