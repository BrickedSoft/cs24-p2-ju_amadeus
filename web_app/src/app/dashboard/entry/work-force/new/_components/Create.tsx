"use client";

import { STS } from "@prisma/client";
import _ from "lodash";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import {
  actionLabel,
  contractorInfo,
  errors as defaultErrors,
  description,
  title,
} from "@/assets/data/dashboard/entry/contractor";
import CustomInputRenderer from "@/components/CustomInputRenderer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import SubmitButton from "@components/ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@lib/entry/users/createUser";
import {} from "@radix-ui/react-select";
import { useState } from "react";
import { createContractor } from "@/lib/entry/contractor/createContractor";

const initialState = {
  message: "",
};

type Props = {
  stsList: STS[];
};

const Create: React.FC<Props> = ({ stsList }) => {
  const [selectedSts, setSelectedSts] = useState<STS>();

  const formSchema = z.object(
    _.reduce(
      contractorInfo.map((item) => ({
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
    control,
    formState: { errors },
  } = form;

  const [state, formAction] = useFormState(createContractor, initialState);

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
          fields={contractorInfo}
          width={140}
          //@ts-ignore TODO: Fix this
          required
        />

        <FormField
          key={"stsId"}
          control={control}
          name={"stsId"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 mt-6">
              <FormLabel className="!text-small">Select STS</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select a STS" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stsList.map((sts) => (
                    <SelectItem key={sts.id} value={sts.id}>
                      {sts.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage
                className={`${errors?.stsId?.type === "manual" ? "hidden" : ""}`}
              />
            </FormItem>
          )}
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
