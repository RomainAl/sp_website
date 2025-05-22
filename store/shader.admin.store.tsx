import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const initShaderStore = {
  uRMDmin: 10.0,
  uRMDmax: 90.0,
  uRMPrecision: 0.001,
  uLightAmp: 0.5,
  uLightRotY: 0.0,
  uLightY: 0.5,
  uFOV: 70.0,
  uFog: 0.063 / 1000,
  uCamX: 0.0,
  uCamY: 0.0,
  uCamZ: 0.5,
  uCamRotXTime: 0.0,
  uCamRotYTime: 0.0,
  uCamRotZTime: 0.0,
  uCamYTilt: 0.9,
  uTorY: 2.0,
  uTorP1: 5.51,
  uTorP2: 0.6,
  uTorNoise: -15.0,
  uTorTime: 10.0,
  uTorNb: 15.0,
  uNoiseScale0: 0.25,
  uNoiseScale1: 0.95,
  uNoiseAmp0: 0.2,
  uNoiseAmp1: 2.14,
  uNoise2: 0.2,
  uNoiseMinus: 0.54,
  uNoiseTime0: 0.0,
  uSeaHeight: 0.6,
  uNoiseIterN: 12.0,
  uNoiseIter: 3.0,
  uIQNoiseAmp: 15.0,
  uIQNoiseTime: 0.0,
  uIQNoiseScale: 50.0,
  uNoiseOffset: 0.0,
  uColorMountain: 0.0,
  uColorSea: 1.0,
  uColorForet: 1.0,
  uColorMate: 2.0,
  uSunSeed: 0.0,
  uSunDMin: 0.0,
  uSunRM_TdMax: 1.0,
  uAmpSun: 0.0,
  uAmpTerrain: 1.0,
  uColBright: 0.01,
  uColContrast: 1.0,
  uColSat: 1.0,
  uColFond: 1.5,
};

export const useShaderStore = create(subscribeWithSelector<typeof initShaderStore>(() => initShaderStore));

export const setShaderParam = (param: Partial<typeof initShaderStore>) => {
  useShaderStore.setState(param);
};

export const shaderParamsDefStore = {
  // uRMDmin: [0.01, 100.0, 0], //
  // uRMDmax: [0.01, 200.0, 0],
  // uRMPrecision: [0.0, 0.05, 0],
  // uLightAmp: [0.0, 1.0, 0], //
  // uLightRotY: [-4.0, 4.0, 1], //
  // uLightY: [-10.0, 10.0, 0], //
  // uFOV: [50.0, 360.0, 0], //
  // uFog: [0.0, 0.02, 0], //
  // uCamX: [-100.0, 100.0, 1], //
  // uCamY: [-1.0, 1.0, 1], //
  uNoiseAmp0: [0.0, 40.0, 0], //
  // uCamRotXTime: [-1.0, 1.0, 1], //
  // uCamRotYTime: [-1.0, 1.0, 1], //
  // uCamRotZTime: [-1.0, 1.0, 1], //
  // uCamYTilt: [0.0, 1.0, 0], //
  uTorY: [-20.0, 2.0, 0], //
  // uTorP1: [-10.0, 10.0, 0], //
  // uTorP2: [0.0, 2.0, 0], //
  // uTorNoise: [-50.0, 50.0, 0], //
  // uTorTime: [0.0, 3.0, 1], //
  // uTorNb: [0.0, 30.0, 0], //
  // uNoiseScale0: [0.0, 2.0, 0],
  // uNoiseScale1: [0.0, 2.0, 0],
  uCamZ: [-1.0, 1.0, 1], //
  // uNoiseAmp1: [0.0, 2.0, 0], //
  // uNoise2: [-5.0, 5.0, 0], // TODO //
  // uNoiseMinus: [-10.0, 10.0, 0],
  // uNoiseTime0: [0.0, 10.0, 1], //
  // uSeaHeight: [-10.0, 10.0, 0], //
  // uNoiseIterN: [0, 20, 0], // ATTENTION "int"
  // uNoiseIter: [0, 10, 0],
  // uIQNoiseAmp: [-30.0, 30.0, 0], //
  // uIQNoiseTime: [-100.0, 100.0, 1],
  // uIQNoiseScale: [-100.0, 100.0, 0],
  // uNoiseOffset: [-100.0, 100.0, 0],
  // uColorMountain: [0.0, 1.0, 0],
  // uColorSea: [0.0, 1.0, 0],
  // uColorForet: [0.0, 1.0, 0], //
  // uColorMate: [0.0, 10.0, 0], //
  // uSunSeed: [-1.0, 1.0, 0],
  // uSunDMin: [0.0, 0.1, 0],
  // uSunRM_TdMax: [0.5, 1.5, 0],
  // uAmpSun: [0.0, 1.0, 0],
  // uAmpTerrain: [0.0, 1.0, 0],
  // uColBright: [-2.0, 10.0, 0], //
  // uColContrast: [-10.0, 10.0, 0], //
  // uColSat: [-10.0, 10.0, 0], //
  // uColFond: [0.0, 5.0, 0], //
};
