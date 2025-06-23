"use client";

import { useAudioAdminStore } from "@/store/audio.admin.store";
import { setStart, useDemoStore } from "@/store/demo.store";
import { useRouter } from "next/navigation";
import { useTimeout, useUnmount } from "usehooks-ts";

export default function Layout({ children }: { children: React.ReactNode }) {
  const start = useDemoStore((store) => store.start);
  const router = useRouter();
  const nikedal = useAudioAdminStore((store) => store.nikedal);

  useTimeout(
    () => {
      router.push("/demo/hack");
      router.prefetch("/demo/instru");
    },
    start && nikedal ? 500 : null
  );
  useTimeout(
    () => {
      router.push("/demo/instru");
      router.prefetch("/demo/nikedal3D");
    },
    start && nikedal ? 10000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/nikedal3D");
      router.prefetch("/demo/vertov");
    },
    start && nikedal ? 35000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/vertov");
      router.prefetch("/demo/hack");
    },
    start && nikedal ? 75000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/hack");
      router.prefetch("/demo/flashes");
    },
    start && nikedal ? 95000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/flashes");
      router.prefetch("/demo/climaticdisasters");
    },
    start && nikedal ? 100000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/climaticdisasters");
      router.prefetch("/demo/verton");
    },
    start && nikedal ? 130000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/verton");
      router.prefetch("/demo/instru?n=2");
    },
    start && nikedal ? 155000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/instru?n=2");
      router.prefetch("/demo/hack");
    },
    start && nikedal ? 185000 : null
  );
  useTimeout(
    () => {
      router.push("/demo/hack");
      router.prefetch("/demo/fin");
    },
    start && nikedal ? 215000 : null
  );
  useTimeout(
    () => {
      setStart(false);
      router.push("/demo/fin");
    },
    start && nikedal ? 220000 : null
  );

  useUnmount(() => setStart(false));

  return <>{children}</>;
}
