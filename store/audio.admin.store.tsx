import nextConfig from "@/next.config";
import { createDevice, Device } from "@rnbo/js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type audioStoreType = {
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  merger: ChannelMergerNode | null;
  nikedal: Device | null;
  verton: Device | null;
  hack: Device | null;
  flashesTech: Device | null;
  filter: BiquadFilterNode | null;
  nikedalAnalyser: AnalyserNode | null;
  instrus: Device[];
};

export const useAudioAdminStore = create(
  devtools<audioStoreType>(() => ({
    audioContext: null,
    audioAnalyser: null,
    merger: null,
    nikedal: null,
    hack: null,
    verton: null,
    flashesTech: null,
    filter: null,
    nikedalAnalyser: null,
    instrus: new Array(1),
  }))
);

export const setAdminAudio = async () => {
  const ctx = new AudioContext();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  const instrus = useAudioAdminStore.getState().instrus;
  let nikedal = null;
  try {
    const path = nextConfig.basePath + "/nikedal";
    nikedal = await loadRNBO(path, ctx);
  } catch (e) {
    console.error(e);
  }

  let verton = null;
  try {
    const path = nextConfig.basePath + "/verton";
    verton = await loadRNBO(path, ctx);
  } catch (e) {
    console.error(e);
  }

  let flashesTech = null;
  try {
    const path = nextConfig.basePath + "/flashesTech";
    flashesTech = await loadRNBO(path, ctx);
  } catch (e) {
    console.error(e);
  }

  let hack = null;
  try {
    const path = nextConfig.basePath + "/hack";
    hack = await loadRNBO(path, ctx);
  } catch (e) {
    console.error(e);
  }

  for (let i = 0; i < instrus.length; i++) {
    try {
      const path = `/instru${i}`;
      instrus[i] = await loadRNBO(path, ctx);
    } catch (e) {
      console.error(e);
    }
  }

  useAudioAdminStore.setState({
    audioContext: ctx,
    nikedal: nikedal,
    verton: verton,
    hack: hack,
    flashesTech: flashesTech,
    filter: filter,
    instrus: instrus,
    nikedalAnalyser: ctx.createAnalyser(),
    audioAnalyser: ctx.createAnalyser(),
  });
};

const loadRNBO = async (path: string, ctx: AudioContext) => {
  const rawPatcher = await fetch(`${path}/patch.export.json`);
  const patcher = await rawPatcher.json();
  const dependenciesResponse = await fetch(`${path}/dependencies.json`);
  let dependencies = await dependenciesResponse.json();
  dependencies = dependencies.map((d: { id: string; file: string }) => (d.file ? Object.assign({}, d, { file: `${path}/` + d.file }) : d));
  const device = await createDevice({ context: ctx, patcher: patcher });
  if (dependencies.length) await device.loadDataBufferDependencies(dependencies);
  return device;
};
