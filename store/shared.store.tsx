import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type admin2userDataType = {
  goto?: string;
  getStream?: { call: number; goto: string } | undefined;
  toast?: toastStoreType;
  flashes_trig?: number;
  flashes_time?: number;
  gain?: number;
  opacity?: number;
  elonMode?: number;
  elonVid?: number;
  elonAutoplay_trig?: number;
  elonAutostop_trig?: number;
  elonSpeech?: boolean;
  invert?: boolean;
  elonSpeed?: boolean;
  vib_trig?: number;
  elonToasts_trig?: number;
};

export type user2adminDataType = {
  name?: string;
  currentInstaVid?: number;
  toast?: toastStoreType;
};

type toastStoreType = {
  data?: {
    title?: string;
    content: string;
    isAdmin?: boolean;
  };
  position?: string;
  progress?: number | undefined;
  autoClose?: boolean | number;
  render?: string;
  type?: "error" | "info" | "warning" | "success" | "" | "loading" | "update" | "form";
};

type toastParamsStoreType = {
  stopToasts?: boolean;
  dismissToasts?: number;
};

export const peerOptionsStore = {
  host: "smartphonics.art",
  port: 443,
  path: "/socket",
  debug: 2,
  key: "smartphonics",
  config: {
    iceServers: [{ urls: "stun:stun.services.mozilla.com" }, { urls: "stun:stun.l.google.com:19302" }],
  },
};

export const useToastStore = create(devtools<toastStoreType>(() => ({})));

export const setToast = (toast: toastStoreType) => {
  useToastStore.setState(toast, true);
};

export const useToastParamsStore = create(
  devtools<toastParamsStoreType>(() => ({
    stopToasts: false,
  }))
);

export const setDismissToasts = () => {
  useToastParamsStore.setState({ dismissToasts: Date.now() });
};

export const setStopToasts = (stop: boolean) => {
  useToastParamsStore.setState({ stopToasts: stop });
};
