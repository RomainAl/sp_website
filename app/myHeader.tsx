import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function MyHeader() {
  return (
    <div className="absolute top-0 w-full max-w-lg z-10 flex flex-row justify-evenly left-1/2 -translate-x-1/2 p-5 items-center">
      <Button variant={"link"}>SMART.PHONICS</Button>
      <Button variant={"link"}>NOUS</Button>
      <Button variant={"link"} className="aspect-square rounded-full size-fit">
        <ChevronRight className="size-full" size={24} />
      </Button>
    </div>
  );
}
