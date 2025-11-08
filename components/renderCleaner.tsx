import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

function isTexture(value: unknown): value is THREE.Texture {
  // 1. Vérification du non-nul
  if (!value) {
    return false;
  }

  // 2. Vérification que la valeur est un objet (ce que THREE.Texture est)
  // et vérification de l'existence de la propriété 'isTexture'
  // On utilise un index sur l'objet de manière sécurisée pour éviter 'as any'.

  return (
    // On vérifie que value est un objet non-null (ni null, ni undefined)
    typeof value === "object" &&
    // On vérifie que la clé 'isTexture' existe
    "isTexture" in value &&
    // On vérifie que la valeur de 'isTexture' est true
    (value as { isTexture: boolean }).isTexture === true
  );
}

export const RendererCleaner = () => {
  const { gl, scene } = useThree();

  useEffect(() => {
    return () => {
      scene.traverse((object) => {
        if ("isMesh" in object && object.isMesh) {
          const mesh = object as THREE.Mesh;

          if (mesh.geometry) {
            mesh.geometry.dispose();
          }

          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

            materials.forEach((material) => {
              const keys = Object.keys(material) as Array<keyof typeof material>;

              for (const key of keys) {
                const value = material[key];

                // 💡 CORRECTION : Utilisation du Type Guard 'isTexture'
                if (isTexture(value)) {
                  value.dispose(); // TypeScript sait maintenant que 'value' est une THREE.Texture
                }
              }
              material.dispose();
            });
          }
        }
      });

      gl.dispose();
      console.log("Nettoyage complet effectué : GPU VRAM libérée.");
    };
  }, [gl, scene]);

  return null;
};
