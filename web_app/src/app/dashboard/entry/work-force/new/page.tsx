"use client";

import _ from "lodash";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import {
  actionLabel,
  errors as defaultErrors,
  description,
  title,
  workforceInfo,
} from "@/assets/data/dashboard/entry/workforce";
import CustomInputRenderer from "@/components/CustomInputRenderer";
import { Form } from "@/components/ui/form";

import SubmitButton from "@components/ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { createWorkforce } from "@/lib/entry/workforce/createWorkforce";

const initialState = {
  message: "",
};

const Create: React.FC = () => {
  const [user, setUser] = useState<User>();

  const formSchema = z.object(
    _.reduce(
      workforceInfo.map((item) => ({
        [item.id]: z.string().min(1, {
          message: defaultErrors.empty,
        }),
      })),
      _.extend
    ) as ZodRawShape
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: getCookie("userId"),
      contractorId: "",
    },
  });
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  const [state, formAction] = useFormState(createWorkforce, initialState);

  useEffect(() => {
    fetch(`/api/users/${getCookie("userId")}`)
      .then((res) => res.json())
      .then((updateUserInfo) => {
        if (user && user?.contractor?.id)
          setValue("contractorId", user.contractor.id, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        setUser(updateUserInfo.user);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
      >
        <p className="text-lg font-medium">{title}</p>
        <p className="my-3 text-sm mb-8">{description}</p>

        <CustomInputRenderer
          form={form}
          errors={errors}
          fields={workforceInfo}
          width={140}
          //@ts-ignore TODO: Fix this
          required
        />

        <div className="w-full mt-4 flex justify-between">
          <div></div>
          <SubmitButton label={actionLabel} disabled={false} />
        </div>
        <p className="text-sm text-green-600">{state.message}</p>
      </form>
    </Form>
  );
};

export default Create;
