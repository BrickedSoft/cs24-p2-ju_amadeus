"use client";

import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import AuthButton from "@/app/auth/AuthButton";
import { login, userDataEndpoint } from "@assets/data/api/endpoints";
import {
  button,
  errors as defaultErrors,
  description,
  fields,
  title,
} from "@assets/data/auth/change-password/initiate";
import { routes } from "@assets/data/routes";
import CustomInputRenderer from "@components/CustomInputRenderer";
import { Form } from "@components/ui/form";
import { AuthContext } from "@context/AuthContext";
import ecoSync from "@ecoSync";
import { getCookie, getCookies } from "cookies-next";

type FormInputsType = {
  [key: string]: string;
};

const ChangePasswordInitiate: React.FC = () => {
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);
  const [success, setSuccess] = useState<boolean | undefined>(false);

  const formSchema = z.object(
    _.reduce(
      fields.map((item) => ({
        [item.id]: z.string().min(1, {
          message: defaultErrors.empty,
        }),
      })),
      _.extend,
    ) as ZodRawShape,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const fetchUser = async () => {
    return await fetch(`${userDataEndpoint}/${getCookie("userId")}`, {
      cache: "no-store",
      // @ts-ignore
      headers: {
        cookie: getCookies(),
      },
    }).then(async (res) => {
      const data = await res.json();
      return data;
    });
  };

  const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
    setSuccess(undefined);
    const email = await fetchUser().then((res) => res.user.email);
    ecoSync
      .post(login, { ...data, email })
      .then(function () {
        setAuth((prev) => ({
          ...prev,
          email,
          password: data.password,
        }));
        setSuccess(true);
        setTimeout(() => {
          router.push(routes.confirmChange);
        }, 1000);
      })
      .catch(function (error) {
        const errorCode = error?.response?.status as string;
        setSuccess(false);
        fields.map((item) =>
          setError(item.id, {
            type: "manual",
          }),
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
      <p className="max-w-[410px] text-small text-center">{description}</p>
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

          <AuthButton
            isSubmitting={isSubmitting}
            success={success}
            title={button.title}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordInitiate;
