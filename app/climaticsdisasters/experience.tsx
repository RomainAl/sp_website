import { shaderParamsDefStore, useShaderStore } from "@/store/shader.admin.store";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import myFragmentShader from "./shaders/frag.glsl";
import myVertexShader from "./shaders/vertex.glsl";

const MyShader = shaderMaterial(
  { ...useShaderStore.getState(), iResolution: new THREE.Vector3(), iChannel0: new THREE.Texture() },
  myVertexShader,
  myFragmentShader
);

extend({ MyShader });

const params = Object.keys(shaderParamsDefStore);

export default function Experience() {
  const ref3DPlane = useRef<THREE.PlaneGeometry>(null);
  const refState = useRef(useShaderStore.getState());
  const delta_sum = useRef<number>(0);
  const { size } = useThree();

  console.log("RENDER CLIMATIC EXP !");
  const myShader = useMemo(() => {
    console.log("MEMO MYSHADER");
    const perlinTexture = new THREE.TextureLoader().load("/rgbaNoiseMedium.png");
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;
    perlinTexture.minFilter = THREE.NearestFilter;
    perlinTexture.magFilter = THREE.NearestFilter;
    const myShader = new MyShader();
    myShader.iChannel0 = perlinTexture;
    return myShader;
  }, []);

  myShader.iResolution = new THREE.Vector3(size.width, size.height, 0);

  useFrame((state, delta) => {
    if (delta_sum.current < 1 / 30) {
      delta_sum.current += delta;
      return;
    } else {
      delta_sum.current = 0;
    }

    params.map((name) => {
      const name_ = name as keyof typeof shaderParamsDefStore;
      if (shaderParamsDefStore[name_] && shaderParamsDefStore[name_][2] === 1) {
        myShader[name_] += Math.pow(refState.current[name_] / shaderParamsDefStore[name_][1], 7) * shaderParamsDefStore[name_][1];
      } else {
        myShader[name_] = refState.current[name_];
      }
    });
  });

  useEffect(() => {
    if (ref3DPlane.current) ref3DPlane.current.deleteAttribute("normal");
  }, []);

  useEffect(() => {
    const unsubscribeReset = useShaderStore.subscribe((state) => (refState.current = state));

    return () => {
      unsubscribeReset();
    };
  }, []);

  return (
    <>
      <mesh>
        <primitive object={myShader} />
        <planeGeometry ref={ref3DPlane} args={[size.width, size.height]} />
      </mesh>
    </>
  );
}
