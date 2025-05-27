import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useInstaUserStore } from "@/store/insta.user.store";
import Player from "@vimeo/player";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { InstaAvatarJpgMemo } from "../../components/userAvatar";
import { InstaComLike } from "./instaComLike";

export const InstaComponent = ({ index, goPrev, goNext }: { index: number; goPrev: () => void; goNext: () => void }) => {
  const vidMeta = useInstaUserStore((store) => store.vidMeta[index]);
  const playerRef = useRef<HTMLDivElement>(null);
  const player = useRef<Player>(null);
  const refSpinner = useRef<HTMLDivElement>(null);
  const { width = 0 } = useWindowSize();
  useEffect(() => {
    const options = {
      id: 1081556604,
      loop: true,
      autoplay: false,
      muted: false,
      controls: true,
      width: Math.min(width, 768) - 20,
    };

    if (playerRef.current !== null) {
      player.current = new Player(playerRef.current, options);
      player.current.on("loaded", () => {
        if (refSpinner.current) refSpinner.current.style.display = "none";
        if (playerRef.current) playerRef.current.style.display = "block";
      });
    }
  }, [width]);

  return (
    <div className={cn("relative flex size-full flex-col justify-center items-center")}>
      <div className="absolute size-full flex flex-row justify-between items-center z-40 pointer-events-none">
        <ChevronUp
          onClick={goPrev}
          strokeWidth={0.85}
          size={60}
          className="text-primary -rotate-90 -ml-3 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
        <ChevronUp
          onClick={goNext}
          strokeWidth={0.85}
          size={60}
          className="text-primary rotate-90 -mr-3 hover:border hover:border-accent z-40 pointer-events-auto animate-bounce"
        />
      </div>

      <div className={cn("size-full ring-2 ring-accent rounded-none flex flex-col justify-between bg-card")}>
        <div className="flex flex-row gap-4 items-center text-sm px-4 py-2.5 h-30 ring-2 ring-accent ">
          <div className="size-20">
            <InstaAvatarJpgMemo name={vidMeta.name.substring(0, 3)} />
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-primary font-black text-sm xs:text-xl">{vidMeta.name}</p>
            {vidMeta.link !== "" && (
              <Link href={vidMeta.link} className="text-primary italic hover:underline" target="_blank">
                {"╰┈➤ " + vidMeta.linkname}
              </Link>
            )}
            {index == 0 && <p className="text-xs italic text-center">{"Contenu suggéré"}</p>}
            {index == 1 && <p className="text-xs italic text-center">{"Reels"}</p>}
            {index == 2 && <p className="text-xs italic text-center">{"Story pour toi"}</p>}
            <p className="text-xs italic text-center">{`il y a ${vidMeta.name.length} jours`}</p>
          </div>
        </div>

        <div className="w-full overflow-y-scroll">
          {index === 0 && (
            <div>
              <div ref={refSpinner} className="w-full aspect-video flex items-center justify-center">
                <Spinner size="xlarge" />
              </div>
              <div className="size-fit m-auto pt-1 hidden" ref={playerRef}></div>
            </div>
          )}

          <p className="text-sm text-justify whitespace-pre-wrap p-4">{vidMeta.description}</p>
          <Image src={vidMeta.im} width={1280} height={720} alt="Picture of the author" />
        </div>

        <div className={cn("px-4 py-1 w-full max-h-1/9 flex flex-row gap-3 items-center z-20 bg-card ring-2 ring-accent border-2 border-b-accent")}>
          <p className="text-xs italic text-primary text-ellipsis h-full whitespace-wrap overflow-hidden">{vidMeta.hashtag}</p>
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
