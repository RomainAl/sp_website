"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isWakeLocked, setIsWakeLocked] = useState(false);
  const wakeLockSentinel = useRef<WakeLockSentinel | null>(null);
  // Dans votre composant
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Lance le compteur seulement si le wake lock est actif
    interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Fonction pour demander le verrouillage de l'écran
  const requestWakeLock = async () => {
    if ("wakeLock" in navigator) {
      try {
        wakeLockSentinel.current = await navigator.wakeLock.request("screen");
        setIsWakeLocked(true);
        console.log("Verrouillage de l'écran acquis !");
        alert("verrouillé");

        // Écouter l'événement de libération du verrou
        if (wakeLockSentinel.current) {
          // Vérification de sécurité
          wakeLockSentinel.current.addEventListener("release", () => {
            setIsWakeLocked(false); // Mis à jour l'état quand le navigateur relâche le verrou
            wakeLockSentinel.current = null; // Important pour éviter les fuites de mémoire
            console.log("Verrouillage de l'écran relâché par événement 'release'.");
            alert("déverrouillé par release event");
          });
        }
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
      console.log("Verrouillage de l'écran libéré manuellement.");
    }
    setIsWakeLocked(false);
  };

  useEffect(() => {
    // Pas de dépendances liées à l'état du wake lock ici pour éviter les boucles.
    // Cet effet est pour gérer le nettoyage du DOM listener.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Le navigateur relâche le verrou si la page est cachée.
        // On met à jour l'état local en conséquence.
        if (isWakeLocked) {
          // Utilisez un callback pour l'état pour éviter de dépendre de isWakeLocked
          setIsWakeLocked(false);
          wakeLockSentinel.current = null;
          console.log("Verrouillage de l'écran relâché par changement de visibilité.");
          alert("déverrouillé par visibilité"); // Pour diagnostic
        }
      }
      // Pas de réacquisition automatique ici, car ça nécessite une interaction utilisateur
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Important : Ne pas libérer le wakeLockSentinel ici,
      // car il est déjà géré par l'événement 'release' attaché au sentinel lui-même
      // ou par la fonction releaseWakeLock.
      // C'est potentiellement la cause de votre problème si le sentinel est libéré trop tôt ici.
      // Laissez le sentinel être géré par son propre événement 'release' ou le bouton de désactivation.
      // Si vous le libérez ici, et que le composant est re-rendu, il sera relâché.
      if (wakeLockSentinel.current) {
        console.log("Tentative de libération du Wake Lock par cleanup - devrait être gérée ailleurs.");
        // wakeLockSentinel.current.release(); // <-- DÉCOMMENTEZ SEULEMENT SI VOUS VOULEZ QU'IL SOIT LIBÉRÉ AU DEMONTAGE DU COMPOSANT
        // wakeLockSentinel.current = null;
      }
    };
  }, []); //

  return (
    <div className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4">
      <div>
        <h1>Contrôle du Verrouillage de l&apos;Écran</h1>
        <p>Statut du verrouillage : {isWakeLocked ? "Actif" : "Inactif"}</p>
        <Button onClick={isWakeLocked ? releaseWakeLock : requestWakeLock}>
          {isWakeLocked ? "Désactiver le verrouillage" : "Activer le verrouillage"}
        </Button>
        <Button
          onClick={() => {
            navigator.wakeLock.request("screen");
          }}
        >
          Test
        </Button>
        <p>
          Note: Le verrouillage de l&apos;écran est automatiquement relâché si vous quittez la page, changez d&apos;onglet ou minimisez le navigateur.
        </p>
        <p>Compteur d&apos;activité : {counter} secondes</p>
      </div>
    </div>
  );
}
