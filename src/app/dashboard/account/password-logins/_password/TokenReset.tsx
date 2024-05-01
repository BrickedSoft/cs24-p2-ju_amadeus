"use client";

import { getCookie } from "cookies-next";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import { regenerateTokenInfo } from "@assets/data/dashboard/account/password-logins";
import CustomInput from "@components/CustomInput";
import { Form } from "@components/ui/form";
import SubmitButton from "@components/ui/SubmitButton";
import { regenerateResetTokenWithId } from "@lib/db-utils/user/profile";

const initialState = {
  message: "",
};

const TokenReset: React.FC<{ resetToken: string }> = ({ resetToken }) => {
  const userId = getCookie("userId");

  const form = useForm();
  const {
    formState: { errors },
  } = form;

  const [, formAction] = useFormState(
    regenerateResetTokenWithId.bind(null, userId || ""),
    initialState,
  );

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
      >
        <p className="text-lg font-medium">{regenerateTokenInfo.title}</p>
        <p className="my-3 text-sm">{regenerateTokenInfo.description}</p>
        <CustomInput
          contentEditable={false}
          disabled
          placeholder={resetToken}
          errors={errors}
          form={form}
          item={regenerateTokenInfo}
        />
        <div className="w-full flex justify-between mt-4">
          <p className=" text-sm text-gray-600">
            {regenerateTokenInfo.instruction}
          </p>
          <SubmitButton
            label={regenerateTokenInfo.actionLabel}
            disabled={false}
          />
        </div>
      </form>
    </Form>
  );
};

export default TokenReset;
