"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useFormState } from "react-dom";

import { newUserInfo } from "@assets/data/dashboard/entry/users";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import SubmitButton from "@components/ui/SubmitButton";
import { RoleType } from "@lib/constants/userContants";
import { createUser } from "@lib/entry/users/createUser";

const initialState = {
  message: "",
};

const NewUser: React.FC<{}> = ({}) => {
  const [roleList, setRoleList] = useState(["Unassigned"]);
  useEffect(() => {
    fetch("/api/users/roles")
      .then((res) => res.json())
      .then((newUserInfo) => {
        setRoleList(newUserInfo.roles.map((ele: { name: any }) => ele.name));
      });
  }, []);
  const userId = getCookie("userId");
  const [state, formAction] = useFormState(createUser, initialState);
  return (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{newUserInfo.title}</p>
      <p className="my-3 text-sm">{newUserInfo.description}</p>
      {newUserInfo.formValues.map((ele) => (
        <div key={ele.name}>
          <p className="mt-4 mb-1 text-sm">{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            type="text"
            required
            maxLength={32}
            className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10"
          />
        </div>
      ))}
      <p className="mt-4 mb-1 text-sm">Role</p>
      <Select key="role" name="role" defaultValue={RoleType.UNASSIGNED}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {roleList.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full mt-4 flex justify-between">
        <div></div>
        <SubmitButton label={newUserInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  );
};

export default NewUser;
