"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useFormState } from "react-dom";

import { Card } from "@allTypes";
import { Bulb, Close } from "@components/Icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";
import SubmitButton from "@components/ui/SubmitButton";
import { regenerateResetTokenWithId } from "@lib/db-utils/user/profile";

const TokenCard: React.FC<{
  info: Card;
}> = ({ info }) => {
  const userId = getCookie("userId");
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(
    regenerateResetTokenWithId.bind(null, userId || ""),
    { message: "" }
  );
  const token = info.actionLabel;

  useEffect(() => {
    if (!token) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-between items-start mb-1 md:mb-2">
              <h3 className="heading-tertiary">{info.title}</h3>
              {state.message && (
                <AlertDialogCancel className="h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <Close className="h-4 md:h-5 w-5 md:w-5 hover:stroke-destructive transition-all duration-300 cursor-pointer" />
                </AlertDialogCancel>
              )}
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <form action={formAction} className="flex flex-col gap-2 md:gap-5">
              <p>{info.description}</p>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold text-green-700">
                  {info.actionLabel}
                </p>
                {!state.message && (
                  <SubmitButton
                    label={info.button as string}
                    disabled={false}
                    variant="secondary"
                  />
                )}
              </div>
              <div className="flex items-center gap-1">
                <Bulb className="h-4 w-4 stroke-blue-600" />
                <p className="text-blue-600">{info.instruction}</p>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TokenCard;
