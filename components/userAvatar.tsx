import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const InstaAvatarJpgMemo = memo(function InstaAvatarJpg({ name }: { name: string }) {
  return (
    <Avatar className="border-1 border-primary shadow-xl shadow-primary size-full aspect-square">
      <AvatarFallback>{name.toUpperCase()}</AvatarFallback>
      <AvatarImage src={`/${name}.jpg`} />
    </Avatar>
  );
});
