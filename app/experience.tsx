import { useAudioAdminStore } from "@/store/audio.admin.store";
import { errorMess } from "@/store/elon.store";
import { useNikedalStore } from "@/store/nikedal.admin.store";
import { CameraControls, Html, Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ACTION from "camera-controls";
import { memo, useEffect, useRef } from "react";
import * as THREE from "three";
import { useUnmount } from "usehooks-ts";
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
  const filter = useAudioAdminStore((store) => store.filter);
  const times = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const refBoxs = useRef<(THREE.Group | null)[]>([]);
  const refCustoms = useRef<(THREE.Group | null)[]>([]);
  const refTexts = useRef<(HTMLParagraphElement | null)[]>([]);
  const refTexts2 = useRef<(HTMLParagraphElement | null)[]>([]);
  const refHtmls = useRef<(HTMLDivElement | null)[]>([]);
  const refHtmls2 = useRef<(HTMLDivElement | null)[]>([]);
  const refState = useRef(useNikedalStore.getState());
  const refBoxsInstances = useRef<MyInstancedMesh>(null);
  const refLinesInstances = useRef<MyInstancedMesh>(null);
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
          value * refState.current.gainNik * (2 * Math.round(Math.random()) - 1),
          value * refState.current.gainNik * (2 * Math.round(Math.random()) - 1)
        );
        refCustoms.current[i]?.position.set(
          (i - NB / 2) * refState.current.compress,
          -value * refState.current.gainNik * (2 * Math.round(Math.random()) - 1),
          -value * refState.current.gainNik * (2 * Math.round(Math.random()) - 1)
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
      if (meanVal > 0.015) {
        scale_ = 3;
      }
      Array.from({ length: NB }).map((_, i) => {
        const scale = props[i].scale * refState.current.scaleNik * scale_;
        refBoxs.current[i]?.scale.set(scale, scale, scale);
        refCustoms.current[i]?.scale.set(scale, scale, scale);
      });
    }
  });

  useEffect(() => {
    if (audioContext && analyser && nikedal && filter) {
      analyser.disconnect();
      analyser.fftSize = NB * 2;
      analyser.smoothingTimeConstant = 1.0;
      times.current = new Uint8Array(analyser.frequencyBinCount);
      nikedal.node.connect(filter).connect(analyser);
      nikedal.node.connect(audioContext.destination);
      audioContext.resume();
      nikedal.parameters.find((p) => p.name === "PLAY").value = 1.0;
    }
  }, [audioContext, analyser, nikedal, filter]);

  useUnmount(() => {
    analyser?.disconnect();
    // audioContext?.suspend();
    if (nikedal && nikedal.parameters) nikedal.parameters.find((p) => p.name === "PLAY").value = 0.0;
    nikedal?.node.disconnect();
  });

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

    const unsubscribeRotPlus = useNikedalStore.subscribe(
      (state) => state.camRotYPlus,
      () => {
        refCam.current?.rotate(Math.PI / 2, 0, true);
      }
    );

    const unsubscribeRotMoins = useNikedalStore.subscribe(
      (state) => state.camRotYMoins,
      () => {
        refCam.current?.rotate(-Math.PI / 2, 0, true);
      }
    );

    return () => {
      unsubscribeTotal();
      unsubscribeDoBoxs();
      unsubscribeDoLines();
      unsubscribeCamDist();
      unsubscribeTextSize();
      unsubscribeDoText();
      unsubscribeRotPlus();
      unsubscribeRotMoins();
    };
  }, []);

  return (
    <>
      <CameraControls
        ref={refCam}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        smoothTime={1.0}
        maxDistance={15}
        minDistance={2}
        azimuthRotateSpeed={0.4}
        dollySpeed={0.7}
        touches={{ one: ACTION.ACTION.DOLLY, two: ACTION.ACTION.TOUCH_ROTATE, three: 0 }} // 1 = ROTATE, 16 = DOLLY, 0 = NONE
        mouseButtons={{ left: ACTION.ACTION.ROTATE, right: 0, wheel: ACTION.ACTION.DOLLY, middle: 0 }}
      />
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
                  zIndexRange={[0, 0]}
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
                  zIndexRange={[0, 0]}
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
