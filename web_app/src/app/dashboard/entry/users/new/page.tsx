"use client";

import _ from "lodash";
import { useEffect, useState } from "react";
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
import {
  contractorManagerInfo,
  errors as defaultErrors,
  instruction,
  newUserInfo,
} from "@assets/data/dashboard/entry/users";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import SubmitButton from "@components/ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleType } from "@/constants/userContants";
import { createUser } from "@lib/entry/users/createUser";
import { Contractor } from "@prisma/client";
import Loading from "@/components/Loading";

const initialState = {
  message: "",
};

const NewUser: React.FC = () => {
  const [roleList, setRoleList] = useState([RoleType.UNASSIGNED]);
  const [selectedRole, setSelectedRole] = useState(RoleType.UNASSIGNED);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [selectedContractor, setSelectedContractor] = useState<Contractor>();

  useEffect(() => {
    fetch("/api/users/roles")
      .then((res) => res.json())
      .then((newUserInfo) => {
        setRoleList(newUserInfo.roles.map((ele: { name: any }) => ele.name));
      });
    fetch("/api/contractors")
      .then((res) => res.json())
      .then((contractors) => {
        setContractors(contractors.contractors.map((ele: Contractor) => ele));
        if (contractors.contractors.length > 0)
          setSelectedContractor(contractors.contractors[0].id);
      });
  }, []);

  const formSchema = z.object(
    _.reduce(
      [...newUserInfo.formValues, ...contractorManagerInfo].map((item) => ({
        [item.name]: z.string().min(1, {
          message: defaultErrors.empty,
        }),
      })),
      _.extend
    ) as ZodRawShape
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: RoleType.UNASSIGNED,
    },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const [state, formAction] = useFormState(createUser, initialState);

  return roleList ? (
    <Form {...form}>
      <form
        action={formAction}
        className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
      >
        <p className="text-lg font-medium">{newUserInfo.title}</p>
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
          {newUserInfo.description}
        </p>

        <div className="flex flex-col gap-5 mt-3">
          {newUserInfo.formValues.map((ele) => (
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
                        required
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

          {selectedRole === RoleType.CONTRACTOR_MANAGER && (
            <>
              {contractorManagerInfo.map((ele) => (
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
                            required
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

              {contractors && (
                <FormField
                  key={"contractorId"}
                  control={control}
                  name={"contractorId"}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="!text-small">
                        Select Contractor
                      </FormLabel>
                      <Select
                        onValueChange={(e) => {
                          field.onChange;
                          setSelectedContractor(
                            contractors.filter((ele) => ele.name === e)[0]
                          );
                        }}
                        {...field}
                        value={selectedContractor?.id}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Select Contractor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contractors.map((contractor) => (
                            <SelectItem
                              key={contractor.id}
                              value={contractor.id}
                            >
                              {contractor.id}
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
              )}
            </>
          )}
        </div>

        <div className="w-full mt-4 flex justify-between">
          <div></div>
          <SubmitButton label={newUserInfo.actionLabel} disabled={false} />
        </div>
        <p className="text-sm text-green-600">{state.message}</p>
      </form>
    </Form>
  ) : (
    <Loading />
  );
};

export default NewUser;
