"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const DemoElement = ({ name, desc }: { name: string; desc: string[] }) => {
  const router = useRouter();
  return (
    <div
      className="relative w-full max-w-sm max-h-1/7 sm:max-h-none cursor-pointer rounded-2xl overflow-hidden flex justify-center items-center ring-2 ring-accent"
      onClick={() => {
        router.push(`/demo/${name.replace("-n_", "?n=")}`);
      }}
    >
      <Image className="object-cover rounded-2xl" src={`/demo_${name}.jpg`} width={1000} height={500} alt={`Picture of ${name} demo`} />

      <div className="absolute rounded-t-2xl top-0 size-full flex flex-col justify-between">
        <h1 className="bg-[#00000099] backdrop-blur-xs text-center font-bold text-foreground p-2">{desc[0]}</h1>
        {/* <p className="bg-[#00000099] backdrop-blur-xs text-sm text-foreground p-2">{desc[1]}</p> */}
      </div>
    </div>
  );
};
