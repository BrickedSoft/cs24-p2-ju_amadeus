"use client";

import { useEffect, useState } from "react";
import { LandFill } from "@prisma/client";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { assignLandfillInfo } from "@assets/data/dashboard/entry/users";
import { Button } from "@components/ui/button";
import CardLoading from "@components/ui/card-loading";
import { Input } from "@components/ui/input";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { RoleType } from "@lib/constants/userContants";

const ManageLandfill: React.FC<{ params: { userId: string } }> = ({
  params,
}) => {
  const [user, setUser] = useState<any>();
  const [landfillList, setLandfillList] = useState<LandFill[]>();
  const [isLoading, setIsLoading] = useState("none");

  const [landfillId, setLandfillId] = useState("");
  useEffect(() => {
    if (isLoading == "assign") {
      fetch(`/api/users/${params.userId}/assignLandfill/${landfillId}`).then(
        () => setIsLoading("none")
      );
    }

    if (isLoading == "remove") {
      fetch(`/api/users/${params.userId}/removeLandfill/${landfillId}`).then(
        () => setIsLoading("none")
      );
    }
  }, [isLoading, params.userId, setIsLoading, landfillId]);

  useEffect(() => {
    fetch("/api/landfill")
      .then((res) => res.json())
      .then((data) => {
        setLandfillList(data.landfills);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/users/${params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, [params.userId, isLoading]);

  const AssignButton: React.FC<{ currLandfill: string }> = ({
    currLandfill,
  }) => {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          setLandfillId(currLandfill);
          setIsLoading("assign");
        }}
        aria-disabled={isLoading != "none"}
        disabled={isLoading != "none"}
        className={
          "text-sm font-medium  text-gray-500 text-left rounded-[8px] p-2 px-3 bg-gray-200 hover:text-white hover:bg-black"
        }
      >
        <DoubleArrowRightIcon />
      </Button>
    );
  };

  const RemoveButton: React.FC<{ currLandfill: string }> = ({
    currLandfill,
  }) => {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          setLandfillId(currLandfill);
          setIsLoading("remove");
        }}
        aria-disabled={isLoading != "none"}
        disabled={isLoading != "none"}
        className={
          "text-sm font-medium  text-gray-500 text-left rounded-[8px] p-2 px-3 bg-gray-200 hover:text-white hover:bg-black"
        }
      >
        <DoubleArrowLeftIcon />
      </Button>
    );
  };

  return user && landfillList ? (
    user.role == RoleType.LANDFILL_MANAGER && (
      <div className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8">
        <p className="text-lg font-medium">{assignLandfillInfo.title}</p>
        <p className="mt-4 mb-6 text-sm">{assignLandfillInfo.description}</p>
        <div className="flex justify-between">
          <ScrollArea className="h-72 w-5/12 rounded-md border">
            <div className="p-4">
              <div className="flex justify-between text-gray-600 mb-4">
                <h4 className="text-sm font-medium leading-none">
                  Select Landfill site to
                </h4>

                <h4 className=" text-sm font-medium leading-none">Assign</h4>
              </div>
              <Separator className="my-2" />

              {landfillList
                .filter((landfill) => {
                  let ok = true;
                  for (const myLandfill of user.landfill)
                    if (myLandfill.id == landfill.id) {
                      ok = false;
                      break;
                    }
                  return ok;
                })
                .map((landfill: LandFill) => (
                  <div key={landfill.id}>
                    <p className="py-2 max-w-2/3 text-sm">{landfill.name}</p>

                    <div
                      key={landfill.id}
                      className="flex justify-between gap-x-2"
                    >
                      <Input
                        type="text"
                        defaultValue={landfill.id}
                        id="landfillId"
                        key="landfillId"
                        disabled
                      />
                      <AssignButton currLandfill={landfill.id} />
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
            </div>
          </ScrollArea>

          <ScrollArea className="h-72 w-5/12 rounded-md border">
            <div className="p-4">
              <div className="flex justify-between text-gray-600 mb-4">
                <h4 className="text-sm font-medium leading-none">Remove</h4>
                <h4 className="text-sm font-medium leading-none">
                  From this user management
                </h4>
              </div>
              <Separator className="my-2" />
              {user.landfill.map((landfill: LandFill) => (
                <div key={landfill.id}>
                  <p className="py-2 max-w-2/3 text-sm">{landfill.name}</p>

                  <div
                    key={landfill.id}
                    className="flex justify-between gap-x-2"
                  >
                    <RemoveButton currLandfill={landfill.id} />
                    <Input
                      type="text"
                      defaultValue={landfill.id}
                      id="landfillId"
                      key="landfillId"
                      disabled
                    />
                  </div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  ) : (
    <CardLoading />
  );
};

export default ManageLandfill;
