"use client";

import { MyHeader } from "@/components/myHeader";
import { requestWakeLock, useUserStore } from "@/store/user.store";
import ToastG from "./toastG";

export default function Layout_mine({ children }: { children: React.ReactNode }) {
  const wakeLock = useUserStore((store) => store.wakeLock);
  return (
    <div
      className="relative h-dvh w-dvw"
      onClick={() => {
        if (!wakeLock) requestWakeLock();
      }}
    >
      {/* <div className="absolute size-full bg-[#000000BB] backdrop-blur-xs z-50 flex justify-center items-center pointer-events-none portrait:hidden">
        <div className="flex flex-col justify-center items-center h-full gap-2 aspect-square">
          <p className="text-center text-lg font-bold text-foreground">Désolé, ce site est conçu pour une orientation verticale du smartphone...</p>
          <Smartphone className="animate-pulse text-primary" size={50} />
        </div>
      </div> */}
      {/* <ScrollTrigger /> */}
      <MyHeader />
      <ToastG />
      {children}
    </div>
  );
}
