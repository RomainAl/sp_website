import { create } from "zustand";

type instaUserStoreType = {
  currentVidGosses: number;
  currentVidGosses_Loc: number[];
  vidGossesMeta: { name: string; description: string; file: string; hashtag: string }[];
  playVidGossesGlobal: boolean;
};

export const vidGossesNb = 28;
export const startVidGosses = Math.floor(Math.random() * vidGossesNb);

export const initInstaGossesUserStore = {
  currentVidGosses: startVidGosses,
  currentVidGosses_Loc: [startVidGosses, (startVidGosses + 1) % vidGossesNb, (startVidGosses - 1 + vidGossesNb) % vidGossesNb],
  vidGossesMeta: genererVideosAnimalieres(),
  playVidGossesGlobal: false,
};

export const useInstaGossesUserStore = create<instaUserStoreType>(() => ({ ...initInstaGossesUserStore }));

export const setCurrentVidGosses = ({ currentVidGosses }: { currentVidGosses: number }) => {
  const currentVidGosses_Loc = useInstaGossesUserStore.getState().currentVidGosses_Loc;
  for (let i = 0; i < currentVidGosses_Loc.length; i++) {
    if (currentVidGosses_Loc[i] - currentVidGosses === 2 || currentVidGosses_Loc[i] - currentVidGosses === -(vidGossesNb - 2)) {
      currentVidGosses_Loc[i] = (currentVidGosses - 1 + vidGossesNb) % vidGossesNb;
    } else if (currentVidGosses_Loc[i] - currentVidGosses === -2 || currentVidGosses_Loc[i] - currentVidGosses === vidGossesNb - 2) {
      currentVidGosses_Loc[i] = (currentVidGosses + 1) % vidGossesNb;
    }
  }
  useInstaGossesUserStore.setState({ currentVidGosses: currentVidGosses, currentVidGosses_Loc: currentVidGosses_Loc });
};

export const initInstaGossesCurrentVid = () => {
  useInstaGossesUserStore.setState({
    currentVidGosses: startVidGosses,
    currentVidGosses_Loc: [startVidGosses, (startVidGosses + 1) % vidGossesNb, (startVidGosses - 1 + vidGossesNb) % vidGossesNb],
  });
};

export const setInstaGossesPlayVid = (bool?: boolean) => {
  useInstaGossesUserStore.setState({ playVidGossesGlobal: bool ?? true });
};

function genererVideosAnimalieres() {
  const name = [
    "Anaelle SERRES",
    "Anna Louvet",
    "Gaëlle Mauduit",
    "Thomas Bemal",
    "Arthur Montenache",
    "Mae Leroux",
    "Hugo Perret-Quijada",
    "Anaelle SERRES",
    "Oscar Thill",
    "Thomas Bemal",
    "Lucia Cantali",
    "Mae Leroux",
    "Anaelle SERRES",
    "Yohan Kouassi",
    "Pauline Nicolle",
    "Pol YEPES RENARD",
    "Anaelle SERRES",
    "Roscel Delphine",
    "Sibylle NEGRI",
    "Anaelle SERRES",
    "Mae LEROUX",
    "Thomas Bemal",
    "Anaelle SERRES",
    "Judith JEAN-MARIUS",
    "Anaelle SERRES",
    "Anaelle SERRES",
    "Gaston Bouyer",
    "Mathys Faroux",
    "Mae LEROUX",
  ];

  const files = [
    "AnaelleSERRES01.jpg",
    "AnnaLouvet.jpg",
    "GaëlleMauduit.mp4",
    "ThomasBemal01.jpg",
    "ArthurMontenache.jpg",
    "MaeLeroux.jpg",
    "HugoPerretQuijada.mp4",
    "AnaelleSERRES02.jpg",
    "OscarThill.mp4",
    "ThomasBemal02.jpg",
    "LuciaCantali.jpg",
    "MaeLeroux02.mp4",
    "AnaelleSERRES03.jpg",
    "YohanKouassi.mp4",
    "PaulineNicolle.jpg",
    "PolYEPESRENARD.jpg",
    "AnaelleSERRES04.jpg",
    "RoscelDelphine.mp4",
    "SibylleNEGRI.jpg",
    "AnaelleSERRES05.jpg",
    "MaeLeroux.mp4",
    "ThomasBemal03.jpg",
    "AnaelleSERRES06.jpg",
    "JudithJEAN-MARIUS.mp4",
    "AnaelleSERRES07.jpg",
    "AnaelleSERRES08.jpg",
    "GastonBouyer.jpg",
    "MathysFaroux.mp4",
    "MaeLeroux02.jpg",
  ];

  const descriptions = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Il s’agit de la photo des aiguilles du Goûter et de Bionnassay. Ces deux aiguilles se situent dans le massif du Mont-Blanc. Cette photo a été prise du village de Saint-Nicolas de Véroce, depuis le chalet de mes grands-parents. C’est un lieu où je vais souvent et que j’aime beaucoup. Par beau-temps, entre ces deux aiguilles, nous pouvons distinguer le sommet du Mont-Blanc. La photo a été réalisée durant les vacances de la Toussaint, en 2024. Les premières neiges recouvrent les massifs.",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  const hashtags = [
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves #musique",
    "#Collège #Michelet #4ieme5 #Vanves #au trot avec excuse #passion",
    "#Collège #Michelet #4ieme5 #Vanves #malakoff #parc",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves #I love",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves",
    "#Collège #Michelet #4ieme5 #Vanves #ma passion #basket",
    "#Collège #Michelet #4ieme5 #Vanves",
  ];

  const videosMeta = new Array(vidGossesNb);

  for (let i = 0; i < vidGossesNb; i++) {
    const vidMeta = {
      name: name[i % name.length],
      description: descriptions[i % descriptions.length],
      file: files[i % files.length],
      hashtag: hashtags[i % hashtags.length],
    };
    videosMeta[i] = vidMeta;
  }

  return videosMeta;
}
