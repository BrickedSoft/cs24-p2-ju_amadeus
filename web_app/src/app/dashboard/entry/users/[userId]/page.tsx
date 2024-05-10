"use client";

import { useEffect, useState } from "react";

import Loading from "@/components/Loading";
import { RoleType } from "@/constants/userContants";
import { User } from "@allTypes";
import UpdateUserInfo from "./UpdateUser";

const initialState = {
  message: "",
};

const UpdateUser: React.FC<{ params: { userId: string } }> = ({ params }) => {
  const [user, setUser] = useState<User>();
  const [roleList, setRoleList] = useState([RoleType.UNASSIGNED]);

  useEffect(() => {
    fetch("/api/users/roles")
      .then((res) => res.json())
      .then((updateUserInfo) => {
        setRoleList(updateUserInfo.roles.map((ele: { name: any }) => ele.name));
      });
  }, []);

  useEffect(() => {
    fetch(`/api/users/${params.userId}`)
      .then((res) => res.json())
      .then((updateUserInfo) => {
        setUser(updateUserInfo.user);
      });
  }, [params.userId]);

  return user && roleList?.length > 0 ? (
    <UpdateUserInfo id={params.userId} user={user} roleList={roleList} />
  ) : (
    <Loading />
  );
};

export default UpdateUser;
