import { useEffect, useMemo, useRef } from "react";
import { BufferGeometry } from "three";

export default function CustomObject() {
  const geometryRef = useRef<BufferGeometry>(null);
  const verticesCount = 2 * 3;
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++) positions[i] = (Math.random() - 0.5) * 3;
    return positions;
  }, [verticesCount]);

  useEffect(() => {
    if (geometryRef.current) geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <bufferGeometry ref={geometryRef}>
      <bufferAttribute attach="attributes-position" count={verticesCount} args={[positions, 3]} />
    </bufferGeometry>
  );
}
