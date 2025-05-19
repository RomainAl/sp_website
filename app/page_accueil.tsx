"use client";

import { LogoSP } from "@/components/logoSP";
import { Button } from "@/components/ui/button";
import { setAdminAudio } from "@/store/audio.admin.store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const init = () => {
    setAdminAudio();
    router.push("/nikedal");
  };
  return (
    <div className="size-full flex flex-col gap-5 justify-center items-center">
      <div className="flex w-1/2 max-w-sm flex-col items-center justify-center">
        <LogoSP />
        <p className="text-2xl italic text-primary">smart.phonics</p>
      </div>
      <Button onClick={init}>PLAY</Button>
    </div>
  );
}
