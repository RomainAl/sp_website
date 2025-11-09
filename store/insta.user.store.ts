import { create } from "zustand";

export const initInstaUserStore = {
  vidMeta: [
    {
      name: "smart.phonics",
      index: 0,
      alias: "Contenu suggéré",
      link: "",
      linkname: "",
      im: "",
      hashtag:
        "#web #digitalarts #electronicmusic #hacking #cats #collaborativeart #glitches #technomusic #whales #socialnetworks #climaticdisasters",
    },
    {
      name: "smart.phonics",
      index: 2,
      alias: "Reels",
      link: "",
      linkname: "",
      im: "",
      hashtag:
        "#whales #socialnetworks #climaticdisasters #web #digitalarts #electronicmusic #hacking #cats #collaborativeart #glitches #technomusic",
    },
    {
      name: "Romain AL.",
      index: 1,
      alias: "",
      link: "https://vimeo.com/libertad",
      linkname: "Lien vimeo",
      im: "ImageAl.jpg",
      hashtag: "#Artiste visuel #Développeur Web #VJ #Réalisateur #3D #Photographe #Shader",
    },
    {
      name: "Nicolas CANOT",
      index: 3,
      alias: "Story pour toi",
      link: "",
      linkname: "",
      im: "ImageNik.jpg",
      hashtag: "#Compositeur #Improvisateur #Modulariste #Artiste digital #Développeur numérique #Enseignant",
    },
    {
      name: "smart.phonics",
      index: 4,
      alias: "Sponsorisée",
      link: "",
      linkname: "",
      im: "",
      hashtag:
        "#hacking #cats #collaborativeart #glitches #web #digitalarts #electronicmusic #whales #socialnetworks #climaticdisasters #technomusic ",
    },
  ],
};

export const useInstaUserStore = create<typeof initInstaUserStore>(() => ({ ...initInstaUserStore }));
