import { funEmoji } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { memo, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type useAvatarType = { name: string; radius?: number; color?: string; size?: number; scale?: number };

export const InstaAvatarJpgMemo = memo(function InstaAvatarJpg({ name }: { name: string }) {
  return (
    <Avatar className="border-1 border-primary shadow-xl shadow-primary size-full aspect-square">
      <AvatarFallback>{name.toUpperCase()}</AvatarFallback>
      <AvatarImage src={`/${name}.jpg`} />
    </Avatar>
  );
});

export const InstaAvatar = ({ name, radius = 50, size = 20, scale = 100 }: useAvatarType) => {
  const avatar = useMemo(() => {
    return createAvatar(funEmoji, {
      mouth: ["cute", "faceMask", "kissHeart", "lilSmile", "smileLol", "smileTeeth", "wideSmile", "tongueOut"],
      seed: name,
      size: size,
      radius: radius,
      scale: scale,
    }).toDataUri();
  }, [name, radius, scale, size]);

  return (
    <Avatar className="border-1 border-primary shadow-xl shadow-primary">
      <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      <AvatarImage src={avatar} />
    </Avatar>
  );
};
