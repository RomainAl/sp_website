"use client";
import { motion } from "motion/react";
import { DemoElement } from "./demoElement";
export default function Home() {
  return (
    <motion.div
      className="flex h-dvh w-dvw flex-wrap gap-3 overflow-auto justify-evenly items-center p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
    >
      <DemoElement name={"instru-n_0"} desc={["Electronic 1 knob", "blabla"]} />
      <DemoElement name={"nikedal3D"} desc={["Cryptographie", "blabla"]} />
      <DemoElement name={"vertov"} desc={["Vertov", "blabla"]} />
      <DemoElement name={"flashes"} desc={["Techno Flash", "blabla"]} />
      <DemoElement name={"climaticdisasters"} desc={["Climatic Disasters", "blabla"]} />
      <DemoElement name={"verton"} desc={["Crazy X", "blabla"]} />
      <DemoElement name={"instru-n_1"} desc={["Electronic 5 knobs", "blabla"]} />
      <DemoElement name={"hack"} desc={["Hack", "blabla"]} />
    </motion.div>
  );
}
