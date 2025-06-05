"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { setAdminAudio, useAudioAdminStore } from "@/store/audio.admin.store";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PlayButton } from "./playButton";
export function MyHeader() {
  const pathname = usePathname();

  const nikedal = useAudioAdminStore((store) => store.nikedal);
  const [onLoad, setOnLoad] = useState(false);

  const init = () => {
    if (!nikedal) {
      setAdminAudio();
      setOnLoad(true);
    }
  };
  const showPlay =
    pathname === "/" ||
    pathname.includes("instru") ||
    pathname.includes("verton") ||
    pathname.includes("flashes") ||
    pathname.includes("hack") ||
    pathname.includes("climaticdisasters") ||
    pathname.includes("nikedal");
  const showSP =
    pathname === "/" ||
    pathname === "/demo" ||
    pathname.includes("ending") ||
    pathname.includes("flashes") ||
    pathname.includes("climaticdisasters") ||
    pathname.includes("nikedal");

  return (
    <motion.div
      className="absolute top-0 h-dvh w-dvw pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
    >
      {showPlay && !nikedal && <PlayButton onLoad={onLoad} />}
      <div className="absolute top-0 w-full z-10 flex flex-row p-5 items-center pointer-events-none">
        {showSP && (
          <Link
            href={"/presentation"}
            className="text-primary pl-5 text-2xl md:text-4xl font-bold w-1/3 text-center pointer-events-auto active:text-foreground"
          >
            smart.phonics
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-1/4 ml-auto flex justify-center pointer-events-auto">
              <Button
                variant={"link"}
                className="rounded-full p-0 size-12 md:size-16 font-black border-1 border-primary bg-[#22222299] hover:bg-card backdrop-blur-xs"
              >
                <Menu className="size-full" strokeWidth={3} />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link onClick={init} href={"/"}>
                <p className={cn("w-full text-center active:text-foreground", { "text-foreground": pathname === "/" })}>{"ACCUEIL"}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/presentation"}>
                <p className={cn("w-full text-center active:text-foreground", { "text-foreground": pathname.includes("presentation") })}>
                  {"PRESENTATION"}
                </p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link onClick={init} href={"/demo"}>
                  <p className={cn("w-full text-center active:text-foreground", { "text-foreground": pathname.includes("demo") })}>
                    {"DEMONSTRATION"}
                  </p>
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link onClick={init} href={"/demo/instru?n=0"}>
                  <p className={cn("w-full text-center active:text-foreground", { "text-foreground": pathname.includes("instru") })}>
                    {"INSTRUMENT #1"}
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link onClick={init} href={"/demo/verton"}>
                  <p className={cn("w-full text-center active:text-foreground", { "text-foreground": pathname.includes("verton") })}>{"CRAZY X"}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link onClick={init} href={"/demo/flashes"}>
                  <p className={cn("w-full text-center active:text-foreground", { "text-foreground": pathname.includes("flashes") })}>
                    {"TECHNO FLASHES"}
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link onClick={init} href={"/demo/hack"}>
                  <p className={cn("w-full text-center active:text-foreground", { "text-foreground": pathname.includes("hack") })}>{"HACK"}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link onClick={init} href={"/demo/climaticdisasters"}>
                  <p
                    className={cn("w-full text-center active:text-foreground", {
                      "text-foreground": pathname.includes("climaticdisasters"),
                    })}
                  >
                    {"CLIMATIC DISASTERS"}
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link onClick={init} href={"/demo/nikedal"}>
                  <p
                    className={cn("w-full text-center active:text-foreground", {
                      "text-foreground": pathname.includes("nikedal"),
                    })}
                  >
                    {"NIKEDAL"}
                  </p>
                </Link>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
