import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useInstaUserStore } from "@/store/insta.user.store";
import MuxPlayer from "@mux/mux-player-react";
import "@mux/mux-player/themes/minimal";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InstaAvatarJpgMemo } from "../../components/userAvatar";
import { InstaComLike } from "./instaComLike";

export const InstaComponent = ({ index, goPrev, goNext }: { index: number; goPrev: () => void; goNext: () => void }) => {
  const vidMeta = useInstaUserStore((store) => store.vidMeta[index]);

  return (
    <div className={cn("relative flex size-full flex-col justify-center items-center")}>
      <div className="absolute size-full flex flex-row justify-between items-center z-40 pointer-events-none">
        <ChevronUp
          onClick={goPrev}
          strokeWidth={0.85}
          size={60}
          className="text-primary -rotate-90 -ml-3 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
        <ChevronUp
          onClick={goNext}
          strokeWidth={0.85}
          size={60}
          className="text-primary rotate-90 -mr-3 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
      </div>

      <div className={cn("size-full ring-2 ring-accent rounded-none flex flex-col justify-between bg-card")}>
        <div className="flex flex-row gap-4 items-center text-sm px-4 h-30 ring-2 ring-accent max-h-1/9">
          <div className="h-11/12 aspect-square">
            <InstaAvatarJpgMemo name={vidMeta.name.substring(0, 3)} />
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-primary font-black text-sm xs:text-xl">{vidMeta.name}</p>
            {vidMeta.link !== "" && (
              <Link href={vidMeta.link} className="text-primary italic hover:underline" target="_blank">
                {"╰┈➤ " + vidMeta.linkname}
              </Link>
            )}
            {index === 0 && <p className="text-xxs xs:text-xs italic text-center">{"Contenu suggéré"}</p>}
            {index === 2 && <p className="text-xxs xs:text-xs italic text-center">{"Reels"}</p>}
            {index === 3 && <p className="text-xxs xs:text-xs italic text-center">{"Story pour toi"}</p>}
            <p className="text-xxs xs:text-xs italic text-center">{`il y a ${Math.round(vidMeta.hashtag.length / 10)} jours`}</p>
          </div>
        </div>

        <div className="w-full overflow-auto flex-1 flex flex-col">
          {index === 0 && (
            <div>
              <MuxPlayer
                className="mt-1"
                poster="/sp_photos00.jpg"
                disableCookies
                theme="minimal"
                playbackId="YSDUx26zKBmlENVACbM89sIUBZNDuznxef2cj2vA42A"
                metadata={{
                  video_id: "Teaser01",
                  video_title: "Teaser smart.phonics",
                  viewer_user_id: "Romain AL.",
                }}
                style={{ aspectRatio: 16 / 9 }}
              />
            </div>
          )}

          {index === 0 && (
            <div className="text-sm text-justify p-4 flex-1 flex flex-col items-center justify-center">
              <p>
                Live audiovisuel augmenté de vos smartphones
                <br />
                par <strong>Romain AL.</strong> & <strong>Nicolas CANOT</strong>
                <br />
                <br />
                <strong className="italic">smart.phonics</strong> est une performance hybride où musique live, création visuelle et smartphones du
                public s&apos;entrelacent pour donner vie à une expérience collective inédite.
                <br />
                <br />
                Ici, les téléphones du public (via un simple site Web) deviennent instruments, écrans et extensions de la scène : tantôt générateurs
                sonores, tantôt créateurs d’images, ils transforment la salle en un espace immersif et interactif.
                <br />
                <br />
                <strong className="italic">smart.phonics</strong> interroge notre relation aux technologies qui rythment nos vies connectées,
                questionne les usages quotidiens du smartphone et des réseaux sociaux, et propose un récit visuel et sonore participatif, à la croisée
                du concert et de l&apos;art numérique.
                <br />
                <br />
                <strong>Durée de la performance :</strong> ~ 1h <br />
                Public à partir de 13 ans
              </p>
            </div>
          )}

          {index === 1 && (
            <div className="text-sm text-justify p-4 flex-1 flex flex-col items-center justify-center">
              <div>
                Ingénieur-chercheur en mathématiques appliquées à l&apos;imagerie 3D radar et médicale, et guitariste classique,{" "}
                <strong>Romain AL.</strong> s&apos;est reconverti en artiste visuel auprès de musiciens, collectifs et orchestres gravitant
                essentiellement autour du monde des musiques improvisées et expérimentales.
                <br />
                <br />
                Réalisateur et développeur numérique, il compose notamment des performances audiovisuelles hybrides telles que le trio{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      TAI YANG
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">TAI YANG & AL.</DialogTitle>
                      <DialogDescription className="text-justify">
                        TAI YANG & AL. est une expérience immersive, où l&apos;image, mathématiquement générée en live, les sons et les mots résonnent
                        ensemble pour questionner l&apos;aspect vibratoire de la nature, et le rapport entre l&apos;humain et le cosmos.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_TYAL.jpg"} width={1280} height={720} alt="Picture of the performance" />
                  </DialogContent>
                </Dialog>
                , l&apos;installation/performance participative via les smartphones du public{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      @TABLÉE
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">@TABLÉE</DialogTitle>
                      <DialogDescription className="text-justify">
                        Performance participative pour une tablée de 1 à 30 personnes qui propose une rencontre entre convives autour d’une table
                        sonorisée via leurs smartphones personnels. Ce moment convivial, au décor intimiste, devient petit à petit une pièce sonore,
                        visuelle et scénographique à laquelle le public s’intègre comme paramètre.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_TABLEE.jpg"} width={1280} height={720} alt="Picture of the performance" />
                    <DialogFooter className="text-center">
                      <Link href={"https://vimeo.com/libertad/attablee06"} className="text-primary italic hover:underline" target="_blank">
                        {"╰┈➤ voir la vidéo"}
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                ,{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      CIRCLES
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">CIRCLES</DialogTitle>
                      <DialogDescription className="text-justify">
                        Cinq tableaux de la peintre Fabienne VERDIER lentement transformés, “vectorialisés”, “3Difiés” et animés en direct (en
                        collaboration avec le flûtiste Joce MIENNIEL).
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_Circles.jpg"} width={1280} height={720} alt="Picture of the performance" />
                  </DialogContent>
                </Dialog>{" "}
                (variations sur 5 tableaux de Fabienne VERDIER), la création vidéoprojetée{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      EUROPA Oslo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">ONJ & AL.</DialogTitle>
                      <DialogDescription className="text-justify">Performance cinématographique et numérique improvisée.</DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_ONJ.jpg"} width={1280} height={720} alt="Picture of the performance" />
                  </DialogContent>
                </Dialog>{" "}
                pour l&apos;Orchestre National de Jazz, le projet collectif{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      COAX - Brazil Mashup
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">COAX - Brazil Mashup</DialogTitle>
                      <DialogDescription className="text-justify">
                        Création immersive à 360 degrés alliant musique (10 musiciens) et vidéoprojections (5 écrans) encerclant le public.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_CBM.jpg"} width={1280} height={720} alt="Picture of the performance" />
                  </DialogContent>
                </Dialog>
                , etc.
                <br />
                <br />
                Il confectionne aussi beaucoup de films musicaux&nbsp;: documentaire expérimental{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      D_PHASE
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">D_PHASE</DialogTitle>
                      <DialogDescription className="text-justify">
                        Film documentaire expérimental (∼30min) sur le projet scientifique DSYNC (CNRS / IRCAM) de Clément CANONNE avec le
                        MILESDAVISQUINTETORCHESTRA! de Sylvain DARRIFOURCQ.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_D_PHASE.jpg"} width={1280} height={720} alt="Picture of the performance" />
                    <DialogFooter className="text-center">
                      <Link href={"https://vimeo.com/libertad/dphase"} className="text-primary italic hover:underline" target="_blank">
                        {"╰┈➤ voir la vidéo"}
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
                , documentaire{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      Dans le laboratoire de Dracula
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">Dans le laboratoire de Dracula</DialogTitle>
                      <DialogDescription className="text-justify">
                        Film documentaire (∼25min) autour d’ateliers menés par des musiciens de l’Orchestre National de Jazz auprès de résidents de La
                        Cerisaie, foyer d’hébergement pour adultes handicapés.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_dracula.jpg"} width={1280} height={720} alt="Picture of the performance" />
                    <DialogFooter className="text-center">
                      <Link href={"http://vimeo.com/libertad/docula"} className="text-primary italic hover:underline" target="_blank">
                        {"╰┈➤ voir la vidéo"}
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
                pour l&apos;ONJ, documentaire{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10">
                      Tomber sans bruit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">Tomber sans bruit</DialogTitle>
                      <DialogDescription className="text-justify">
                        Film documentaire (∼10min) autour de la création lyrique &quot;Tomber Sans Bruit&quot; d’Elise DABROWKI inspiré du drame
                        industriel et social d’un grand groupe français, leader de l’habillement : Vivarte (La Halle, André, Caroll...) qui a
                        licenciée en France 20 000 personnes en 20 ans jusqu’en 2020.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_TSB.jpg"} width={1280} height={720} alt="Picture of the performance" />
                    <DialogFooter className="text-center">
                      <Link href={"http://vimeo.com/libertad/tsb03"} className="text-primary italic hover:underline" target="_blank">
                        {"╰┈➤ voir la vidéo"}
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
                pour Elise DABROWSKI, clip &quot;In Love With&quot; pour Sylvain DARRIFOURCQ, live-streams artistiques pour le festival SONS D’HIVER -
                Germination & Abacaxi de Julien DESPREZ, etc.
                <br />
              </div>
            </div>
          )}

          {index === 2 && (
            <div className="text-sm text-justify p-4 flex-1 flex flex-col items-center justify-center gap-3">
              <Image src={"/sp_photos00.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos01.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos11.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos02.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos08.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos03.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos05.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos04.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos09.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos06.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos10.jpg"} width={1280} height={720} alt="Photos of the performance" />
            </div>
          )}

          {index === 3 && (
            <div className="text-sm text-justify p-4 flex-1 flex flex-col items-center justify-center">
              <p>
                À l’origine, guitariste classique, rock et improvisateur, son parcours musical a toujours été lié aux musiques de création et au
                travail de la matière et des espaces du son. Son travail se focalise ainsi depuis plusieurs années sur les créations musicales et
                sonores électroniques, électroacoustiques ou génératives, ainsi que les installations d’art numérique et les formes sonores
                improvisées. <br />
                <br />
                Il se produit seul ou en collaboration avec des artistes plasticiens, instrumentistes improvisateurs ou chorégraphes. Ses performances
                et installations ont été présentées à de nombreuses reprises en France, en Europe ou au-delà (Angleterre, Portugal, Canada, Pologne,
                Russie ou Roumanie). <br />
                <br />
                Qu&apos;elle soit destinée à une interprétation au concert ou à une diffusion sur bandes (pour la danse contemporaine, les arts
                visuels, etc), sa musique se caractérise par un certain minimalisme formel opposé à un maximalisme du son : une écriture où prime
                l&apos;économie des techniques de composition, opposée à une exploitation maximale des concepts sonores mis en jeu (musique
                polytempique, polymétrique, spatialisée sous casques, selon les cas). <br />
                <br />
                Il est également concepteur, réalisateur en informatique musicale, designer d’installations et de performances sonores numériques poue
                de nombreux artistes ou compagnies. En 2023 et 2024, il participe au projet Street Art (ensemble Les Apaches / Paris) en composant
                quatre variations sur des œuvres de Steve Reich (création théâtre de l’Athénée, reprise au Musée d’Orsay / Paris, février 2024).{" "}
                <br />
                <br />
                Nicolas CANOT est membre de <strong>Futurs Composés</strong> - Réseau national de la création musicale.
                <br />
              </p>
            </div>
          )}
          {vidMeta.im && <Image src={vidMeta.im} width={1280} height={720} alt="Picture of the performance" />}
        </div>

        <div className={cn("px-4 py-1 w-full max-h-1/11 flex flex-row gap-3 items-center z-20 bg-card ring-2 ring-accent border-2 border-b-accent")}>
          <p className="text-xxs xs:text-xs italic text-primary text-ellipsis h-full whitespace-wrap overflow-hidden flex items-center">
            {vidMeta.hashtag}
          </p>
          <InstaComLike index={index} />
        </div>
      </div>
    </div>
  );
};
