"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { setToast } from "@/store/shared.store";
import { Eye } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function Home() {
  const router = useRouter();
  const [message, submitaction] = useActionState((_: unknown, formData: FormData) => {
    const pass: string = formData.get("password") as string;
    if (pass === "michelet405") {
      router.push("/ac/michelet");
      return "success";
    } else {
      setToast({ type: "error", data: { content: "Mauvais mot de passe..." } });
      return "error";
    }
  }, "");
  console.log(message);

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
            Les sujets abordés par <strong className="italic">smart.phonics</strong> amènent à proposer des actions de médiation.
            <br />
            <br />
            Les ateliers autour de cette création s&apos;adressent en premier lieu à un public adolescent et jeunes adultes (collégiens dès la 4ème,
            lycéens, élèves en Conservatoires, en écoles d’art et design, etc.), très sensibles aux questions nombreuses, complexes et ambiguës que
            pose l&apos;utilisation du smartphone et des réseaux sociaux.
            <br />
            <br />
            Selon la durée d’intervention envisagée, des actions sur-mesure seront proposées et co-construites avec les lieux de diffusion et les
            enseignants (sensibilisation, démonstrations, manipulations, ateliers de création collective, etc.). Ces ateliers peuvent avoir lieu en
            amont ou en aval de la représentation de la création <strong className="italic">smart.phonics</strong>. Ceci est à établir avec les
            enseignants, en fonction des possibilités horaires des classes et des lieux d&apos;accueil.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full portrait:sm:w-2/3 landscape:sm:w-1/2 m-auto">
          <h2 className="text-primary font-bold">Liste des actions menées</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant="secondary">
                Collège Michelet (@Vanves)
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-full overflow-scroll">
              <DialogHeader>
                <DialogTitle>COLLÈGE MICHELET</DialogTitle>
                <DialogDescription className="text-justify">
                  Actions culturelles menées auprès d&apos;une classe de 4ieme au collège Michelet à Vanves (divisée en trois séances de 2h + 2h +
                  spectacle + 1h). <br />
                  <br />
                  Cette action a permis de présenter la création (ses aspects technologiques et proprement musicaux) aux élèves. Elle a également
                  permis d’aborder (puisque c’est le cœur narratif du projet smart.phonics !) les questions liées à l&apos;usage omniprésent des
                  smartphones et des réseaux sociaux. Durant la deuxième séance, des ateliers de pratique artistique ont été réalisés avec les
                  collégiens ; ateliers pendant lesquels ils ont pu découvrir ce qu’est un &quot;échantillonneur sonore numérique&quot; et manipuler
                  cet instrument directement sur leurs smartphones (ce qui constitue l&apos;un des tableaux de smart.phonics, et réaliser un
                  &quot;faux réseau social&quot; de type Instagram à partir de leurs propres images. Après deux interventions en classe, les
                  collégiens ont pu assister au spectacle, en conditions réelles, et échanger avec les artistes.
                </DialogDescription>
              </DialogHeader>

              <form action={submitaction} className=" flex flex-row gap-2 items-endborder-3 border-amber-200">
                <div className="grid gap-2 flex-1">
                  <Input className="text-xs" type="text" name="password" placeholder={"Mot de passe"} />
                </div>
                <Button type="submit">
                  <Eye />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}
