import { setSoundVisualizerParamsRectSize_, useSoundVisualizerParamsStore } from "@/store/soundVisu.user.store";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

type SoundwaveCanvasProps = ComponentPropsWithoutRef<"canvas"> & { analyser: AnalyserNode | null };

export const SoundwaveCanvas = ({ analyser, ...props }: SoundwaveCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const refState = useRef(useSoundVisualizerParamsStore.getState());
  // const fftsize = useSoundVisualizerParamsStore((state) => state.fftSize);

  const soundVisualizer = (canvas: HTMLCanvasElement, analyser: AnalyserNode) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const isVertical = canvas.height / canvas.width > 1;
    const wOrh = isVertical ? "width" : "height";
    analyser.fftSize = refState.current.fftSize;
    analyser.smoothingTimeConstant = refState.current.smoothingTimeConstant;
    const times = new Uint8Array(analyser.frequencyBinCount);
    const barWidth = canvas[isVertical ? "height" : "width"] / analyser.frequencyBinCount;
    const stroke = refState.current.stroke;
    const rand = refState.current.rand;

    const draw = () => {
      if (Math.random() * rand < 0.1) ctx.clearRect(0, 0, canvas.width, canvas.height);
      let meanVal = 0;
      let value;
      analyser.getByteTimeDomainData(times);

      if (stroke) {
        for (let i = 0; i < analyser.frequencyBinCount; i++) {
          value = times[i] / 256 - 0.5;
          const z =
            Math.min(Math.max(value * canvas[wOrh] * refState.current.gain + canvas[wOrh] * 0.5, 0), canvas[wOrh]) - refState.current.rectSize / 2;
          // value = Math.abs(value);
          ctx.strokeStyle = refState.current.color;
          if (isVertical) {
            ctx.strokeRect(z, i * barWidth, refState.current.rectSize_ * (1 - value), refState.current.rectSize_ * (1 - value));
          } else {
            ctx.strokeRect(i * barWidth, z, refState.current.rectSize_ * (1 - value), refState.current.rectSize_ * (1 - value));
          }
          ctx.lineWidth = value * value * value * value * 10000;
        }
      } else {
        for (let i = 0; i < analyser.frequencyBinCount; i++) {
          value = 2 * (times[i] / 256 - 0.5);
          meanVal += Math.abs(value);
          const z =
            Math.min(Math.max(value * canvas[wOrh] * refState.current.gain + canvas[wOrh] * 0.5, 0), canvas[wOrh]) - refState.current.rectSize / 2;
          ctx.fillStyle = refState.current.color;
          if (isVertical) {
            ctx.fillRect(z, i * barWidth, refState.current.rectSize_, refState.current.rectSize_);
          } else {
            ctx.fillRect(i * barWidth, z, refState.current.rectSize_, refState.current.rectSize_);
          }
        }
      }
      meanVal /= analyser.frequencyBinCount;
      if (meanVal > 0.1) {
        setSoundVisualizerParamsRectSize_(refState.current.rectSize * 2);
      } else {
        setSoundVisualizerParamsRectSize_(refState.current.rectSize);
      }
      requestRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    if (!analyser) return;
    if (canvasRef.current) soundVisualizer(canvasRef.current, analyser);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        analyser?.disconnect();
      }
    };
  }, [analyser]);

  useEffect(() => {
    const unsubscribe = useSoundVisualizerParamsStore.subscribe((state) => (refState.current = state));
    return () => {
      unsubscribe();
    };
  }, []);

  return <canvas ref={canvasRef} {...props}></canvas>;
};
