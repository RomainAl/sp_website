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
        <div className="w-6 py-10 -ml-2 pointer-events-auto cursor-pointer hover:border hover:border-accent" onClick={goPrev}></div>
        <div className="w-6 py-10 -mr-2 pointer-events-auto cursor-pointer hover:border hover:border-accent" onClick={goNext}></div>
      </div>
      <div className="absolute size-full flex flex-row justify-between items-center z-40 pointer-events-none">
        <ChevronUp strokeWidth={0.85} size={60} className="text-primary -rotate-90 -m-3 animate-bounce" />

        <ChevronUp strokeWidth={0.85} size={60} className="text-primary rotate-90 -mr-3 animate-bounce" />
      </div>

      <div className={cn("size-full ring-2 ring-accent rounded-none flex flex-col justify-between bg-card")}>
        <div className="flex flex-row gap-4 items-center text-sm px-4 h-30 ring-2 ring-accent max-h-1/9">
          <div className="h-11/12 aspect-square">
            <InstaAvatarJpgMemo name={vidMeta.name.substring(0, 3)} />
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-primary font-black text-sm xs:text-xl portrait:sm:text-4xl">{vidMeta.name}</p>
            {vidMeta.link !== "" && (
              <Link href={vidMeta.link} className="text-primary italic hover:underline" target="_blank">
                {"╰┈➤ " + vidMeta.linkname}
              </Link>
            )}
            {vidMeta.alias && <p className="text-xxs xs:text-xs portrait:sm:text-lg italic text-center">{vidMeta.alias}</p>}
            <p className="text-xxs xs:text-xs portrait:sm:text-lg italic text-center">{`il y a ${Math.round(vidMeta.hashtag.length / 10)} jours`}</p>
          </div>
        </div>

        <div className="w-full overflow-auto flex-1 flex flex-col">
          {vidMeta.index === 0 && (
            <div
              onClick={() => {
                // refMux.current?.play();
              }}
            >
              <MuxPlayer
                className="mt-1 w-full"
                poster="/sp_photos00.jpg"
                disableCookies
                theme="minimal"
                title="Teaser #1"
                playbackId="hQcHf53mkP0201UOOizlNATLCfxlNISfsCDSXggrboRBs"
                metadata={{
                  video_id: "Teaser01",
                  video_title: "Teaser smart.phonics",
                  viewer_user_id: "Romain AL.",
                }}
                accentColor="#f97316"
                style={{ aspectRatio: 16 / 9 }}
              />
            </div>
          )}

          {vidMeta.index === 0 && (
            <div className="text-sm portrait:sm:text-2xl text-justify p-4 flex-1 flex flex-col items-center justify-center">
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
                sonores, tantôt créateurs d&apos;images, ils transforment la salle en un espace immersif et interactif.
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

          {vidMeta.index === 1 && (
            <div className="text-sm portrait:sm:text-2xl text-justify p-4 flex-1 flex flex-col items-center justify-center">
              <div>
                Ingénieur-chercheur en mathématiques appliquées à l&apos;imagerie 3D radar et médicale, et guitariste classique,{" "}
                <strong>Romain AL.</strong> s&apos;est reconverti en artiste visuel auprès de musiciens, collectifs et orchestres gravitant
                essentiellement autour du monde des musiques improvisées et expérimentales.
                <br />
                <br />
                Réalisateur et développeur numérique, il compose notamment des performances audiovisuelles hybrides telles que le trio{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      TAI YANG
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">TAI YANG & AL.</DialogTitle>
                      <DialogDescription className="text-justify">
                        TAI YANG & AL. est une expérience immersive, où l&apos;image, mathématiquement générée en live, les sons et les mots résonnent
                        ensemble pour questionner l&apos;aspect vibratoire de la nature, et le rapport entre l&apos;humain et le cosmos.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_TYAL.jpg"} width={1280} height={720} alt="Picture of the performance" />
                    <DialogFooter className="text-center">
                      <Link href={"https://vimeo.com/libertad/tyal06"} className="text-primary italic hover:underline" target="_blank">
                        {"╰┈➤ voir la vidéo"}
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
                (art génératif, sons et poésie), l&apos;installation participative via les smartphones du public -{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      @TABLÉE
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
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
                , les variations musicales sur 5 tableaux de Fabienne VERDIER -{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      CIRCLES
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">CIRCLES</DialogTitle>
                      <DialogDescription className="text-justify">
                        Cinq tableaux de la peintre Fabienne VERDIER lentement transformés, “vectorialisés”, “3Difiés” et animés en direct (en
                        collaboration avec le flûtiste Joce MIENNIEL).
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_Circles.jpg"} width={1280} height={720} alt="Picture of the performance" />
                  </DialogContent>
                </Dialog>
                , la création vidéoprojetée{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      EUROPA Oslo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">ONJ & AL.</DialogTitle>
                      <DialogDescription className="text-justify">
                        Performance cinématographique et numérique improvisée sur le répertoire EUROPA Oslo de l&apos;Orchestre Nationale de Jazz.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_ONJ.jpg"} width={1280} height={720} alt="Picture of the performance" />
                  </DialogContent>
                </Dialog>{" "}
                pour l&apos;Orchestre National de Jazz, le projet collectif{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      COAX - Brazil Mashup
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
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
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      D_PHASE
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">D_PHASE</DialogTitle>
                      <DialogDescription className="text-justify">
                        Film documentaire expérimental (∼30min) sur le projet scientifique (sciences cognitives) DSYNC (CNRS / IRCAM) de Clément
                        CANONNE avec le MILESDAVISQUINTETORCHESTRA! de Sylvain DARRIFOURCQ.
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
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      Dans le laboratoire de Dracula
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">Dans le laboratoire de Dracula</DialogTitle>
                      <DialogDescription className="text-justify">
                        Film documentaire (∼25min) autour d&apos;ateliers menés par des musiciens de l&apos;Orchestre National de Jazz auprès de
                        résidents de La Cerisaie, foyer d&apos;hébergement pour adultes handicapés.
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
                pour l&apos;ONJ,{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      Tomber sans bruit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">Tomber sans bruit</DialogTitle>
                      <DialogDescription className="text-justify">
                        Film documentaire (∼10min) autour de la création lyrique &quot;Tomber Sans Bruit&quot; d&apos;Elise DABROWKI inspiré du drame
                        industriel et social d&apos;un grand groupe français, leader de l&apos;habillement : Vivarte (La Halle, André, Caroll...) qui
                        a licenciée en France 20 000 personnes en 20 ans jusqu’en 2020.
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
                pour Elise DABROWSKI, clip{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      In Love With
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">In Love With</DialogTitle>
                      <DialogDescription className="text-justify">
                        Clip / captation expérimentale d&apos;In Love With de Sylvain DARRIFOURCQ.
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_ILW.jpg"} width={1280} height={720} alt="Picture of the performance" />
                    <DialogFooter className="text-center">
                      <Link href={"https://vimeo.com/libertad/inlovewith"} className="text-primary italic hover:underline" target="_blank">
                        {"╰┈➤ voir la vidéo"}
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
                pour Sylvain DARRIFOURCQ, live-streams artistiques pour le festival SONS D&apos;HIVER&nbsp;:{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="biodial" className="p-0 -my-10 portrait:sm:text-2xl">
                      Germination
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                      <DialogTitle className="text-primary">Germination - Pomme de terre</DialogTitle>
                      <DialogDescription className="text-justify">
                        Clip live-streamé : filmé, monté, joué et diffusé en temps réel pour la plateforme numérique du festival SONS D&apos;HIVER
                        (∼30min).
                      </DialogDescription>
                    </DialogHeader>
                    <Image src={"/al_Germination.jpg"} width={1280} height={720} alt="Picture of the performance" />
                    <DialogFooter className="text-center">
                      <Link href={"https://vimeo.com/libertad/pdtetal"} className="text-primary italic hover:underline" target="_blank">
                        {"╰┈➤ voir la vidéo"}
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{" "}
                & Abacaxi de Julien DESPREZ, etc.
                <br />
              </div>
            </div>
          )}

          {vidMeta.index === 2 && (
            <div className="text-sm text-justify p-4 flex-1 flex flex-col items-center justify-center gap-3">
              <MuxPlayer
                className="mt-1"
                poster="/sp_photos05.jpg"
                disableCookies
                theme="minimal"
                playbackId="4a71wWJcgZOs4xmNgA28aaRGmbzjltHToNejQjOUygU"
                title="Teaser #2"
                metadata={{
                  video_id: "Teaser01",
                  video_title: "Teaser smart.phonics",
                  viewer_user_id: "Romain AL.",
                }}
                accentColor="#f97316"
                style={{ aspectRatio: 16 / 9 }}
              />
              <Image src={"/sp_photos01.jpg"} width={853} height={1280} alt="Photos of the performance" />
              <Image src={"/sp_photos12.jpg"} width={1280} height={861} alt="Photos of the performance" />
              <Image src={"/sp_photos00.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos02.jpg"} width={853} height={1280} alt="Photos of the performance" />
              <Image src={"/sp_photos08.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos03.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/ImageSma.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos04.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos09.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos11.jpg"} width={1280} height={1644} alt="Photos of the performance" />
              <Image src={"/sp_photos06.jpg"} width={1280} height={720} alt="Photos of the performance" />
              <Image src={"/sp_photos10.jpg"} width={1280} height={720} alt="Photos of the performance" />
            </div>
          )}

          {vidMeta.index === 3 && (
            <div className="text-sm portrait:sm:text-lg text-justify p-4 flex-1 flex flex-col items-center justify-center">
              <p>
                À l&apos;origine, guitariste classique, rock et improvisateur, son parcours musical a toujours été lié aux musiques de création et au
                travail de la matière et des espaces du son. Son travail se focalise ainsi depuis plusieurs années sur les créations musicales et
                sonores électroniques, électroacoustiques ou génératives, ainsi que les installations d&apos;art numérique et les formes sonores
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
                quatre variations sur des œuvres de Steve Reich (création théâtre de l&apos;Athénée, reprise au Musée d&apos;Orsay / Paris, février
                2024).
                <br />
                <br />
                Nicolas CANOT est membre de <strong>Futurs Composés</strong> - Réseau national de la création musicale.
                <br />
              </p>
            </div>
          )}

          {vidMeta.index === 4 && (
            <div className="relative flex flex-col flex-1 justify-evenly overflow-auto">
              <Image
                src={"/fond02.jpg"}
                width={3500}
                height={1500}
                alt="Picture of the performance"
                className="absolute object-cover size-full z-0 blur-xs opacity-50"
              ></Image>
              <div className="text-sm portrait:sm:text-lg flex flex-col gap-0 text-center z-10">
                <h2 className="text-sm portrait:sm:text-lg text-primary font-bold">Production / Aides :</h2>
                <p className="text-foreground font-bold">
                  Les Transitives / Lüdicke <span className="text-foreground text-xs font-normal">- Co-production</span>
                  <br />
                  Césaré <span className="text-foreground text-xs font-normal">- Co-production</span>
                  <br />
                  MMC <span className="text-foreground text-xs font-normal">- Partenaire institutionnel</span>
                  <br />
                  Région Grand Est <span className="text-foreground text-xs font-normal">- Création et Culture Numérique</span>
                </p>
              </div>

              <div className="text-sm portrait:sm:text-lg flex flex-col gap-0 text-center  z-10">
                <h2 className="text-sm portrait:sm:text-lg text-primary font-bold">Soutiens / Accueils en résidence / Actions culturelles :</h2>
                <p className="text-foreground font-bold">
                  La Cartonnerie <span className="text-foreground text-xs font-normal">(SMAC, Reims)</span>
                  <br />
                  Césaré <span className="text-foreground text-xs font-normal">(CNCM, Reims)</span>
                  <br />
                  L’Autre Canal <span className="text-foreground text-xs font-normal">(SMAC, Nancy)</span> <br />
                  Théâtre de Vanves <span className="text-foreground text-xs font-normal">(Scène Conventionnée, Vanves)</span> <br />
                  Le Logelloù <span className="text-foreground text-xs font-normal">(Centre de création artistique, Penvénan)</span>
                  <br />
                  Bords² Scènes <span className="text-foreground text-xs font-normal">(SMAC, Vitry-Le-François)</span>
                  <br />
                </p>
              </div>

              <div className="text-sm portrait:sm:text-lg flex flex-col gap-0 text-center  z-10">
                <h2 className="text-sm portrait:sm:text-lg text-primary font-bold">Remerciements :</h2>
                <p className="text-foreground font-semibold">
                  Julien Roncaglia, Leslie Seuqram, Caroline G.,
                  <br />
                  Jérémy Nattier, Léo C.M., Malena Al.,
                  <br />
                  Aurélie Arnaud, Timothée Scherr,
                  <br />
                  Fabien Leroux, Émeric Jeansen
                </p>
              </div>
            </div>
          )}

          {vidMeta.im && <Image src={vidMeta.im} width={1280} height={720} alt="Picture of the performance" />}
        </div>

        <div className={cn("px-4 py-1 w-full max-h-1/11 flex flex-row gap-3 items-center z-20 bg-card ring-2 ring-accent border-2 border-b-accent")}>
          <p className="text-xxs xs:text-xs portrait:sm:text-sm italic text-primary text-ellipsis h-full whitespace-wrap overflow-hidden flex items-center">
            {vidMeta.hashtag}
          </p>
          <InstaComLike index={vidMeta.index} />
        </div>
      </div>
    </div>
  );
};
