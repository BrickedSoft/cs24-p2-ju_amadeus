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
  title: "Email",
  description:
    "Please enter the email address you want to use to log in with Vercel.",
  instruction: "We will email you to verify the change.",
  actionLabel: "Save",
};

const AccountEmail: React.FC<{ email: string }> = ({ email }) => {
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
      value={email}
      name="email"
      disabled={true}
    />
  );
};

export default AccountEmail;
