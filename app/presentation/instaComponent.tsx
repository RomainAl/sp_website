import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useInstaUserStore } from "@/store/insta.user.store";
import Player from "@vimeo/player";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { InstaAvatarJpgMemo } from "../../components/userAvatar";
import { InstaComLike } from "./instaComLike";

export const InstaComponent = ({ index, goPrev, goNext }: { index: number; goPrev: () => void; goNext: () => void }) => {
  const vidMeta = useInstaUserStore((store) => store.vidMeta[index]);
  const playerRef = useRef<HTMLDivElement>(null);
  const player = useRef<Player>(null);
  const refSpinner = useRef<HTMLDivElement>(null);
  const { width = 0 } = useWindowSize();
  useEffect(() => {
    const options = {
      id: 1081556604,
      loop: true,
      autoplay: false,
      muted: false,
      controls: true,
      width: Math.min(width, 768) - 20,
    };

    if (playerRef.current !== null) {
      player.current = new Player(playerRef.current, options);
      player.current.on("loaded", () => {
        if (refSpinner.current) refSpinner.current.style.display = "none";
        if (playerRef.current) playerRef.current.style.display = "block";
      });
    }
  }, [width]);

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
            {index == 0 && <p className="text-xxs xs:text-xs italic text-center">{"Contenu suggéré"}</p>}
            {index == 2 && <p className="text-xxs xs:text-xs italic text-center">{"Story pour toi"}</p>}
            <p className="text-xxs xs:text-xs italic text-center">{`il y a ${vidMeta.name.length} jours`}</p>
          </div>
        </div>

        <div className="w-full overflow-auto flex-1 flex flex-col">
          {index === 0 && (
            <div>
              <div ref={refSpinner} className="w-full aspect-video flex items-center justify-center">
                <Spinner size="xlarge" />
              </div>
              <div className="size-fit m-auto pt-1 hidden" ref={playerRef}></div>
            </div>
          )}

          {index === 0 && (
            <div className="text-sm text-justify p-4 flex-1 flex flex-col items-center justify-center gap-1">
              <p className="text-primary font-bold italic w-full">RÉSUMÉ :</p>
              <p>
                <strong className="italic">smart.phonics</strong> est une performance musicale et visuelle hybride, utilisant les smartphones du
                public comme dispositif numérique principal. Ainsi, tour à tour, elle peut prendre la forme d&apos;un live électronique AV et
                d’&apos;une création digitale participative, tous deux augmentés de ces téléphones intelligents qui sont autant d’écrans, d’enceintes,
                de microphones, d&apos;instruments de musique électronique, de pinceaux numériques, etc.
                <br />À la fois spectateur et co-créateur, le public s&apos;interface avec les artistes, sur scène, via un site Web modifié en temps
                réel tout au long de la performance. Ainsi connectés, ils donnent vie, ensemble, à une création sonore et visuelle, collective et
                immersive.
                <br />
                <br />
                <strong>Durée de la performance :</strong> ~ 50 min <br />
                Public de ± 150 personnes (à partir de 13 ans)
                <br />
                <br />
              </p>
              <p className="text-primary italic font-bold w-full">SYNOPSIS :</p>
              <p>
                Les smartphones, archétypes technologiques de notre époque, sont désormais omniprésents et connectent les individus autant qu&apos;ils
                les isolent. Scroller, swiper, liker sont aujourd’hui devenus des gestes anodins et la caresse micro-timée d&apos;un pouce sur un
                écran tactile impacte les rapports sociaux. <strong className="italic">smart.phonics</strong> interroge ces nouvelles pratiques, cette
                avalanche d&apos;échanges, de contenus, de vidéos et de sons. Tel un internaute qui passe d&apos;un site à l&apos;autre au gré de ses
                recherches, de ses pensées, la performance procède d&apos;une écriture par tableaux successifs, visuels et sonores. <br />
                Alternant images de fiction ou d&apos;actualité, pages Web sonores interactives, créations visuelles génératives et collectives, sons
                électroniques créés et spatialisés par les smartphones et les artistes au plateau, <strong className="italic">
                  smart.phonics
                </strong>{" "}
                propose un récit possible de l&apos;histoire commune que nous entretenons avec les nouvelles technologies. <br />
                <br />
              </p>
            </div>
          )}

          {index === 1 && (
            <div className="text-sm text-justify p-4 flex-1 flex flex-col items-center justify-center">
              <p>
                Ingénieur-chercheur en mathématiques appliquées à l&apos;imagerie 3D radar et médicale, et guitariste classique,{" "}
                <strong>Romain AL.</strong> s&apos;est reconverti en artiste visuel auprès de musiciens, collectifs et orchestres gravitant
                essentiellement autour du monde des musiques improvisées et expérimentales.
                <br />
                <br />
                Réalisateur et développeur numérique, il compose notamment des performances audiovisuelles hybrides telles que le trio “art et
                science” <strong>TAI YANG</strong>, l&apos;installation/performance participative via les smartphones du public{" "}
                <strong>@TABLÉE</strong>, le spectacle <strong>CIRCLES</strong> (variations sur 5 tableaux de Fabienne VERDIER), la création
                vidéoprojetée EUROPA Oslo pour l&apos;<strong>Orchestre National de Jazz</strong>, etc.
                <br />
                <br />
                Il confectionne aussi beaucoup de films musicaux: documentaire expérimental <strong>D_PHASE</strong>, documentaire pour l&apos;
                <strong>ONJ - Dans le laboratoire de Dracula</strong>, teaser pour <strong>Elise DABROWSKI</strong> - Tomber sans bruit, clip pour{" "}
                <strong>Sylvain DARRIFOURCQ</strong> - In Love With, live-streams artistiques pour le festival <strong>SONS D’HIVER</strong> -
                Germination & Abacaxi de <strong>Julien DESPREZ</strong>, etc.
                <br />
              </p>
            </div>
          )}

          {index === 2 && (
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
          <Image src={vidMeta.im} width={1280} height={720} alt="Picture of the performance" />
        </div>

        <div className={cn("px-4 py-1 w-full max-h-1/11 flex flex-row gap-3 items-center z-20 bg-card ring-2 ring-accent border-2 border-b-accent")}>
          <p className="text-xxs xs:text-xs italic text-primary text-ellipsis h-full whitespace-wrap overflow-hidden">{vidMeta.hashtag}</p>
          <InstaComLike index={index} />
        </div>
      </div>
    </div>
  );
};

// function DialogDemo() {
//   const { width = 0 } = useWindowSize();
//   console.log(width);
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="w-dvw">
//         <DialogHeader>
//           <DialogTitle>smart.phonics - teaser #1</DialogTitle>
//           <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
//         </DialogHeader>
//         <div className="w-1/2 border-2 border-amber-300 flex justify-center items-center">
//           <Vimeo
//             video={1081556604}
//             autoplay={false}
//             background={false}
//             controls={true}
//             muted={false}
//             // transparent={false}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
