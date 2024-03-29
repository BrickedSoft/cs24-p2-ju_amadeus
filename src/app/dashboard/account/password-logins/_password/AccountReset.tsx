"use client";
import { useFormState } from "react-dom";
import { getCookie } from "cookies-next";
import { CardType } from "@/assets/data/dashboard/account/general";
import SubmitButton from "../../../../../components/ui/SubmitButton";
import { Input } from "@/components/ui/input";
import { regenerateResetTokenWithId } from "@/lib/db-utils/user/profile";

const initialState = {
  message: "",
};

const formInfo: CardType = {
  actionLabel: "Regenerate",
  title: "Reset token",
  description: "This is your token to recover your account",
  instruction: "Make sure to write down this code",
};

const AccountReset: React.FC<{ resetToken: string }> = ({ resetToken }) => {
  const userId = getCookie("userId");
  const [state, formAction] = useFormState(
    regenerateResetTokenWithId.bind(null, userId || ""),
    initialState,
  );
  return (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{formInfo.title}</p>
      <p className="my-3 text-sm">{formInfo.description}</p>
      <Input
        contentEditable={false}
        name="resetToken"
        id="resetToken"
        type="text"
        disabled
        value={resetToken}
        maxLength={32}
        className="max-w-[360px] border-gray-300 placeholder:text-gray-600"
      />
      <div className="w-full flex justify-between mt-4">
        <p className=" text-sm text-gray-600">{formInfo.instruction}</p>
        <SubmitButton label={formInfo.actionLabel} disabled={false} />
      </div>
    </form>
  );
};

export default AccountReset;
