"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RoleType } from "@/constants/userContants";
import { User } from "@allTypes";
import {
  contractorManagerInfo,
  errors as defaultErrors,
  instruction,
  updateUserInfo,
} from "@assets/data/dashboard/entry/users";
import CardLoading from "@components/ui/card-loading";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import SubmitButton from "@components/ui/SubmitButton";
import { updateUser } from "@lib/entry/users/updateUser";

const initialState = {
  message: "",
};

type Props = {
  id: string;
  user: User;
  roleList: RoleType[];
};

const UpdateUser: React.FC<Props> = ({ id, user, roleList }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const formSchema = z.object(
    _.reduce(
      [...updateUserInfo.formValues, ...contractorManagerInfo].map((item) => ({
        [item.name]: z.string().min(1, {
          message: defaultErrors.empty,
        }),
      })),
      _.extend
    ) as ZodRawShape
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });
  const {
    control,
    formState: { errors },
  } = form;

  const [state, formAction] = useFormState(
    updateUser.bind(null, id),
    initialState
  );
  return user ? (
    <Form {...form}>
      <form
        action={formAction}
        className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
      >
        <p className="text-lg font-medium">{updateUserInfo.title}</p>
        <p className="my-3 text-sm">{instruction}</p>

        <FormField
          key={"role"}
          control={control}
          name={"role"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="!text-small">Select Role</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange;
                  setSelectedRole(e as RoleType);
                }}
                {...field}
                value={selectedRole}
              >
                <FormControl>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roleList.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage
                className={`${errors?.role?.type === "manual" ? "hidden" : ""}`}
              />
            </FormItem>
          )}
        />

        <p className="my-3 text-medium font-medium mt-8">
          {updateUserInfo.description}
        </p>

        <div className="flex flex-col gap-5 mt-3">
          {updateUserInfo.formValues.map((ele) => (
            <FormField
              key={ele.name}
              control={form.control}
              name={ele.name}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="!text-small">{ele.label}</FormLabel>
                  <FormControl>
                    <div className="relative w-auto !mt-0">
                      <Input
                        type={ele.type || "text"}
                        {...field}
                        value={field.value}
                        maxLength={32}
                        className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10"
                      />
                    </div>
                  </FormControl>

                  <FormMessage
                    className={`${errors?.[ele.name]?.type === "manual" ? "hidden" : ""}`}
                  />
                </FormItem>
              )}
            />
          ))}

          {selectedRole === RoleType.CONTRACTOR_MANAGER &&
            contractorManagerInfo.map((ele) => (
              <FormField
                key={ele.name}
                control={form.control}
                name={ele.name}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="!text-small">{ele.label}</FormLabel>
                    <FormControl>
                      <div className="relative w-auto !mt-0">
                        <Input
                          type={ele.type || "text"}
                          {...field}
                          value={field.value}
                          maxLength={32}
                          className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10"
                        />
                      </div>
                    </FormControl>

                    <FormMessage
                      className={`${errors?.[ele.name]?.type === "manual" ? "hidden" : ""}`}
                    />
                  </FormItem>
                )}
              />
            ))}
        </div>

        <div className="w-full mt-4 flex justify-between">
          <div></div>
          <SubmitButton label={updateUserInfo.actionLabel} disabled={false} />
        </div>
        <p className="text-sm text-green-600">{state.message}</p>
      </form>
    </Form>
  ) : (
    <CardLoading />
  );
};

export default UpdateUser;
