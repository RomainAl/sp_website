"use client";

import { useEffect } from "react";

const ScrollTrigger = () => {
  useEffect(() => {
    // 🎯 Logique pour forcer le masquage des barres d'outils sur iOS
    const hideSafariUI = () => {
      window.scrollTo(0, 100);
    };

    // Déclencher le défilement après le rendu
    setTimeout(hideSafariUI, 1000);

    // Maintenir le scroll à 1px pour garder la barre masquée
    const handleScroll = () => {
      if (window.scrollY < 1) {
        window.scrollTo(0, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    // 💡 Classes Tailwind pour l'astuce de défilement :
    <div className="overflow-y-auto absolute top-0 left-0 w-dvw h-dvh z-50 border-3 border-amber-400 text-9xl pointer-events-none">
      ferafergaaergaergaergaergarg reagergaerga rag reag reag aerg aerg aerg aerg aerg ferafergaaergaergaergaergarg reagergaerga rag reag reag aerg
      aerg aerg aerg aergferafergaaergaergaergaergarg reagergaerga rag reag reag aerg aerg aerg aerg aergferafergaaergaergaergaergarg reagergaerga rag
      reag reag aerg aerg aerg aerg aerg ferafergaaergaergaergaergarg reagergaerga rag reag reag aerg aerg aerg aerg aerg ferafergaaergaergaergaergarg
      reagergaerga rag reag reag aerg aerg aerg aerg aergferafergaaergaergaergaergarg reagergaerga rag reag reag aerg aerg aerg aerg
      aergferafergaaergaergaergaergarg reagergaerga rag reag reag aerg aerg aerg aerg aerg ferafergaaergaergaergaergarg reagergaerga rag reag reag
      aerg aerg aerg aerg aerg ferafergaaergaergaergaergarg reagergaerga rag reag reag aerg aerg aerg aerg aergferafergaaergaergaergaergarg
      reagergaerga rag reag reag aerg aerg aerg aerg aergferafergaaergaergaergaergarg reagergaerga rag reag reag aerg aerg aerg aerg aerg
    </div>
  );
};

export default ScrollTrigger;
