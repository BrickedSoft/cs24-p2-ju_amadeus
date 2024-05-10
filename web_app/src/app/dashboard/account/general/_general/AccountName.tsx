"use client";

import { useFormState } from "react-dom";
import { getCookie } from "cookies-next";

import { nameInfo } from "@assets/data/dashboard/account/general";
import { updateUserWithId } from "@lib/db-utils/user/profile";
import InputCard from "../../_components/InputCard";

const initialState = {
  message: "",
};

const AccountName: React.FC<{ name: string }> = ({ name }) => {
  const userId = getCookie("userId");
  const [state, formAction] = useFormState(
    updateUserWithId.bind(null, userId || ""),
    initialState,
  );
  return (
    <InputCard
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
