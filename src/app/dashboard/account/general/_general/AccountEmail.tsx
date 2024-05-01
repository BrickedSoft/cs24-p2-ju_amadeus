"use client";

import { useFormState } from "react-dom";
import { getCookie } from "cookies-next";

import { emailInfo } from "@assets/data/dashboard/account/general";
import { updateUserWithId } from "@lib/db-utils/user/profile";
import InputCard from "../../_components/InputCard";

const initialState = {
  message: "",
};

const AccountEmail: React.FC<{ email: string }> = ({ email }) => {
  const userId = getCookie("userId");
  const [state, formAction] = useFormState(
    updateUserWithId.bind(null, userId || ""),
    initialState,
  );
  return (
    <InputCard
      formAction={formAction}
      state={state}
      info={emailInfo}
      value={email}
      name="email"
      disabled={true}
    />
  );
};

export default AccountEmail;
