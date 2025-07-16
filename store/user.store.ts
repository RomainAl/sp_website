import { create } from "zustand";

type UserStoreType = {
  wakeLock: boolean;
  wakeLockSentinel: WakeLockSentinel | null;
};

export const useUserStore = create<UserStoreType>(() => ({
  wakeLock: false,
  wakeLockSentinel: null,
}));

export const setWakeLock = (wakeLock: boolean) => {
  if (!wakeLock) setWakeLockSentinel(null);
  useUserStore.setState({ wakeLock });
};

export const setWakeLockSentinel = (wakeLockSentinel: WakeLockSentinel | null) => {
  useUserStore.setState({ wakeLockSentinel });
};

export const requestWakeLock = async () => {
  if ("wakeLock" in navigator) {
    try {
      const wakeLockSentinel = await navigator.wakeLock.request("screen");
      setWakeLock(true);

      if (wakeLockSentinel) {
        wakeLockSentinel.addEventListener("release", () => {
          setWakeLock(false);
        });
      }
      setWakeLock(true);
      setWakeLockSentinel(wakeLockSentinel);
    } catch (err: unknown) {
      setWakeLock(false);
      if (err instanceof Error) {
        console.error(`Erreur lors de la demande de verrouillage de l'écran : ${err.name}, ${err.message}`);
      } else {
        console.error("Erreur inconnue lors de la demande de verrouillage de l'écran.", err);
      }
    }
  } else {
    console.warn("L'API Wake Lock n'est pas supportée par ce navigateur.");
  }
};
