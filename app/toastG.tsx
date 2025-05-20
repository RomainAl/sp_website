"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { setToast, useToastParamsStore, useToastStore } from "@/store/shared.store";
import { useEffect, useRef } from "react";
import { Id, Slide, toast, ToastContainer, ToastContentProps } from "react-toastify";

type CustomNotificationProps = ToastContentProps<{
  title?: string;
  content: string;
  isAdmin?: boolean;
}>;

export default function ToastG() {
  const toastG = useToastStore();
  const dismissToasts = useToastParamsStore((store) => store.dismissToasts);
  const stopToasts = useToastParamsStore((store) => store.stopToasts);
  const toastID = useRef<Id>(null);
  // console.log(toastG as unknown as CustomNotificationProps);
  // console.log(dismissToasts);
  // console.log(stopToasts);

  useEffect(() => {
    if (!stopToasts) {
      if (toastG.type === "loading") {
        toastID.current = toast.loading("Loading...", toastG as unknown as CustomNotificationProps);
      } else if (toastG.type === "update" && toastID.current) {
        toast.update(toastID.current, toastG as unknown as CustomNotificationProps);
      } else if (toastG.type === "form") {
        toast(Form, toastG as unknown as CustomNotificationProps);
      } else if (toastG.data) {
        toast(CustomNotification, toastG as unknown as CustomNotificationProps);
      }
    }
  }, [toastG, stopToasts]);

  useEffect(() => {
    if (dismissToasts) toast.dismiss();
  }, [dismissToasts]);

  // useTimeout(() => {
  //   setToast({ type: "update", render: "Chargement...[2]", progress: 0.9 });
  //   console.log("top");
  // }, 10000);

  // useTimeout(() => {
  //   setToast({ type: "update", render: "Chargement...[2]", progress: 1 });
  //   console.log("top");
  // }, 14000);

  return (
    <>
      {/* <Button
        onClick={() => {
          setToast({ type: "success", data: { title: "Oh zut !", content: "Une erreur s'est produite !" } });
        }}
      >
        TOAST
      </Button> */}

      <ToastContainer
        draggable
        autoClose={5000}
        transition={Slide}
        position="top-center"
        theme="dark"
        className="pt-4 lg:pt-0 w-full gap-2 lg:gap-1 px-8 lg:px-0"
      />
    </>
  );
}

function Form({ closeToast, data }: CustomNotificationProps) {
  function com(formData: FormData) {
    const com = formData.get("com") as string;
    if (com) {
      setToast({ type: "", data: { title: "💬 Message envoyé !", content: `╰┈➤ "${com}"` } });
    }
    closeToast();
  }
  return (
    <div className="flex flex-col w-full h-2/3 gap-1 text-sm text-center">
      {data.title && <h3 className="text-primary font-semibold">{data.title}</h3>}
      <p>{data.content}</p>
      <form action={com} className="flex flex-col gap-2">
        <Textarea name="com" className="text-sm border border-primary p-2" placeholder="Type your message here." />
        <Button type="submit" className="text-sm w-full">
          Envoyer
        </Button>
      </form>
    </div>
  );
}

function CustomNotification({ data, toastProps }: CustomNotificationProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      {data.title && (
        <h3 className={cn("text-sm font-semibold", "text-white", { "text-primary": toastProps.type === "default", "text-3xl": data.isAdmin })}>
          {data.title}
        </h3>
      )}
      <div className="flex items-center justify-between">
        {data.title ? (
          <p className={cn("text-sm italic", { "text-3xl": data.isAdmin })}>{data.content}</p>
        ) : (
          <p className={cn("text-sm", { "text-3xl": data.isAdmin })}>{data.content}</p>
        )}
      </div>
    </div>
  );
}
