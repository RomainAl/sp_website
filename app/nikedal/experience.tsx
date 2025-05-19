import { useAudioAdminStore } from "@/store/audio.admin.store";
import { errorMess } from "@/store/elon.store";
import { nikedalParamsDefStore, useNikedalStore } from "@/store/nikedal.admin.store";
import { CameraControls, Html, Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import CustomObject from "./customObject";
import Lights from "./lights";
import PostProd from "./postProd";
import Wireframe_ from "./wireframe";

const NB = 32; // FIXE
const props = Array.from({ length: NB }, (_, i) => ({
  rotation: new THREE.Euler(Math.PI * Math.random(), Math.PI * Math.random(), Math.PI * Math.random()),
  position: new THREE.Vector3(i - NB / 2, 0, 0), // TODO : TO DELETE
  scale: 1.5 * Math.random() + 1,
}));

type MyInstancedMesh = THREE.InstancedMesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.InstancedMeshEventMap
>;

export const ExperienceMemo = memo(function Experience() {
  console.log("RENDER EXPERIENCE");
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const analyser = useAudioAdminStore((store) => store.nikedalAnalyser);
  const nikedal = useAudioAdminStore((store) => store.nikedal);
  const times = useRef<Uint8Array>(null);
  const refBoxs = useRef<(THREE.Group | null)[]>([]);
  const refCustoms = useRef<(THREE.Group | null)[]>([]);
  const refTexts = useRef<(HTMLParagraphElement | null)[]>([]);
  const refTexts2 = useRef<(HTMLParagraphElement | null)[]>([]);
  const refHtmls = useRef<(HTMLDivElement | null)[]>([]);
  const refHtmls2 = useRef<(HTMLDivElement | null)[]>([]);
  const refState = useRef(useNikedalStore.getState());
  const refBoxsInstances = useRef<MyInstancedMesh | null>(null);
  const refLinesInstances = useRef<MyInstancedMesh | null>(null);
  const refTotal = useRef<THREE.Group>(null);
  const refCam = useRef<CameraControls>(null);
  const delta_sum = useRef<number>(0);

  useFrame((state, delta) => {
    if (delta_sum.current < 1 / 30) {
      delta_sum.current += delta;
      return;
    } else {
      delta_sum.current = 0;
    }

    if (refTotal.current) {
      refTotal.current.rotation.x += Math.pow(refState.current.camRotX / nikedalParamsDefStore.camRotX[1], 7) * nikedalParamsDefStore.camRotX[1];
      refTotal.current.rotation.y += Math.pow(refState.current.camRotY / nikedalParamsDefStore.camRotY[1], 7) * nikedalParamsDefStore.camRotY[1];
      // refTotal.current.rotation.z += Math.pow(refState.current.camRotZ / nikedalParamsDefStore.camRotZ[1], 7) * nikedalParamsDefStore.camRotZ[1];
    }
    if (analyser && times.current) {
      analyser.getByteTimeDomainData(times.current);
      let value: number;
      let meanVal: number = 0;
      for (let i = 0; i < NB; i++) {
        value = times.current[i] / 256 - 0.5;
        if (Math.abs(value) < 0.01) value = 0;
        meanVal += Math.abs(value);
        value *= 2;
        refBoxs.current[i]?.position.set(
          (i - NB / 2) * refState.current.compress,
          value * refState.current.gainNik,
          value * refState.current.gainNik
        );
        refCustoms.current[i]?.position.set(
          (i - NB / 2) * refState.current.compress,
          -value * refState.current.gainNik,
          -value * refState.current.gainNik
        );
        if (value > 0) {
          if (refTexts && refTexts.current && i < refTexts.current.length && refTexts.current[i] instanceof HTMLElement) {
            (refTexts.current[i] as HTMLParagraphElement).innerText = value.toString();
          }
          if (refTexts2 && refTexts2.current && i < refTexts2.current.length && refTexts2.current[i] instanceof HTMLElement) {
            (refTexts2.current[i] as HTMLParagraphElement).innerText = errorMess[Math.round(value * 1000) % errorMess.length].message;
          }
        }
      }
      meanVal /= analyser.frequencyBinCount;
      let scale_: number = 1;
      if (meanVal > 0.25) {
        scale_ = 20;
      }
      Array.from({ length: NB }).map((_, i) => {
        const scale = props[i].scale * refState.current.scaleNik * scale_;
        refBoxs.current[i]?.scale.set(scale, scale, scale);
        refCustoms.current[i]?.scale.set(scale, scale, scale);
      });
    }
  });

  useEffect(() => {
    if (audioContext && analyser && nikedal) {
      analyser.disconnect();
      analyser.fftSize = NB * 2;
      analyser.smoothingTimeConstant = 1.0;
      times.current = new Uint8Array(analyser.frequencyBinCount);
      nikedal.node.connect(analyser).connect(audioContext.destination);
      audioContext.resume();
      nikedal.parameters.find((p) => p.name === "OFF-ON").value = 1.0;
    }
    return () => {
      analyser?.disconnect();
      audioContext?.suspend();
      nikedal?.node.disconnect();
    };
  }, [audioContext, analyser, nikedal]);

  useEffect(() => {
    const unsubscribeTotal = useNikedalStore.subscribe((state) => (refState.current = state));
    const unsubscribeDoBoxs = useNikedalStore.subscribe(
      (state) => state.doBox,
      (value) => {
        if (refBoxsInstances.current) refBoxsInstances.current.visible = value ? true : false;
      }
    );
    const unsubscribeDoLines = useNikedalStore.subscribe(
      (state) => state.doLine,
      (value) => {
        if (refLinesInstances.current) refLinesInstances.current.visible = value ? true : false;
      }
    );
    const unsubscribeCamDist = useNikedalStore.subscribe(
      (state) => state.camDist,
      (value) => {
        refCam.current?.setPosition(0, 0, value, true);
      }
    );

    const unsubscribeTextSize = useNikedalStore.subscribe(
      (state) => state.textSize,
      (value) => {
        refTexts.current.forEach((c) => {
          if (c) c.style.fontSize = `${value}px`;
        });
        refTexts2.current.forEach((c) => {
          if (c) c.style.fontSize = `${value}px`;
        });
      }
    );

    const unsubscribeDoText = useNikedalStore.subscribe(
      (state) => state.doText,
      (value) => {
        refHtmls.current.forEach((c) => {
          if (c) c.style.display = value ? "block" : "none";
        });
        refHtmls2.current.forEach((c) => {
          if (c) c.style.display = value ? "block" : "none";
        });
      }
    );

    return () => {
      unsubscribeTotal();
      unsubscribeDoBoxs();
      unsubscribeDoLines();
      unsubscribeCamDist();
      unsubscribeTextSize();
      unsubscribeDoText();
    };
  }, []);

  return (
    <>
      <CameraControls ref={refCam} />
      <Lights />
      <PostProd />
      <group ref={refTotal}>
        <Instances ref={refBoxsInstances} range={NB}>
          <boxGeometry />
          <meshStandardMaterial depthTest={false} toneMapped={true} />
          <Wireframe_ />
          {props.map(({ position, scale }, i) => (
            <group
              ref={(input) => {
                refBoxs.current[i] = input;
              }}
              key={i}
              position={position}
              scale={scale}
            >
              <Instance color={Math.random() * 0xffffff} />
            </group>
          ))}
        </Instances>

        <Instances ref={refLinesInstances} range={NB} visible={true}>
          <CustomObject />
          <meshStandardMaterial depthTest={false} toneMapped={false} />
          <Wireframe_ />
          {props.map((props, i) => (
            <group
              ref={(input) => {
                refCustoms.current[i] = input;
              }}
              key={i}
              {...props}
            >
              <Instance color={Math.random() * 0xffffff}>
                <Html
                  ref={(input) => {
                    refHtmls.current[i] = input;
                  }}
                  as="div" // Wrapping element (default: 'div')
                  center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
                  distanceFactor={10}
                  position={[0.5, 0.5, 0.5]}
                >
                  <p
                    key={i}
                    ref={(input) => {
                      refTexts.current[i] = input;
                    }}
                    className="text-xs text-accent font-sans text-center"
                  ></p>
                </Html>
                <Html
                  ref={(input) => {
                    refHtmls2.current[i] = input;
                  }}
                  as="div" // Wrapping element (default: 'div')
                  center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
                  distanceFactor={10}
                  position={[-0.5, -0.5, -0.5]}
                >
                  <p
                    key={i}
                    ref={(input) => {
                      refTexts2.current[i] = input;
                    }}
                    className="text-xs text-foreground font-sans text-center"
                  ></p>
                </Html>
              </Instance>
            </group>
          ))}
        </Instances>
      </group>
    </>
  );
});
