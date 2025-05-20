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

export function MyHeader() {
  const [showSP, setShowSP] = useState(true);
  return (
    <div className="absolute top-0 w-full z-10 flex flex-row justify-evenly left-1/2 -translate-x-1/2 p-5 items-center pointer-events-none">
      {showSP && (
        <Link
          href={"/smartphonics"}
          className="text-primary text-2xl font-bold w-1/3 text-center pointer-events-auto"
          onClick={() => {
            setShowSP(false);
          }}
        >
          smart.phonics
        </Link>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-1/4 ml-auto flex justify-center pointer-events-auto">
            <Button variant={"link"} className="rounded-full p-0 size-12 font-black border-1 border-primary bg-[#00000077]">
              <Menu className="size-full" strokeWidth={3} />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-10 flex-col justify-center items-center border-1 border-primary">
          <DropdownMenuItem>
            <Link
              href={"/smartphonics"}
              className="text-primary text-center w-full"
              onClick={() => {
                setShowSP(false);
              }}
            >
              A PROPOS
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={"/"}
              className="text-primary text-center w-full"
              onClick={() => {
                setShowSP(true);
              }}
            >
              ACCUEIL
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-primary" />
          <DropdownMenuLabel className="text-foreground text-center w-full">DEMO :</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href={"/instru?n=0"}
                className="text-primary text-center w-full"
                onClick={() => {
                  setShowSP(false);
                }}
              >
                INTRU #1
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
