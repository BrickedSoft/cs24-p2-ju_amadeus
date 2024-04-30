"use client";

import { getCookie } from "cookies-next";
import { useFormState } from "react-dom";

import { regenerateTokenInfo } from "@assets/data/dashboard/account/password-logins";
import SubmitButton from "@components/ui/SubmitButton";
import { Input } from "@components/ui/input";
import { regenerateResetTokenWithId } from "@lib/db-utils/user/profile";

const initialState = {
  message: "",
};


const TokenReset: React.FC<{ resetToken: string }> = ({ resetToken }) => {
  const userId = getCookie("userId");
  const [, formAction] = useFormState(
    regenerateResetTokenWithId.bind(null, userId || ""),
    initialState
  );
  return (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{regenerateTokenInfo.title}</p>
      <p className="my-3 text-sm">{regenerateTokenInfo.description}</p>
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
        <p className=" text-sm text-gray-600">{regenerateTokenInfo.instruction}</p>
        <SubmitButton label={regenerateTokenInfo.actionLabel} disabled={false} />
      </div>
    </form>
  );
};

export default TokenReset;
