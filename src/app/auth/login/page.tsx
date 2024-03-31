"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { login } from "@/assets/data/api/endpoints";
import { routes } from "@/assets/data/routes";
import { Visibility, VisibilityOff } from "@/components/Icons";
import Spinner from "@/components/ui/spinner";
import {
  button,
  errors as defaultErrors,
  fields,
  forgot,
  title,
} from "@assets/data/auth/login";
import { Button } from "@components/ui/button";
import ecoSync from "@ecoSync";

type FormInputsType = {
  [key: string]: string;
};

const Login: React.FC = () => {
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
        <label htmlFor={item.id} className="text-medium font-semibold">
          {item.title}
        </label>
        <div className="relative w-auto">
          <input
            id={item.id}
            type={isOpen ? 'text' : item.type}
            placeholder={item.placeholder}
            {...register(`${item.id}`, {
              required: item.errors.empty,
            })}
            className={`w-full m-0.5 ${item.type === "password" ? "pl-4 pr-16" : "px-4"} py-2 md:py-3 text-medium border-2 border-gray-300 rounded-md`}
          />
          {item.type === "password" && (
            <div
              className="absolute top-2/4 right-0 -translate-y-2/4 cursor-pointer flex justify-center items-center mx-2 md:mx-4"
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

        <p className="text-small font-medium text-error-foreground select-none">
          {errors[item.id] ? (
            (errors[item.id]?.message as string) || defaultErrors.default
          ) : (
            <span className="text-transparent">-</span>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <h1 className="heading-secondary text-center">{title}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[280px] md:min-w-[300px] lg:min-w-[420px] flex flex-col justify-center gap-4 md:gap-8"
      >
        <div className="flex flex-col justify-center gap-3 md:gap-6">
          {fields.map((item) => (
            <InputField key={item.id} item={item} />
          ))}
        </div>

        <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
          <Button type="submit" size={"lg"} className="self-stretch">
            {isSubmitting ? <Spinner /> : button.login.title}
          </Button>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <p className="text-small font-medium">{forgot}</p>
            <Link
              href={button.reset.href}
              className="anchor no-underline font-bold"
            >
              {button.reset.title}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
