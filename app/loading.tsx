import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="size-full flex justify-center items-center">
      <Spinner size="xxlarge">LOADING</Spinner>
    </div>
  );
}
