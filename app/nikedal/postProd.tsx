import { useNikedalStore } from "@/store/nikedal.admin.store";
import { Bloom, BrightnessContrast, EffectComposer, Glitch, Noise, ToneMapping, Vignette, WaterEffect } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode, ToneMappingMode } from "postprocessing";
import * as THREE from "three";

export default function PostProd() {
  const doGlitch = useNikedalStore((store) => store.doGlitch);
  const bloomIntensity = useNikedalStore((store) => store.bloomIntensity);
  const doBloom = useNikedalStore((store) => store.doBloom);
  const brightness = useNikedalStore((store) => store.brightness);
  const contrast = useNikedalStore((store) => store.contrast);
  const doNoise = useNikedalStore((store) => store.doNoise);

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <WaterEffect factor={0.5} />
      <Glitch
        delay={new THREE.Vector2(1, 3)}
        duration={new THREE.Vector2(0.1, 0.4)}
        strength={new THREE.Vector2(0.1, 1)}
        mode={GlitchMode.SPORADIC}
        ratio={0.85}
        active={doGlitch ? true : false}
      />
      <>{doBloom ? <Bloom mipmapBlur luminanceThreshold={0} intensity={bloomIntensity} /> : null}</>
      <BrightnessContrast brightness={brightness} contrast={contrast} />
      <>{doNoise ? <Noise opacity={0.5} blendFunction={BlendFunction.MULTIPLY} /> : null}</>
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
