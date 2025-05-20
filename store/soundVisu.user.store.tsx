import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type soundVisualiserParamsType = {
  fftSize: number;
  rectSize: number;
  rectSize_: number;
  gain: number;
  color: string;
  smoothingTimeConstant: number;
  rand: number;
  stroke: boolean;
};
export const initSoundVisualizerParams: soundVisualiserParamsType = {
  fftSize: 512,
  rectSize: 7,
  rectSize_: 7,
  gain: 3.0,
  color: "rgb(229, 115, 51)",
  smoothingTimeConstant: 1.0,
  rand: 0,
  stroke: false,
};

export const useSoundVisualizerParamsStore = create(
  subscribeWithSelector<soundVisualiserParamsType>(() => ({
    ...initSoundVisualizerParams,
  }))
);

export const setSoundVisualizerParams = (params: soundVisualiserParamsType) => {
  useSoundVisualizerParamsStore.setState(params);
};

export const setSoundVisualizerParamsRectSize_ = (rectSize_: number) => {
  useSoundVisualizerParamsStore.setState({ rectSize_ });
};
