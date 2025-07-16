"use client";

import { MyHeader } from "@/components/myHeader";
import ToastG from "./toastG";

export default function Layout_mine({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MyHeader />
      <ToastG />
      {children}
    </>
  );
}
