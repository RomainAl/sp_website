import nextConfig from "@/next.config";
import { createDevice, Device } from "@rnbo/js";
import { create } from "zustand";
import { setStart } from "./demo.store";
import { vibrate } from "./webrtc.user.store";

type audioStoreType = {
  setAudio: () => void;
  onLoad: number;
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  merger: ChannelMergerNode | null;
  nikedal: Device | null;
  verton: Device | null;
  hack: Device | null;
  climaticdisasters: Device | null;
  flashesTech: Device | null;
  instru0_drone: Device | null;
  filter: BiquadFilterNode | null;
  nikedalAnalyser: AnalyserNode | null;
  instrus: Device[];
  sampler: Device | null;
};

export const useAudioAdminStore = create<audioStoreType>(() => ({
  setAudio: async () => {
    setOnLoad(1);
    vibrate(50);
    await setAudioNikedal();
    await setAudioHack();
    await setAudioInstrus();
    await setAudioInstru0_drone();
    await setAudioClimaticdisasters();
    await setAudioFlashesTech();
    await setAudioVerton();
    await setAudioSampler();
    vibrate(50);
    setOnLoad(0);
  },
  onLoad: 0,
  audioContext: null,
  audioAnalyser: null,
  merger: null,
  nikedal: null,
  climaticdisasters: null,
  hack: null,
  verton: null,
  flashesTech: null,
  instru0_drone: null,
  filter: null,
  nikedalAnalyser: null,
  instrus: new Array(3),
  sampler: null,
}));

export const setOnLoad = (onLoad: number) => {
  useAudioAdminStore.setState({ onLoad });
};

export const setSetAudio = (path: string) => {
  let setAudio = useAudioAdminStore.getState().setAudio;
  switch (path) {
    case "/":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioNikedal();
          await setAudioHack();
          await setAudioInstrus();
          await setAudioInstru0_drone();
          await setAudioClimaticdisasters();
          await setAudioFlashesTech();
          await setAudioVerton();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioHack().then(() => {
            setStart(true);
          });
          await setAudioInstrus();
          await setAudioNikedal();
          await setAudioInstru0_drone();
          await setAudioClimaticdisasters();
          await setAudioFlashesTech();
          await setAudioVerton();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo/fin":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioHack().then(() => {
            setStart(true);
          });
          await setAudioInstrus();
          await setAudioNikedal();
          await setAudioInstru0_drone();
          await setAudioClimaticdisasters();
          await setAudioFlashesTech();
          await setAudioVerton();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo/climaticdisasters":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioClimaticdisasters();
          await setAudioNikedal();
          await setAudioHack();
          await setAudioInstrus();
          await setAudioInstru0_drone();
          await setAudioFlashesTech();
          await setAudioVerton();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo/flashes":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioFlashesTech();
          await setAudioNikedal();
          await setAudioClimaticdisasters();
          await setAudioHack();
          await setAudioInstrus();
          await setAudioInstru0_drone();
          await setAudioVerton();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo/instru":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioInstrus();
          await setAudioInstru0_drone();
          await setAudioNikedal();
          await setAudioFlashesTech();
          await setAudioClimaticdisasters();
          await setAudioHack();
          await setAudioVerton();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo/nikedal3D":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioNikedal();
          await setAudioInstrus();
          await setAudioFlashesTech();
          await setAudioClimaticdisasters();
          await setAudioHack();
          await setAudioInstru0_drone();
          await setAudioVerton();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo/verton":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioVerton();
          await setAudioNikedal();
          await setAudioInstrus();
          await setAudioFlashesTech();
          await setAudioClimaticdisasters();
          await setAudioHack();
          await setAudioInstru0_drone();
          await setAudioSampler();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/demo/sampler":
      setAudio = async () => {
        const onLoad = useAudioAdminStore.getState().onLoad;
        if (!onLoad) {
          setOnLoad(1);
          vibrate(50);
          await setAudioSampler();
          await setAudioVerton();
          await setAudioNikedal();
          await setAudioInstrus();
          await setAudioFlashesTech();
          await setAudioClimaticdisasters();
          await setAudioHack();
          await setAudioInstru0_drone();
          vibrate(50);
          setOnLoad(0);
        }
      };
      break;
    case "/list":
      setAudio = async () => {
        setOnLoad(1);
        vibrate(50);
        await setAudioHack();
        await setAudioInstrus();
        await setAudioInstru0_drone();
        await setAudioClimaticdisasters();
        await setAudioFlashesTech();
        await setAudioVerton();
        await setAudioSampler();
        await setAudioNikedal();
        vibrate(50);
        setOnLoad(0);
      };
      break;
    default:
      setAudio = async () => {
        setOnLoad(1);
        vibrate(50);
        await setAudioNikedal();
        await setAudioHack();
        await setAudioInstrus();
        await setAudioInstru0_drone();
        await setAudioClimaticdisasters();
        await setAudioFlashesTech();
        await setAudioVerton();
        await setAudioSampler();
        vibrate(50);
        setOnLoad(0);
      };
  }
  useAudioAdminStore.setState({ setAudio });
};

export const setAudioBase = () => {
  console.log("Set audio base");
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

export const setAudioSampler = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const sampler = useAudioAdminStore.getState().sampler;

  if (ctx && sampler) return;

  if (!ctx) {
    setAudioBase();
    await setAudioSampler();
  } else {
    let sampler = null;
    try {
      const path = nextConfig.basePath + "/sampler";
      sampler = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ sampler });
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

export const setAudioClimaticdisasters = async () => {
  const ctx = useAudioAdminStore.getState().audioContext;
  const climaticdisasters = useAudioAdminStore.getState().climaticdisasters;

  if (ctx && climaticdisasters) return;

  if (!ctx) {
    setAudioBase();
    await setAudioClimaticdisasters();
  } else {
    let climaticdisasters = null;
    try {
      const path = nextConfig.basePath + "/climaticdisasters";
      climaticdisasters = await loadRNBO(path, ctx);
      useAudioAdminStore.setState({ climaticdisasters });
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
  let climaticdisasters = null;
  try {
    const path = nextConfig.basePath + "/climaticdisasters";
    climaticdisasters = await loadRNBO(path, ctx);
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
    climaticdisasters: climaticdisasters,
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
