"use client";

import { useEffect, useState } from "react";
import { STS } from "@prisma/client";
import { useFormState } from "react-dom";

import { vehicleInfo } from "@assets/data/dashboard/entry/vehicles";
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
import { updateVehicle } from "./UpdateVehicle";

const initialState = {
  message: "",
};

const EditVehicle: React.FC<{ params: { vehicleId: string } }> = ({
  params,
}) => {
  const [vehicle, setVehicle] = useState<any>();
  const [stsList, setStsList] = useState<STS[]>();

  useEffect(() => {
    fetch("/api/sts")
      .then((res) => res.json())
      .then((vehicleInfo) => {
        setStsList(vehicleInfo.sts);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/vehicles/${params.vehicleId}`)
      .then((res) => res.json())
      .then((vehicleInfo) => {
        setVehicle(vehicleInfo.vehicle);
      });
  }, [params.vehicleId]);

  const [state, formAction] = useFormState(
    updateVehicle.bind(null, params.vehicleId),
    initialState,
  );
  return vehicle && stsList ? (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{vehicleInfo.title}</p>
      <p className="my-3 text-sm">{vehicleInfo.description}</p>
      {vehicleInfo.formValues.map((ele: any) => (
        <div key={ele.name}>
          <p className="mt-4 mb-1 text-sm">{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            placeholder={vehicle[ele.name]}
            type="text"
            maxLength={32}
            className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10"
          />
        </div>
      ))}
      <p className="mt-4 mb-1 text-sm">Assigned under STS</p>
      <Select key="stsId" name="stsId">
        <SelectTrigger className="w-[240px]">
          <SelectValue
            placeholder={vehicle.STS ? vehicle.STS.name : "Assign to STS"}
          />
        </SelectTrigger>
        <SelectContent>
          {stsList.map((sts) => (
            <SelectItem key={"stsId"} value={sts.id}>
              {sts.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full mt-4 flex justify-between">
        <div></div>
        <SubmitButton label={vehicleInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  ) : (
    <CardLoading />
  );
};

export default EditVehicle;
