import { DemoElement } from "./demoElement";

export default function Home() {
  return (
    <div className="flex h-dvh w-dvw flex-wrap gap-2 overflow-auto">
      <DemoElement name={"hack"} desc={["Hack", "blabla"]} />
      <DemoElement name={"nikedal"} desc={["Cryptographie", "blabla"]} />
      <DemoElement name={"instru?n=0"} desc={["Electronic knob", "blabla"]} />
      <DemoElement name={"vertov"} desc={["Vertov", "blabla"]} />
      <DemoElement name={"verton"} desc={["Crazy X", "blabla"]} />
      <DemoElement name={"instru?n=1"} desc={["Electronic knobs", "blabla"]} />
      <DemoElement name={"climaticdisasters"} desc={["Climatic Disasters", "blabla"]} />
    </div>
  );
}
