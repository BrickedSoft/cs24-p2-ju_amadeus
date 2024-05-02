"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import { login } from "@assets/data/api/endpoints";
import {
  button,
  errors as defaultErrors,
  fields,
  forgot,
  title,
} from "@assets/data/auth/login";
import { routes } from "@assets/data/routes";
import CustomInputRenderer from "@components/CustomInputRenderer";
import { Form } from "@components/ui/form";
import ecoSync from "@ecoSync";
import AuthButton from "../../AuthButton";

type FormInputsType = {
  [key: string]: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean | undefined>(false);

  const formSchema = z.object(
    _.reduce(
      fields.map((item) => ({
        [item.id]: z.string().min(1, {
          message: defaultErrors.empty,
        }),
      })),
      _.extend
    ) as ZodRawShape
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
    setSuccess(undefined);
    ecoSync
      .post(login, { ...data })
      .then(function () {
        setSuccess(true);

        setTimeout(() => {
          router.replace(routes.dashboard);
        }, 1000);
      })
      .catch(function (error) {
        const errorCode = error.response.status as string;
        setSuccess(false);
        fields.map((item) =>
          setError(item.id, {
            type: "manual",
          })
        );
        setError("default", {
          type: "manual",
          message:
            defaultErrors?.[errorCode as keyof typeof defaultErrors] ||
            defaultErrors.default,
        });
      });
  };

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <h1 className="heading-secondary text-center">{title}</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-[280px] md:min-w-[300px] lg:min-w-[420px] flex flex-col justify-center gap-4 md:gap-8"
        >
          <CustomInputRenderer
            form={form}
            errors={errors}
            fields={fields}
            variant="lg"
          />

          <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
            <AuthButton
              isSubmitting={isSubmitting}
              success={success}
              title={button.login.title}
            />
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
      </Form>
    </div>
  );
};

export default Login;
