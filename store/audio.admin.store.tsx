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
  climaticsdisasters: Device | null;
  flashesTech: Device | null;
  instru0_drone: Device | null;
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
    climaticsdisasters: null,
    hack: null,
    verton: null,
    flashesTech: null,
    instru0_drone: null,
    filter: null,
    nikedalAnalyser: null,
    instrus: new Array(2),
  }))
);

export const setAudioBase = () => {
  const ctx = new AudioContext();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  useAudioAdminStore.setState({
    audioContext: ctx,
    filter: filter,
    nikedalAnalyser: ctx.createAnalyser(),
    audioAnalyser: ctx.createAnalyser(),
  });
};

export const setAudioNikedal = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const nikedal = useAudioAdminStore.getState().nikedal;

  if (ctx && nikedal) return;

  if (!ctx) {
    setAudioBase();
    await setAudioNikedal();
  } else {
    let nikedal = null;
    try {
      const path = nextConfig.basePath + "/nikedal";
      nikedal = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ nikedal });
      console.log("Device loaded");
    } catch (e) {
      console.error(e);
    }
  }
};

export const setAudioVerton = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const verton = useAudioAdminStore.getState().verton;

  if (ctx && verton) return;

  if (!ctx) {
    setAudioBase();
    await setAudioVerton();
  } else {
    let verton = null;
    try {
      const path = nextConfig.basePath + "/verton";
      verton = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ verton });
      console.log("Device loaded");
    } catch (e) {
      console.error(e);
    }
  }
};

export const setAudioFlashesTech = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const flashesTech = useAudioAdminStore.getState().flashesTech;

  if (ctx && flashesTech) return;

  if (!ctx) {
    setAudioBase();
    await setAudioFlashesTech();
  } else {
    let flashesTech = null;
    try {
      const path = nextConfig.basePath + "/flashesTech";
      flashesTech = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ flashesTech });
      console.log("Device loaded");
    } catch (e) {
      console.error(e);
    }
  }
};

export const setAudioInstru0_drone = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const instru0_drone = useAudioAdminStore.getState().instru0_drone;

  if (ctx && instru0_drone) return;

  if (!ctx) {
    setAudioBase();
    await setAudioInstru0_drone();
  } else {
    let instru0_drone = null;
    try {
      const path = nextConfig.basePath + "/instru0_drone";
      instru0_drone = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ instru0_drone });
      console.log("Device loaded");
    } catch (e) {
      console.error(e);
    }
  }
};

export const setAudioHack = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const hack = useAudioAdminStore.getState().hack;

  if (ctx && hack) return;

  if (!ctx) {
    setAudioBase();
    await setAudioHack();
  } else {
    let hack = null;
    try {
      const path = nextConfig.basePath + "/hack";
      hack = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ hack });
      console.log("Device loaded");
    } catch (e) {
      console.error(e);
    }
  }
};

export const setAudioClimaticsdisasters = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const climaticsdisasters = useAudioAdminStore.getState().climaticsdisasters;

  if (ctx && climaticsdisasters) return;

  if (!ctx) {
    setAudioBase();
    await setAudioClimaticsdisasters();
  } else {
    let climaticsdisasters = null;
    try {
      const path = nextConfig.basePath + "/climaticsdisasters";
      climaticsdisasters = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ climaticsdisasters });
      console.log("Device loaded");
    } catch (e) {
      console.error(e);
    }
  }
};

export const setAudioInstrus = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const instrus = useAudioAdminStore.getState().instrus;

  if (ctx && instrus[0]) return;

  if (!ctx) {
    setAudioBase();
    await setAudioInstrus();
  } else {
    for (let i = 0; i < instrus.length; i++) {
      try {
        const path = `/instru${i}`;
        instrus[i] = await loadRNBO(path, ctx);
        useAudioAdminStore.setState({ instrus });
        console.log("Devices loaded");
      } catch (e) {
        console.error(e);
      }
    }
  }
};

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

  let instru0_drone = null;
  try {
    const path = nextConfig.basePath + "/instru0_drone";
    instru0_drone = await loadRNBO(path, ctx);
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
  let climaticsdisasters = null;
  try {
    const path = nextConfig.basePath + "/climaticsdisasters";
    climaticsdisasters = await loadRNBO(path, ctx);
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
    climaticsdisasters: climaticsdisasters,
    flashesTech: flashesTech,
    instru0_drone: instru0_drone,
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
