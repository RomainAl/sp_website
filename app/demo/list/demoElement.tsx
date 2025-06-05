import Image from "next/image";

export const DemoElement = ({ name, desc }: { name: string; desc: string[] }) => {
  console.log(name);
  return (
    <div className="w-full max-w-xl ring-1 ring-accent max-h-1/5">
      <Image src={`/demo_${name}.jpg`} width={1000} height={500} alt={`Picture of ${name} demo`} />
      <h1>{desc[0]}</h1>
      <p>{desc[1]}</p>
    </div>
  );
};
