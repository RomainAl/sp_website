"use client";

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
    <div className="size-full flex">
      <Button onClick={init} className="m-auto">
        PLAY
      </Button>
    </div>
  );
}
