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
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PlayButton } from "./playButton";

export function MyHeader() {
  const [showSP, setShowSP] = useState(true);
  const [showPlay, setShowPlay] = useState(true);
  return (
    <div className="absolute top-0 h-dvh w-dvw pointer-events-none">
      {showPlay && <PlayButton />}
      <div className="absolute top-0 w-full z-10 flex flex-row p-5 items-center pointer-events-none">
        {showSP && (
          <Link
            href={"/smartphonics"}
            className="text-primary pl-5 text-2xl font-bold w-1/3 text-center pointer-events-auto active:text-foreground"
            onClick={() => {
              setShowSP(false);
              setShowPlay(false);
            }}
          >
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
              <Link
                href={"/smartphonics"}
                onClick={() => {
                  setShowSP(false);
                  setShowPlay(false);
                }}
              >
                <p className="w-full text-primary text-center active:text-foreground">{"A PROPOS"}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={"/"}
                onClick={() => {
                  setShowSP(true);
                  setShowPlay(true);
                }}
              >
                <p className="w-full text-primary text-center active:text-foreground">{"ACCUEIL"}</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary" />
            <DropdownMenuLabel className="text-foreground text-center w-full">DEMO :</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={"/instru?n=0"}
                  onClick={() => {
                    setShowSP(false);
                    setShowPlay(true);
                  }}
                >
                  <p className="w-full text-primary text-center active:text-foreground">{"INTRUMENT #1"}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/verton"}
                  onClick={() => {
                    setShowSP(false);
                    setShowPlay(true);
                  }}
                >
                  <p className="w-full text-primary text-center active:text-foreground">{"CRAZY X"}</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/flashes"}
                  onClick={() => {
                    setShowSP(true);
                    setShowPlay(false);
                  }}
                >
                  <p className="w-full text-primary text-center active:text-foreground">{"TECHNO FLASHES"}</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
