import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <Spinner size="xxlarge">LOADING</Spinner>
      <Button asChild variant={"outline"}>
        <Link href="/">BACK HOME</Link>
      </Button>
    </div>
  );
}
