"use client";

import { useState } from "react";

import { CardType } from "@/assets/data/dashboard/account/general";
import { Bulb, Close } from "@/components/Icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const TokenCard: React.FC<{
  info: CardType;
}> = ({ info }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <h3 className="heading-tertiary">{info.title}</h3>
              <AlertDialogCancel className="focus-visible:ring-0 focus-visible:ring-offset-0">
                <Close className="h-4 md:h-5 w-5 md:w-5 hover:stroke-destructive transition-all duration-300 cursor-pointer" />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <p>{info.description}</p>
              <p className="my-3 text-lg font-semibold text-green-700">
                {info.actionLabel}
              </p>
              <div className="flex items-center gap-1">
                <Bulb className="h-4 w-4 stroke-blue-600" />
                <p className="text-blue-600">{info.instruction}</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TokenCard;
