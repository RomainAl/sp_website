"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlayButton } from "./playButton";
export function MyHeader() {
  const pathname = usePathname();
  console.log(pathname);
  const showPlay =
    pathname === "/" || pathname.includes("instru") || pathname.includes("verton") || pathname.includes("flashes") || pathname.includes("hack");
  const showSP = pathname === "/" || pathname.includes("flashes") || pathname.includes("instru");
  return (
    <motion.div
      className="absolute top-0 h-dvh w-dvw pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
    >
      {showPlay && <PlayButton />}
      <div className="absolute top-0 w-full z-10 flex flex-row p-5 items-center pointer-events-none">
        {showSP && (
          <Link href={"/presentation"} className="text-primary pl-5 text-2xl font-bold w-1/3 text-center pointer-events-auto active:text-foreground">
            smart.phonics
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-1/4 ml-auto flex justify-center pointer-events-auto">
              <Button variant={"link"} className="rounded-full p-0 size-12 font-black border-1 border-primary bg-[#00000077] hover:bg-card">
                <Menu className="size-full" strokeWidth={3} />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-10 flex-col justify-center items-center border-1 border-primary">
            <DropdownMenuItem asChild>
              <Link href={"/presentation"}>
                <p className={cn("w-full text-primary text-center active:text-foreground", { "text-foreground": pathname.includes("presentation") })}>
                  {"PRESENTATION"}
                </p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/"}>
                <p className={cn("w-full text-primary text-center active:text-foreground")}>{"ACCUEIL"}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary" />
            <DropdownMenuLabel className="text-primary font-black text-center w-full">DEMO :</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/instru?n=0"}>
                  <p className={cn("w-full text-primary text-center active:text-foreground", { "text-foreground": pathname.includes("instru") })}>
                    {"INSTRUMENT #1"}
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/verton"}>
                  <p className={cn("w-full text-primary text-center active:text-foreground", { "text-foreground": pathname.includes("verton") })}>
                    {"CRAZY X"}
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/flashes"}>
                  <p className={cn("w-full text-primary text-center active:text-foreground", { "text-foreground": pathname.includes("flashes") })}>
                    {"TECHNO FLASHES"}
                  </p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/hack"}>
                  <p className={cn("w-full text-primary text-center active:text-foreground", { "text-foreground": pathname.includes("hack") })}>
                    {"HACK"}
                  </p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
