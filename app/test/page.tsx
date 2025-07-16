"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isWakeLocked, setIsWakeLocked] = useState(false);
  const wakeLockSentinel = useRef<WakeLockSentinel | null>(null);

  // Fonction pour demander le verrouillage de l'écran
  const requestWakeLock = async () => {
    if ("wakeLock" in navigator) {
      try {
        wakeLockSentinel.current = await navigator.wakeLock.request("screen");
        setIsWakeLocked(true);
        console.log("Verrouillage de l'écran acquis !");
        alert("verrouillé");
        // Écouter l'événement de libération du verrou (par exemple, si l'utilisateur change d'onglet)
        wakeLockSentinel.current.addEventListener("release", () => {
          setIsWakeLocked(false);
          wakeLockSentinel.current = null;
          console.log("Verrouillage de l'écran relâché.");
          alert("déverrouillé");
        });
      } catch (err: unknown) {
        setIsWakeLocked(false);
        if (err instanceof Error) {
          console.error(`Erreur lors de la demande de verrouillage de l'écran : ${err.name}, ${err.message}`);
        } else {
          console.error("Erreur inconnue lors de la demande de verrouillage de l'écran.", err);
        }
      }
    } else {
      console.warn("L'API Wake Lock n'est pas supportée par ce navigateur.");
      alert("pas possible");
    }
  };

  // Fonction pour libérer le verrouillage de l'écran
  const releaseWakeLock = async () => {
    if (wakeLockSentinel.current) {
      await wakeLockSentinel.current.release();
      wakeLockSentinel.current = null;
      setIsWakeLocked(false);
      console.log("Verrouillage de l'écran libéré manuellement.");
    }
  };

  // Gérer la visibilité de la page pour réacquérir le verrou si nécessaire
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isWakeLocked) {
        // Optionnel: Réacquérir le verrou si la page redevient visible
        // Attention: Cela peut nécessiter une nouvelle interaction utilisateur selon les navigateurs
        requestWakeLock(); // Décommentez si vous voulez que le verrou soit réactivé automatiquement
      } else if (document.visibilityState === "hidden" && isWakeLocked) {
        // Le verrou est automatiquement relâché quand la page est cachée
        // Vous n'avez pas besoin de le relâcher explicitement ici, mais c'est une bonne pratique de mettre à jour l'état
        setIsWakeLocked(false);
        wakeLockSentinel.current = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // S'assurer de libérer le verrou lors du démontage du composant
      if (wakeLockSentinel.current) {
        wakeLockSentinel.current.release();
        wakeLockSentinel.current = null;
      }
    };
  }, [isWakeLocked]); // Dépendance à isWakeLocked pour réagir aux changements d'état

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4"
    >
      <div>
        <h1>Contrôle du Verrouillage de l&apos;Écran</h1>
        <p>Statut du verrouillage : {isWakeLocked ? "Actif" : "Inactif"}</p>
        <Button onClick={isWakeLocked ? releaseWakeLock : requestWakeLock}>
          {isWakeLocked ? "Désactiver le verrouillage" : "Activer le verrouillage"}
        </Button>
        <p>
          Note: Le verrouillage de l&apos;écran est automatiquement relâché si vous quittez la page, changez d&apos;onglet ou minimisez le navigateur.
        </p>
      </div>
    </motion.div>
  );
}
