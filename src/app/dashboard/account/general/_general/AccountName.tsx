"use client";

import { useFormState } from "react-dom";
import { getCookie } from "cookies-next";

import { nameInfo } from "@assets/data/dashboard/account/general";
import { updateUserWithId } from "@lib/db-utils/user/profile";
import EditInfoCard from "../../_account/EditInfoCard";

const initialState = {
  message: "",
};

const AccountName: React.FC<{ name: string }> = ({ name }) => {
  const userId = getCookie("userId");
  const [state, formAction] = useFormState(
    updateUserWithId.bind(null, userId || ""),
    initialState
  );
  return (
    <EditInfoCard
      formAction={formAction}
      state={state}
      info={nameInfo}
      value={name}
      name={"name"}
      disabled={false}
    />
  );
};

export default AccountName;
