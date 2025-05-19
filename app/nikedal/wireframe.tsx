import { useNikedalStore } from "@/store/nikedal.admin.store";
import { Wireframe } from "@react-three/drei";

export default function Wireframe_() {
  const fillMix = useNikedalStore((state) => state.fillMix);
  const fillOpacity = useNikedalStore((state) => state.fillOpacity);
  const strokeW = useNikedalStore((state) => state.strokeW);
  return (
    <>
      <Wireframe
        simplify={true} // Remove some edges from wireframes
        fill={"black"} // Color of the inside of the wireframe
        fillMix={fillMix} // Mix between the base color and the Wireframe 'fill'. 0 = base; 1 = wireframe
        fillOpacity={fillOpacity} // Opacity of the inner fill
        stroke={"white"} // Color of the stroke
        strokeOpacity={1} // Opacity of the stroke
        thickness={strokeW / 20} // Thinkness of the lines
        colorBackfaces={false} // Whether to draw lines that are facing away from the camera
        backfaceStroke={"black"} // Color of the lines that are facing away from the camera
        dashInvert={true} // Invert the dashes
        dash={false} // Whether to draw lines as dashes
        dashRepeats={4} // Number of dashes in one seqment
        dashLength={0.5} // Length of each dash
        squeeze={false} // Narrow the centers of each line segment
        squeezeMin={0.2} // Smallest width to squueze to
        squeezeMax={1} // Largest width to squeeze from
      />
    </>
  );
}
