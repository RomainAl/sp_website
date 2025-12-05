"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

export default function Home() {
  console.log("RENDER ACCUEIL");
  // return <Nikedal />;
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  // Constantes
  const targetUrl = "https://smartphonics.art";
  const handleExternalNavigation = async () => {
    setLoading(true);
    // 2. Annuler la requête précédente si elle existe
    if (abortControllerRef.current) {
      // Appeler abort() sur la requête encore en cours
      abortControllerRef.current.abort();
      console.log("Requête précédente annulée.");
    }

    // 3. Créer un NOUVEAU contrôleur pour cette tentative
    const controller = new AbortController();
    abortControllerRef.current = controller; // <-- Mettre à jour la référence
    const signal = controller.signal;

    try {
      const response = await fetch(targetUrl, {
        method: "HEAD",
        mode: "no-cors",
        signal: signal, // Utiliser le signal du nouveau contrôleur
      });

      // Si le fetch réussit, la vérification est terminée, on peut effacer la référence.
      abortControllerRef.current = null;

      const isConnectionSuccessful = response.type === "opaque" || (response.status >= 200 && response.status < 400);

      if (isConnectionSuccessful) {
        window.location.replace(targetUrl);
        setLoading(false);
      } else {
        console.warn("Le site cible a répondu de manière inattendue. Restez sur ici");
      }
    } catch (err) {
      // 4. Gestion de l'échec (Réseau ou Annulation)

      // Affinement du type pour TypeScript
      if (err instanceof Error && err.name === "AbortError") {
        // Ignorer les erreurs d'annulation, ce n'est pas un échec réseau
        return;
      }

      // C'est un vrai échec réseau

      console.error("Échec de la connexion réseau:", String(err));
    } finally {
      // Assurez-vous que la référence est nettoyée si le fetch se termine normalement
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  useInterval(handleExternalNavigation, 5000);

  // useEffect(() => {
  //   handleExternalNavigation();

  //   // Nettoyage final : si le composant est démonté pendant le fetch initial, l'annuler.
  //   return () => {
  //     if (abortControllerRef.current) {
  //       abortControllerRef.current.abort();
  //     }
  //   };
  // }, [targetUrl]); // targetUrl est constant, donc lance une seule fois

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4"
    >
      <Image
        src={"/fond02.jpg"}
        width={3500}
        height={1500}
        alt="Picture of the performance"
        className="absolute object-cover size-full top-0 left-0 z-0 blur-sm"
      ></Image>
      <div
        className={cn(
          "max-w-2xl p-6 sm:p-10 rounded-lg shadow-md ring-2 ring-accent flex flex-col gap-5 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs"
        )}
      >
        <h2 className="text-lg text-primary font-semibold">Performance en cours...</h2>
        {/* <Link
          href={"https://www.theatre-vanves.fr/spectacle/nicolas-canot-romain-al"}
          className="text-sm text-foreground flex flex-row gap-3 items-center"
        >
          <p className="text-sm">Vendredi 5 dec. au Théâtre de Vanves, à 20h</p> <SquareMousePointer className="text-primary" size={20} />
        </Link> */}

        <p className="text-sm text-justify">
          Connectez-vous bien au réseau wifi :{" "}
          <a href="WIFI:T:nopass;S:WifiTest;;">
            <strong className="text-primary font-black">smartphonics</strong>
          </a>
          . Vous allez ensuite être redirigé automatiquement vers le site Web de la performance (
          <strong className="text-primary font-black">smartphonics.art</strong>)
        </p>
        {loading && <Spinner size="large" className="mt-2" />}
        {!loading && (
          <Button variant="outline" size={"circle"} className="w-fit m-auto rounded-full bg-primary" asChild>
            <a href="https://smartphonics.art" className="p-3">
              <strong className="text-primary font-black">GO</strong>
            </a>
          </Button>
        )}
        {/* {error !== "" && (
          <p className="text-sm">
            1. Ouvrez l&apos;application &quot;Réglages&quot; de votre téléphone.
            <br />
            2. Allez dans &quot;Wi-Fi&quot;.
            <br />
            3. Sélectionnez le réseau ouvert &quot;smartphonics&quot;.
          </p>
        )} */}
        {/* <div className="w-full flex flex-row gap-2 flex-wrap items-center justify-center">
          <Button asChild>
            <a href="WIFI:T:nopass;S:WifiTest;;">Wifi</a>
          </Button>
          <Button asChild>
            <a href="intent://settings/wifi#Intent;scheme=android;package=com.android.settings;end">Param Wi-Fi</a>
          </Button>
          <Button asChild>
            <a href={"App-Prefs:root=WIFI"}>Regle Wi-Fi (iPhone/iPad)</a>
          </Button>
        </div> */}
      </div>
    </motion.div>
  );
}
