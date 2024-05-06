"use client";

import { Dispatch, SetStateAction } from "react";

import { deleteUser } from "@lib/entry/users/deleteUser";
import {
  actionLabel,
  buttons,
  description,
  title,
} from "@assets/data/dashboard/entry/delete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { LandFill, STS, User, Vehicle } from "@prisma/client";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

type Props = {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  type: string;
  data: User | Vehicle | STS | LandFill;
};

const DeleteAlert: React.FC<Props> = ({ setOpen, data, type }) => {
  const [state, formAction] = useFormState(
    deleteUser.bind(null, data.id || ""),
    initialState
  );

  const dropdownMenuItems =
    "email" in data
      ? [
          { title: "Email", value: data.email },
          { title: "Name", value: data.name },
        ]
      : "number" in data
        ? [
            { title: "Number", value: data.number },
            { title: "Type", value: data.type },
          ]
        : "wardNumber" in data
          ? [
              { title: "Name", value: data.name },
              { title: "Ward No", value: data.wardNumber },
            ]
          : [{ title: "Name", value: data.name }];

  return (
    <AlertDialog>
      <AlertDialogTrigger className="relative w-full flex hover:bg-primary/20 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {actionLabel}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-2 md:gap-3">
              <div>
                {description.split(/(\$typeName\$)/g).map((item, index) => {
                  const isType = item === "$typeName$";

                  return (
                    <span
                      key={index}
                      className={isType ? "text-primary font-medium" : ""}
                    >
                      {isType ? type : item}
                    </span>
                  );
                })}
              </div>

              <ul className="flex flex-col gap-1 pl-5 list-inside list-disc">
                {dropdownMenuItems.map((item) => (
                  <li key={item.value}>
                    <span className="font-semibold">{item.title}: </span>
                    <span className="text-primary font-medium">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AlertDialogDescription>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between items-center gap-4">
          <p className="text-sm text-red-600">{state.message}</p>
          <AlertDialogCancel
            variant="outline"
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
          >
            {buttons.cancel}
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            <form action={formAction}>
              <button>{buttons.continue}</button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
