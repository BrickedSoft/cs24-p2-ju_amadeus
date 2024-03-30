"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import ecoSync from "@/api/ecoSync";
import { confirmReset } from "@/assets/data/api/endpoints";
import {
  button,
  errors as defaultErrors,
  description,
  fields,
  title,
} from "@/assets/data/auth/reset-password/confirm";
import { routes } from "@/assets/data/routes";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { AuthContext } from "@context/AuthContext";

type FormInputsType = {
  [key: string]: string;
};

const ResetPasswordInitiate: React.FC = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(auth);

  const onSubmit: SubmitHandler<FormInputsType> = (data) => {
    ecoSync
      .post(confirmReset, { ...data, ...auth })
      .then(function () {
        router.replace(routes.dashboard);
      })
      .catch(function (error) {
        // fields.map((item) =>
        //   setError(item.id, {
        //     type: "manual",
        //     message: item.errors.wrong,
        //   })
        // );
      });
  };

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <h1 className="heading-secondary text-center">{title}</h1>
      <p className="max-w-[410px] text-small text-center">{description}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[280px] md:min-w-[300px] lg:min-w-[420px] flex flex-col justify-center gap-4 md:gap-8"
      >
        <div className="flex flex-col justify-center gap-3 md:gap-6">
          {fields.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <label htmlFor={item.id} className="text-medium font-semibold">
                {item.title}
              </label>
              <input
                id={item.id}
                type={item.type}
                placeholder={item.placeholder}
                {...register(`${item.id}`, {
                  required: item.errors.empty,
                })}
                className="px-4 py-2 md:py-3 text-medium border-2 border-gray-300 rounded-md"
              />

              <p className="text-small font-medium text-error-foreground">
                {errors[item.id] ? (
                  (errors[item.id]?.message as string) || defaultErrors.default
                ) : (
                  <span className="text-transparent">-</span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
          <Button type="submit" size={"lg"} className="self-stretch">
            {isSubmitting ? <Spinner /> : button.title}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordInitiate;
