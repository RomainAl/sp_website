import { Float } from "@react-three/drei";
// import TexturedSpotLight from "./TexturedSpotLight";

export default function Lights() {
  // const refDirLight = useRef<THREE.DirectionalLight>(null);
  // const refDirLight2 = useRef<THREE.DirectionalLight>(null);
  // const lightTarget = useRef<THREE.Object3D>(null);

  // useEffect(() => {
  //   if (refDirLight2.current && refDirLight.current && lightTarget.current) {
  //     refDirLight.current.target = lightTarget.current;
  //     refDirLight2.current.target = lightTarget.current;
  //   }
  // }, [refDirLight, refDirLight2, lightTarget]);

  return (
    <>
      <Float
        speed={100} // Animation speed, defaults to 1
        // rotation={[Math.PI / 2, Math.PI / 4, Math.PI / 3]}
        floatIntensity={4} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-20, 20]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        {/* <TexturedSpotLight castShadow decay={0} intensity={5} angle={Math.PI / 3} penumbra={1} position={[0, 0, 0]} target={[3, 2, 15]} /> */}
        <pointLight castShadow intensity={200} position={[0, 0, 0]} />
      </Float>
      <pointLight castShadow intensity={50} position={[0, 0, 0]} />
      <ambientLight intensity={0.1} />
      {/* <spotLight ref={refDirLight} castShadow position={[0, 5, 0]} intensity={10} angle={Math.PI * 0.3} />
      <spotLight ref={refDirLight2} castShadow position={[0, -5, 0]} intensity={10} angle={Math.PI * 0.3} />
      <primitive object={new THREE.Object3D()} ref={lightTarget} position={[0, 0, 0]} /> */}
    </>
  );
}
