"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { login } from "@assets/data/api/endpoints";
import {
  button,
  errors as defaultErrors,
  description,
  fields,
  title,
} from "@assets/data/auth/change-password";
import { routes } from "@assets/data/routes";
import { Visibility, VisibilityOff } from "@components/Icons";
import SubmitButton from "@components/ui/SubmitButton";
import { Input } from "@components/ui/input";
import ecoSync from "@ecoSync";

type FormInputsType = {
  [key: string]: string;
};

const PasswordChange: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FormInputsType> = async (data) =>
    ecoSync
      .post(login, { ...data })
      .then(function () {
        router.replace(routes.dashboard);
      })
      .catch(function (error) {
        fields.map((item) =>
          setError(item.id, {
            type: "manual",
            message: item.errors.wrong,
          })
        );
      });

  const InputField: React.FC<{ item: (typeof fields)[0] }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <div className="relative w-auto">
          <Input
            maxLength={32}
            id={item.id}
            type={isOpen ? "text" : item.type}
            placeholder={item.placeholder}
            {...register(`${item.id}`, {
              required: item.errors.empty,
            })}
            className="max-w-[360px] border-gray-300 placeholder:text-gray-600"
          />
          {item.type === "password" && (
            <div
              className="absolute top-2/4 right-8 -translate-y-2/4 cursor-pointer flex justify-center items-center mx-2 md:mx-4"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? (
                <Visibility className="w-6 h-6 text-gray-400" />
              ) : (
                <VisibilityOff className="w-6 h-6 text-gray-400" />
              )}
            </div>
          )}
        </div>

        <p className="text-xs font-medium text-error-foreground">
          {errors[item.id] ? (
            (errors[item.id]?.message as string) || defaultErrors.default
          ) : (
            <span className="text-transparent select-none">-</span>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-background flex flex-col gap-2 md:gap-4 px-6 py-4 rounded-md border-[1.45px] border-gray-300 shadow-sm mt-8">
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="my-3 text-sm">{description}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[280px] md:min-w-[300px] lg:min-w-[420px] flex flex-col justify-center gap-4 md:gap-8"
      >
        <div className="grid grid-cols-2 justify-between items-center gap-2 md:gap-4">
          {fields.map((item) => (
            <InputField key={item.id} item={item} />
          ))}
        </div>

        <div className="w-full flex justify-between">
          <p className=" text-sm text-gray-600"> </p>
          <SubmitButton label={button.title} disabled={false} />
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
