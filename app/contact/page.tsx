"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      className="relative h-dvh w-dvw flex flex-col items-center justify-center gap-3 p-4"
    >
      <Image
        src={"/fond02.jpg"}
        width={3500}
        height={1500}
        alt="Picture of the performance"
        className="absolute object-cover size-full z-0 blur-xs"
      ></Image>
      <div className="max-w-2xl p-6 rounded-lg shadow-md text-center ring-2 ring-accent flex flex-col gap-3 overflow-auto z-10 bg-[#000000BB] backdrop-blur-xs">
        <h2 className="text-sm text-primary font-semibold">CONTACT :</h2>
        <p className="text-sm">romainal@gmail.com</p>
        <p className="text-sm">+336 58 65 29 20</p>
      </div>
    </motion.div>
  );
}
