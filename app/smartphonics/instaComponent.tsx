import { cn } from "@/lib/utils";
import { useInstaUserStore } from "@/store/insta.user.store";
import Player from "@vimeo/player";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { InstaAvatarJpgMemo } from "../../components/userAvatar";
import { InstaComLike } from "./instaComLike";

export const InstaComponent = ({ index, goPrev, goNext }: { index: number; goPrev: () => void; goNext: () => void }) => {
  const vidMeta = useInstaUserStore((store) => store.vidMeta[index]);
  const playerRef = useRef<HTMLDivElement>(null);
  let player = {};
  const { width = 0 } = useWindowSize();

  useEffect(() => {
    const options = {
      id: 1081556604,
      loop: true,
      autoplay: false,
      muted: false,
      controls: true,
      width: Math.min(width, 672) - 20,
    };

    if (playerRef.current !== null) {
      player = new Player(playerRef.current, options);
      console.log(player);
    }
  }, []);

  return (
    <div className={cn("relative flex w-full h-full flex-col justify-center items-center")}>
      <div className="absolute size-full flex flex-row justify-between items-center z-40 pointer-events-none">
        <ChevronUp
          onClick={goPrev}
          strokeWidth={0.85}
          size={60}
          className="text-primary -rotate-90 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
        <ChevronUp
          onClick={goNext}
          strokeWidth={0.85}
          size={60}
          className="text-primary rotate-90 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
      </div>

      <div className={cn("size-full ring-2 ring-accent rounded-none flex flex-col justify-between bg-card")}>
        <div className="flex flex-row gap-3 items-center text-sm p-4 h-30">
          <div className="h-full">
            <InstaAvatarJpgMemo name={vidMeta.name.substring(0, 3)} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-primary font-black">{vidMeta.name}</p>
            {vidMeta.link !== "" && (
              <Link href={vidMeta.link} className="text-primary italic hover:underline" target="_blank">
                {"╰┈➤ " + vidMeta.linkname}
              </Link>
            )}
            <p className="text-xs">{`il y a ${vidMeta.name.length} jours`}</p>
          </div>
        </div>

        {index === 0 && (
          <div className="w-full overflow-y-auto">
            <div className="size-fit m-auto" ref={playerRef}></div>
            <p className="text-sm text-justify whitespace-pre-wrap p-4">{vidMeta.description}</p>
          </div>
        )}

        <div className={cn("p-4 w-full flex flex-row gap-3 items-center z-20 bg-card")}>
          <p className="text-xs italic text-primary">{vidMeta.hashtag}</p>
          <InstaComLike index={index} />
        </div>
      </div>
    </div>
  );
};

// function DialogDemo() {
//   const { width = 0 } = useWindowSize();
//   console.log(width);
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DialogTrigger>
//       <DialogContent className="w-dvw">
//         <DialogHeader>
//           <DialogTitle>smart.phonics - teaser #1</DialogTitle>
//           <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
//         </DialogHeader>
//         <div className="w-1/2 border-2 border-amber-300 flex justify-center items-center">
//           <Vimeo
//             video={1081556604}
//             autoplay={false}
//             background={false}
//             controls={true}
//             muted={false}
//             // transparent={false}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
