import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const initNikedalStore = {
  strokeW: 1,
  doLine: 1,
  doBox: 1,
  doText: 1,
  scaleNik: 1,
  fillMix: 1,
  fillOpacity: 0,
  gainNik: 10,
  doGlitch: 0,
  doBloom: 1,
  doNoise: 0,
  brightness: 0.01, // -1 to 1
  contrast: 0.25, // -1 to 1
  bloomIntensity: 10, // -10 to 50
  camDist: 8,
  camRotX: 0,
  camRotY: 0,
  camRotZ: 0,
  compress: 1,
  textSize: 10,
};

export const useNikedalStore = create(subscribeWithSelector<typeof initNikedalStore>(() => initNikedalStore));

export const setNikedalParam = (param: Partial<typeof initNikedalStore>) => {
  useNikedalStore.setState(param);
};

export const nikedalParamsDefStore = {
  camDist: [0, 20, 1],
  camRotX: [-10, 10, 1],
  camRotY: [-10, 10, 1],
  // camRotZ: [-10, 10, 1],
  strokeW: [0, 30, 0],
  scaleNik: [0, 100, 0],
  fillMix: [0, 1, 0],
  fillOpacity: [0, 1, 0],
  gainNik: [0, 100, 0],
  compress: [0, 1, 0],
  textSize: [0, 100, 0],

  brightness: [-1, 1, 0], // -1 to 1
  contrast: [-1, 1, 0], // -1 to 1
  bloomIntensity: [-10, 50, 0], // -10 to 50
  doLine: null,
  doBox: null,
  doText: null,
  doGlitch: null,
  doBloom: null,
  doNoise: null,
};
