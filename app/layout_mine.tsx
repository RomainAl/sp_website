"use client";

import { MyHeader } from "@/components/myHeader";
import { requestWakeLock, useUserStore } from "@/store/user.store";
import ToastG from "./toastG";

export default function Layout_mine({ children }: { children: React.ReactNode }) {
  const wakeLock = useUserStore((store) => store.wakeLock);
  return (
    <div
      className="h-dvh w-dvw"
      onClick={() => {
        if (!wakeLock) requestWakeLock();
      }}
    >
      <MyHeader />
      <ToastG />
      {children}
    </div>
  );
}
