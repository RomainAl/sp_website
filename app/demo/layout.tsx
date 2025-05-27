"use client";

import { setStart, useDemoStore } from "@/store/demo.store";
import { useRouter } from "next/navigation";
import { useTimeout, useUnmount } from "usehooks-ts";

export default function Layout({ children }: { children: React.ReactNode }) {
  const start = useDemoStore((store) => store.start);
  const router = useRouter();

  useTimeout(() => router.push("/demo/hack"), start ? 1000 : null);
  useTimeout(() => router.push("/demo/verton"), start ? 5000 : null);
  useTimeout(() => router.push("/demo/instru"), start ? 20000 : null);
  useTimeout(() => router.push("/demo/hack"), start ? 40000 : null);
  useTimeout(() => router.push("/demo/flashes"), start ? 45000 : null);
  useTimeout(() => router.push("/demo/climaticsdisasters"), start ? 60000 : null);
  useTimeout(
    () => {
      setStart(false);
      router.push("/demo");
    },
    start ? 70000 : null
  );

  useUnmount(() => setStart(false));

  return <>{children}</>;
}
