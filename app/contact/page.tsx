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
      <div className="max-w-2xl p-6 text-sm portrait:sm:text-lg sm:p-10 rounded-lg shadow-md ring-2 ring-accent flex flex-col gap-5 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs">
        <Image
          src={"/sp_photos07.jpg"}
          width={1280}
          height={720}
          alt="Picture of the performance"
          className="object-cover w-full top-0 left-0 z-0 rounded-t-lg hidden xs:block"
        ></Image>
        <div className="flex flex-col gap-2 w-full portrait:sm:w-2/3 landscape:sm:w-1/2 m-auto">
          <h2 className="text-primary font-bold">PROCHAINES DATES :</h2>
          <div className="text-justify flex flex-col gap-2">
            <div>
              <span className="text-primary/50 font-bold">L&apos;Autre Canal</span>{" "}
              <span className="text-foreground text-xs font-normal">(SMAC, Nancy)</span>
              <br />
              <s>
                <strong>3 mai 2025</strong>
              </s>{" "}
              <span className="text-foreground text-xs font-normal">(sortie de résidence / bêta test)</span>
            </div>
            <div>
              <span className="text-primary/50 font-bold">Césaré</span> <span className="text-foreground text-xs font-normal">(CNCM, Reims)</span>
              <br />
              <s>
                <strong>26 sept. 2025</strong>
              </s>{" "}
              <span className="text-foreground text-xs font-normal">(Festival Rêves électroniques)</span>
            </div>
            <div>
              <span className="text-primary/50 font-bold">Bords 2 Scènes</span>{" "}
              <span className="text-foreground text-xs font-normal">(SMAC, Vitry-le-François)</span>
              <br />
              <s>
                <strong>22 nov. 2025</strong>
              </s>{" "}
              <span className="text-foreground text-xs font-normal">(+ actions culturelles)</span>
            </div>
            <div>
              <span className="text-primary/50 font-bold">Théâtre de Vanves</span>{" "}
              <span className="text-foreground text-xs font-normal">(Scène conventionnée)</span>
              <br />
              <s>
                <strong>05 déc. 2025</strong>
              </s>{" "}
              <span className="text-foreground text-xs font-normal">(+ actions culturelles)</span>
            </div>
            <div>
              <span className="text-primary/50 font-bold">Ici l&apos;Onde</span>{" "}
              <span className="text-foreground text-xs font-normal">(CNCM, Dijon)</span>
              <br />
              <s>
                <strong>30 janv. 2026</strong>
              </s>{" "}
              <span className="text-foreground text-xs font-normal">(Festival Souffle)</span>
            </div>
            <div>
              <span className="text-primary font-bold">Nuit Blanche</span> <span className="text-foreground text-xs font-normal">(Paris)</span>
              <br />
              <strong>6 juin 2026</strong>{" "}
              <span className="text-foreground text-xs font-normal">(@ Lavoir Numérique, programmé par le Générateur à Gentilly)</span>
            </div>
            <div>
              <span className="text-primary font-bold">Le Lieu Multiple</span>{" "}
              <span className="text-foreground text-xs font-normal">(Cultures numériques à l&apos;Espace Mendès France, Poitiers)</span>
              <br />
              <strong>Rentrée 2026</strong> <span className="text-foreground text-xs font-normal">(+ actions culturelles)</span>.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full portrait:sm:w-2/3 landscape:sm:w-1/2 m-auto">
          <h2 className="text-primary font-bold">CONTACT :</h2>
          <p className="font-bold">
            romainal@gmail.com
            <br />
            +336 58 65 29 20
          </p>
        </div>
      </div>
    </motion.div>
  );
}
