"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4"
    >
      <Image
        src={"/fond01.jpg"}
        width={3500}
        height={1500}
        alt="Picture of the performance"
        className="absolute object-cover size-full z-0 blur-xs"
      ></Image>
      <div className="max-w-2xl p-6 text-sm portrait:sm:text-lg sm:p-10 rounded-lg shadow-md ring-2 ring-accent flex flex-col gap-5 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs">
        {/* <Image
          src={"/sp_photos10.jpg"}
          width={1280}
          height={720}
          alt="Picture of the performance"
          className="object-cover w-full top-0 left-0 z-0 rounded-t-lg hidden xs:block"
        ></Image> */}
        <div className="flex flex-col gap-2 w-full portrait:sm:w-2/3 landscape:sm:w-1/2 m-auto">
          <h2 className="text-primary font-bold">Actions Culturelles</h2>
          <p className="text-justify m-auto">
            Les sujets abordés par smart.phonics (l&apos;omniprésence du smartphone, à presque tous les âges de nos vies connectées) amènent à
            proposer des actions de médiation. Les ateliers autour de cette création s&apos;adressent en premier lieu à un public adolescent et jeunes
            adultes (collégiens dès la 4ème, lycéens, élèves en Conservatoires, en écoles d’art et design, etc.), très sensibles aux questions
            nombreuses, complexes et ambiguës que pose l&apos;utilisation du smartphone et des réseaux sociaux qui en sont devenus consubstantiels.
            <br />
            Selon la durée d’intervention envisagée, des actions sur-mesure seront proposées et co-construites avec les lieux de diffusion et les
            enseignants.
            <br />
            Selon les types d’organisation envisagés, ces ateliers peuvent avoir lieu en amont ou en aval de la représentation de la création
            smart.phonics. Ceci est à établir avec les enseignants, en fonction des possibilités horaires des classes et des lieux d&apos;accueil.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full portrait:sm:w-2/3 landscape:sm:w-1/2 m-auto">
          <Button asChild variant={"secondary"}>
            <Link href={"/ac/michelet"}>Collège Michelet</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
