"use client";

import ecoSync from "@/api/ecoSync";
import { fleetOptimize } from "@/assets/data/api/endpoints";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
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
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { TrippingVehicle } from "@/types/vehicleEnties";
import { zodResolver } from "@hookform/resolvers/zod";
import { LandFill, STS, Vehicle, VehicleRoute } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Report from "./Report";

const Optimizing: React.FC<{
  vehicleList: Vehicle[];
  landfillList: LandFill[];
  routeList: VehicleRoute[];
  stsList: STS[];
}> = ({ vehicleList, landfillList, routeList, stsList }) => {
  const [trippingVehicleList, setTrippingVehicleList] = useState<
    TrippingVehicle[]
  >([]);
  const FormSchema = z.object({
    currSTS: z.string().refine((value) => value, {
      message: "Select a STS",
    }),
    currLandfill: z.string().refine((value) => value, {
      message: "Select a Landfill",
    }),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
      currLandfill: "",
      currSTS: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    ecoSync
      .post(fleetOptimize, { ...data })
      .then(function (res) {
        if (res.data.trippingVehicle)
          setTrippingVehicleList(res.data.trippingVehicle);
      })
      .catch(function (error) {
        // TODO: show error
      });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-background px-6 py-8 rounded-md  border-[1.45px] border-gray-300 shadow-sm mb-4 relative"
        >
          <div className="flex justify-between ">
            <FormField
              control={form.control}
              name="currSTS"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel className="mr-4">From:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
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
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currLandfill"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel className="mr-4">To:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Landfill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {landfillList.map((landfill) => (
                          <SelectItem key={landfill.id} value={landfill.id}>
                            {landfill.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="my-8" />

          <div className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-8">
                    <FormLabel className="font-medium text-base">
                      Vehicle selection
                    </FormLabel>
                    <FormDescription>
                      Select the vehicles you want to deploy to the landfill.
                    </FormDescription>
                  </div>
                  {vehicleList.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.number}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end">
              <Button type="submit" disabled={isSubmitting} rounded={false}>
                {isSubmitting ? <Spinner /> : "Optimize"}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <Report trippingVehicles={trippingVehicleList} />
    </>
  );
};
export default Optimizing;
