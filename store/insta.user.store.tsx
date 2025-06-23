import { create } from "zustand";
import { devtools } from "zustand/middleware";

type instaUserStoreType = {
  vidMeta: { name: string; link: string; linkname: string; im: string; hashtag: string }[];
};

export const initInstaUserStore = {
  vidMeta: [
    {
      name: "smart.phonics",
      link: "",
      linkname: "",
      im: "ImageSma.jpg",
      hashtag:
        "#web #digitalarts #electronicmusic #hacking #cats #collaborativeart #glitches #technomusic #whales #socialnetworks #climaticdisasters",
    },
    {
      name: "Romain AL.",
      link: "https://vimeo.com/libertad",
      linkname: "Lien vimeo",
      im: "ImageAl.jpg",
      hashtag: "#Artiste visuel #Développeur Web #VJ #Réalisateur #3D #Photographe #Shader",
    },
    {
      name: "Nicolas CANOT",
      link: "",
      linkname: "",
      im: "ImageNik.jpg",
      hashtag: "#Compositeur #Improvisateur #Modulariste #Artiste digital #Développeur numérique #Enseignant",
    },
  ],
};

export const useInstaUserStore = create(devtools<instaUserStoreType>(() => ({ ...initInstaUserStore })));
