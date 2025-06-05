import { setToast } from "@/store/shared.store";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

export const InstaComLike = () => {
  const [like, setLike] = useState<boolean>(false);
  const [com, setCom] = useState<boolean>(false);

  const setSendLike = () => {
    setLike(!like);
    if (like) {
      setToast({
        data: {
          content: "💔 Tu n'aimes plus Vertov",
        },
        type: "error",
      });
    } else {
      setToast({
        data: { content: "❤️ Tu aimes Vertov" },
        type: "success",
      });
    }
  };

  const setSendCom = () => {
    setCom(!com);
    setToast({
      type: "form",
      data: {
        title: "Alors ?",
        content: "Que penses-tu de Vertov ?",
      },
      autoClose: false,
    });
  };
  return (
    <div className="gap-3 flex flex-row ml-auto pointer-events-auto">
      <Heart
        size={30}
        onClick={(e) => {
          e.stopPropagation();
          setSendLike();
        }}
        fill={like ? "red" : "none"}
        strokeWidth={like ? 0 : 1}
      />
      <MessageCircle
        onClick={(e) => {
          e.stopPropagation();
          setSendCom();
        }}
        strokeWidth={1}
        size={30}
      />
    </div>
  );
};
