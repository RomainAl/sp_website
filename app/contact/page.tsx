"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
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
        className="absolute object-cover size-full z-0 blur-xs"
      ></Image>
      <div className="max-w-2xl p-6 sm:p-10 rounded-lg shadow-md ring-2 ring-accent flex flex-col gap-5 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs">
        <Image
          src={"/sp_photos07.jpg"}
          width={1280}
          height={720}
          alt="Picture of the performance"
          className="object-cover w-full top-0 left-0 z-0 rounded-t-lg hidden xs:block"
        ></Image>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-primary font-bold text-center">PROCHAINES DATES :</h2>
          <p className="text-sm text-justify sm:w-2/3 m-auto">
            <span className="text-primary font-bold">L&apos;Autre Canal</span> (SMAC, Nancy)
            <br />
            <s>
              <strong>3 mai 2025</strong>
            </s>{" "}
            (sortie de résidence / bêta test)
            <br />
            <span className="text-primary font-bold">Césaré</span> (CNCM, Reims)
            <br />
            <s>
              <strong>26 sept. 2025</strong>
            </s>{" "}
            (Festival Rêves électroniques)
            <br />
            <span className="text-primary font-bold">Bords 2 Scènes</span> (SMAC, Vitry-le-François)
            <br />
            <strong>22 nov. 2025</strong> (+ actions culturelles)
            <br />
            <span className="text-primary font-bold">Théâtre de Vanves</span> (Scène conventionnée)
            <br />
            <strong>05 déc. 2025</strong> (Festival OVNI) (+ actions culturelles)
            <br />
            <span className="text-primary font-bold">Ici l&apos;Onde</span> (CNCM, Dijon)
            <br />
            <strong>30 janv. 2026</strong> (Festival Souffle)
            <br />
            <span className="text-primary font-bold">Le Lieu Multiple</span> (Cultures numériques à l&apos;Espace Mendès France, Poitiers)
            <br />
            <strong>Rentrée 2026</strong> (+ actions culturelles).
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-sm text-primary font-bold">CONTACT :</h2>
          <p className="text-sm">
            romainal@gmail.com
            <br />
            +336 58 65 29 20
          </p>
        </div>
      </div>
    </motion.div>
  );
}
