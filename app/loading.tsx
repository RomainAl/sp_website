import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <Spinner size="xxlarge" />
    </div>
  );
}
