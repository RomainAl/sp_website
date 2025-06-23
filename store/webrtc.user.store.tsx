import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { setDismissToasts, setToast } from "./shared.store";

type webrtcUserStoreType = {
  webcamStream: MediaStream | null;
  flashes_time: number;
  flashes_speed: number;
  flashes_trig: number;
  mediaVideoFacingMode: "user" | "environment";
  mediaConstraints: MediaStreamConstraints[];
};

export const useWebrtcUserStore = create(
  subscribeWithSelector<webrtcUserStoreType>(() => ({
    webcamStream: null,
    flashes_time: 0.5,
    flashes_trig: 0,
    flashes_speed: 800,
    mediaVideoFacingMode: "user",
    mediaConstraints: [
      {
        audio: {
          sampleRate: 44100,
          sampleSize: 16,
          noiseSuppression: false,
          echoCancellation: false,
          channelCount: 1,
          autoGainControl: true,
          volume: 1,
        },
        video: {
          width: { ideal: 320 },
          height: { ideal: 180 },
          frameRate: { ideal: 10 },
          facingMode: "user",
        },
      },
      {
        audio: false,
        video: {
          width: { ideal: 320 },
          height: { ideal: 180 },
          frameRate: { ideal: 10 },
          facingMode: "environment",
        },
      },
    ],
  }))
);

export const setStreamWebcam = (constraintsNb?: number) => {
  const constraints = useWebrtcUserStore.getState().mediaConstraints[constraintsNb ?? 0];
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((webcamStream) => {
      useWebrtcUserStore.setState({ webcamStream });
    })
    .catch(() => {
      setToast({
        type: "error",
        data: {
          title: "Accès caméra non autorisé !",
          content: "Vas dans les paramètres de ton navigateur : Paramètres, Paramètres du site, Caméra",
        },
        autoClose: 20000,
      });
    });
};

export const changeFacingMode = (facingMode: "user" | "environment") => {
  useWebrtcUserStore.setState({ mediaVideoFacingMode: facingMode });
};

export const vibrate = (pattern: number | number[]) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  } else {
    console.warn("La vibration n'est pas prise en charge par ce navigateur.");
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const flash = (onFlash: boolean) => {
  const stream = useWebrtcUserStore.getState().webcamStream;
  const duration = useWebrtcUserStore.getState().flashes_time;
  vibrate(duration ?? 50);
  if (stream) {
    const track = stream.getVideoTracks()[0];

    (track as any).applyConstraints({ advanced: [{ torch: onFlash }] }).catch(() => {
      setDismissToasts();

      // setToast({
      //   type: "error",
      //   data: {
      //     content: "Impossible d'allumer ta torche !",
      //   },
      //   autoClose: 30,
      //   pauseOnFocusLoss: false,
      // });
    });
  }
};

export const setFlashesTrig = (flashes_trig: number) => {
  useWebrtcUserStore.setState({ flashes_trig });
};

export const setFlashesTime = (flashes_time: number) => {
  useWebrtcUserStore.setState({ flashes_time });
};

export const setFlashesSpeed = (flashes_speed: number) => {
  useWebrtcUserStore.setState({ flashes_speed });
};
