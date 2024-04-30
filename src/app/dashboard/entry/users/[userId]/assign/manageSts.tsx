"use client";

import { useEffect, useState } from "react";
import { STS } from "@prisma/client";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { assignStsInfo } from "@assets/data/dashboard/entry/users";
import { Button } from "@components/ui/button";
import CardLoading from "@components/ui/card-loading";
import { Input } from "@components/ui/input";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { RoleType } from "@lib/constants/userContants";

const ManageSts: React.FC<{ params: { userId: string } }> = ({ params }) => {
  const [user, setUser] = useState<any>();
  const [stsList, setStsList] = useState<STS[]>();
  const [isLoading, setIsLoading] = useState("none");

  const [stsId, setStsId] = useState("");
  useEffect(() => {
    if (isLoading == "assign") {
      fetch(`/api/users/${params.userId}/assignStsInfo/${stsId}`).then(() =>
        setIsLoading("none")
      );
    }

    if (isLoading == "remove") {
      fetch(`/api/users/${params.userId}/removeSts/${stsId}`).then(() =>
        setIsLoading("none")
      );
    }
  }, [isLoading, params.userId, setIsLoading, stsId]);

  useEffect(() => {
    fetch("/api/sts")
      .then((res) => res.json())
      .then((data) => {
        setStsList(data.sts);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/users/${params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
  }, [params.userId, isLoading]);

  const AssignButton: React.FC<{ currSts: string }> = ({ currSts }) => {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          setStsId(currSts);
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

  const RemoveButton: React.FC<{ currSts: string }> = ({ currSts }) => {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          setStsId(currSts);
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

  return user && stsList ? (
    user.role == RoleType.STS_MANAGER && (
      <div className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8">
        <p className="text-lg font-medium">{assignStsInfo.title}</p>
        <p className="mt-4 mb-6 text-sm">{assignStsInfo.description}</p>
        <div className="flex justify-between">
          <ScrollArea className="h-72 w-5/12 rounded-md border">
            <div className="p-4">
              <div className="flex justify-between text-gray-600 mb-4">
                <h4 className="text-sm font-medium leading-none">
                  Select STS to
                </h4>

                <h4 className=" text-sm font-medium leading-none">Assign</h4>
              </div>
              <Separator className="my-2" />

              {stsList
                .filter((sts) => {
                  let ok = true;
                  for (const mySts of user.STS)
                    if (mySts.id == sts.id) {
                      ok = false;
                      break;
                    }
                  return ok;
                })
                .map((sts: STS) => (
                  <div key={sts.id}>
                    <p className="py-2 max-w-2/3 text-sm">{sts.name}</p>

                    <div key={sts.id} className="flex justify-between gap-x-2">
                      <Input
                        type="text"
                        defaultValue={sts.id}
                        id="stsId"
                        key="stsId"
                        disabled
                      />
                      <AssignButton currSts={sts.id} />
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
              {user.STS.map((sts: STS) => (
                <div key={sts.id}>
                  <p className="py-2 max-w-2/3 text-sm">{sts.name}</p>

                  <div key={sts.id} className="flex justify-between gap-x-2">
                    <RemoveButton currSts={sts.id} />
                    <Input
                      type="text"
                      defaultValue={sts.id}
                      id="stsId"
                      key="stsId"
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

export default ManageSts;
