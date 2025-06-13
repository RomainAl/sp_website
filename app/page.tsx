"use client";
// import {
//   setAudioClimaticsdisasters,
//   setAudioFlashesTech,
//   setAudioHack,
//   setAudioInstru0_drone,
//   setAudioInstrus,
//   setAudioNikedal,
//   setAudioVerton,
//   setSetAudio,
// } from "@/store/audio.admin.store";
import { Nikedal } from "./nikedal";

export default function Home() {
  console.log("RENDER ACCUEIL");
  // setSetAudio(async () => {
  //   await setAudioNikedal();
  //   await setAudioHack();
  //   await setAudioInstrus();
  //   await setAudioInstru0_drone();
  //   await setAudioClimaticsdisasters();
  //   await setAudioFlashesTech();
  //   await setAudioVerton();
  // });
  return <Nikedal />;
}
