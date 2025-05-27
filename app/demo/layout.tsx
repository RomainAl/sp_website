"use client";

import { setStart, useDemoStore } from "@/store/demo.store";
import { useRouter } from "next/navigation";
import { useTimeout, useUnmount } from "usehooks-ts";

export default function Layout({ children }: { children: React.ReactNode }) {
  const start = useDemoStore((store) => store.start);
  const router = useRouter();

  useTimeout(
    () => {
      router.push("/demo/hack");
      router.prefetch("/demo/instru");
    },
    start ? 3000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/instru");

      router.prefetch("/demo/verton");
    },
    start ? 8000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/verton");
      router.prefetch("/demo/hack");
    },
    start ? 30000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/hack");
      router.prefetch("/demo/flashes");
    },
    start ? 60000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/flashes");
      router.prefetch("/demo/climaticsdisasters");
    },
    start ? 65000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/climaticsdisasters");
      router.prefetch("/demo/ending");
    },
    start ? 90000 : null
  );
  useTimeout(
    () => {
      setStart(false);
      router.push("/demo/ending");
    },
    start ? 110000 : null
  );

  useUnmount(() => setStart(false));

  return <>{children}</>;
}
