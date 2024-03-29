"use client";
import { useFormState } from "react-dom";
import { updateUserWithId } from "@/lib/db-utils/user/profile";
import { getCookie } from "cookies-next";
import { CardType } from "@/assets/data/dashboard/account/general";
import EditInfoCard from "../../_account/EditInfoCard";

const initialState = {
  message: "",
};

const formInfo: CardType = {
  title: "Display name",
  description:
    "Please enter your full name, or a display name you are comfortable with.",
  instruction: "Please use 32 characters at maximum.",
  actionLabel: "Save",
};

const AccountName: React.FC<{ name: string }> = ({ name }) => {
  const userId = getCookie("userId");
  const [state, formAction] = useFormState(
    updateUserWithId.bind(null, userId || ""),
    initialState,
  );
  return (
    <EditInfoCard
      formAction={formAction}
      state={state}
      info={formInfo}
      value={name}
      name={"name"}
      disabled={false}
    />
  );
};

export default AccountName;
