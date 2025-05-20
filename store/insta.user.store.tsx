import { create } from "zustand";
import { devtools } from "zustand/middleware";

type instaUserStoreType = {
  vidMeta: { name: string; link: string; linkname: string; description: string; im: string; hashtag: string }[];
};

export const initInstaUserStore = {
  vidMeta: [
    {
      name: "smart.phonics",
      link: "",
      linkname: "",
      description: `smart.phonics est une performance musicale et visuelle hybride, utilisant les smartphones du public comme dispositif numérique principal. Ainsi, tour à tour, elle peut prendre la forme d’un live électronique AV  et d’une création digitale participative, tous deux augmentés de ces téléphones intelligents qui sont autant d’écrans, d’enceintes, de microphones, d’instruments de musique électronique, de pinceaux numériques, etc.
      \nÀ la fois spectateur et co-créateur, le public s'interface avec les artistes, sur scène, via un site Web modifié en temps réel tout au long de la performance. Ainsi connectés, ils donnent vie, ensemble, à une création sonore et visuelle, collective et immersive.
      \nLes smartphones, archétypes technologiques de notre époque, sont désormais omniprésents et connectent les individus autant qu’ils les isolent. Scroller, swiper, liker sont aujourd’hui devenus des gestes anodins  et la caresse micro-timée d’un pouce sur un écran tactile impacte les rapports sociaux. smart.phonics interroge ces nouvelles pratiques, cette avalanche d’échanges, de contenus, de vidéos et de sons. Tel un internaute qui passe d’un site à l’autre au gré de ses recherches, de ses pensées, la performance procède d’une écriture par tableaux successifs, visuels et sonores.
      \nAlternant images de fiction ou d’actualité, pages Web sonores interactives, créations visuelles génératives et collectives, sons électroniques créés et spatialisés par les smartphones et les artistes au plateau, smart.phonics propose un récit possible de l’histoire commune que nous entretenons avec les nouvelles technologies.\n\n`,
      im: "ImageSma.jpg",
      hashtag:
        "#web #digitalarts #electronicmusic #collaborativeart #glitches #technomusic #videoart #whales #technology #socialnetworks #climaticdisasters #sequencing #storms #hires #hacking #cats",
    },
    {
      name: "Romain AL.",
      link: "https://vimeo.com/libertad",
      linkname: "Lien vimeo",
      im: "ImageAl.jpg",
      description: `Ingénieur-chercheur en mathématiques appliquées à l’imagerie 3D radar et médicale, et guitariste classique, je me suis reconverti en artiste visuel auprès de musiciens, collectifs et orchestres gravitant essentiellement autour du monde des musiques improvisées et expérimentales.
        \nRéalisateur et développeur numérique, je compose notamment des performances audiovisuelles hybrides telles que notre trio “art et science” TAI YANG & Al., l’installation/performance participative via les smartphones du public @TABLÉE, le spectacle CIRCLES (variations sur 5 tableaux de Fabienne VERDIER), la création vidéo pour l’Orchestre National de Jazz, notre duo Linda Oláh & Al., le spectacle dispersif MiMo, etc.
        \nJe confectionne aussi beaucoup de films musicaux : documentaire expérimental D_PHASE, documentaire pour l’ONJ - Dans le laboratoire de Dracula, teaser pour Elise DABROWSKI - Tomber sans bruit, clip pour Sylvain DARRIFOURCQ - In Love With, live-streams artistiques pour le festival SONS D’HIVER -  Germination & Abacaxi de Julien DESPREZ, etc.\n\n`,
      hashtag: "#Artiste visuel #Développeur Web #VJ #Réalisateur #3D #Photographe #Shader",
    },
    {
      name: "Nicolas CANOT",
      link: "",
      linkname: "",
      im: "ImageNik.jpg",
      description: `À l’origine, guitariste classique, rock et improvisateur, son parcours musical a toujours été lié aux musiques de création et au travail de la matière et des espaces du son. Son travail se focalise ainsi depuis plusieurs années sur les créations musicales et sonores électroniques, électroacoustiques ou génératives, ainsi que les installations d’art numérique et les formes sonores improvisées.
        \nIl se produit seul ou en collaboration avec des artistes plasticiens, instrumentistes improvisateurs ou chorégraphes. Ses performances et installations ont été présentées à de nombreuses reprises en France, en Europe ou au-delà (Angleterre, Portugal, Canada, Pologne, Russie ou Roumanie).
        \nQu'elle soit destinée à une interprétation au concert ou à une diffusion sur bandes (pour la danse contemporaine, les arts visuels, etc), sa musique se caractérise par un certain minimalisme formel opposé à un maximalisme du son : une écriture où prime l’économie des techniques de composition, opposée à une exploitation maximale des concepts sonores mis en jeu (musique polytempique, polymétrique, spatialisée sous casques, selon les cas).
        \nIl est également concepteur, réalisateur en informatique musicale, designer d’installations et de performances sonores numériques, par sa connaissance de langages de programmation tels que MaxMSP, Arduino, C++, etc. Il est ainsi le concepteur numérique des performances et installations FIXIN et FIXIN Extended de Sylvain Darrifourcq (Biennale NEMO, Scène nationale d’Orléans, Lieu Unique de Nantes, etc), Arc de Julien Desprez (La Muse en Circuit, création festival Musica, 2023) et a collaboré aux créations PianoMachine (Claudine Simon), MiMo (Rémi Fox / Linda Olah) ou encore Paysage de Propagations (Christian Sebille), entre autres.
        \nIl est le compositeur et conseiller numérique de la création chorégraphique, Big Bang de la compagnie Cognitive Overload (création 2023 - Le Manège - Scène nationale de Reims).
        \nEn 2023 et 2024, il participe au projet Street Art (ensemble Les Apaches / Paris) en composant quatre variations sur des œuvres de Steve Reich (création théâtre de l’Athénée, reprise au Musée d’Orsay / Paris, février 2024).
        \nIl est le créateur du projet Lady Keijuro (live électronique improvisé, en résidence 2022 à la Cartonnerie, SMAC de Reims).
        \nNicolas Canot est membre de Futurs Composés - Réseau national de la création musicale\n\n`,
      hashtag: "#Compositeur #Improvisateur #Modulariste #Artiste digital #Développeur numérique #Enseignant",
    },
  ],
};

export const useInstaUserStore = create(devtools<instaUserStoreType>(() => ({ ...initInstaUserStore })));
