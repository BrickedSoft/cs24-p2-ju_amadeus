"use client";

import { useEffect, useState } from "react";
import { LandFill, Vehicle } from "@prisma/client";
import { getCookie } from "cookies-next";
import { useFormState } from "react-dom";

import { newVehicleEntryInfo } from "@assets/data/dashboard/entry/vehicle-entries";
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
import { RoleType } from "@lib/constants/userContants";
import { addVehicleEntry } from "@lib/entry/vehicle-entries/addVehicleEntry";

const initialState = {
  message: "",
};

const NewVehicleEntry: React.FC<{}> = ({}) => {
  const [state, formAction] = useFormState(addVehicleEntry, initialState);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>();
  const [landfillList, setLandfillList] = useState<LandFill[]>();

  useEffect(() => {
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((newVehicleInfo) => {
        setVehicleList(newVehicleInfo.vehicles);
      });
  }, []);

  useEffect(() => {
    const role = getCookie("role");
    if (role && role == RoleType.LANDFILL_MANAGER)
      fetch("/api/landfill")
        .then((res) => res.json())
        .then((newVehicleInfo) => {
          setLandfillList(newVehicleInfo.landfills);
        });
  }, []);

  return vehicleList ? (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{newVehicleEntryInfo.title}</p>
      <p className="mt-2 mb-6 text-sm">{newVehicleEntryInfo.description}</p>

      {newVehicleEntryInfo.formValues.map((ele) => (
        <div key={ele.name}>
          <p className="mb-2 text-sm">{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            type={ele.type}
            required
            maxLength={32}
            className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10 mb-4"
          />
        </div>
      ))}
      <div className="my-6" />
      <Select key="vehicleId" name="vehicleId" required>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select Vehicle" />
        </SelectTrigger>
        <SelectContent>
          {vehicleList.map((vehicle) => (
            <SelectItem key={vehicle.id} value={vehicle.id}>
              {vehicle.number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="my-6" />
      {landfillList && (
        <Select key="landfillId" name="landfillId" required>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select Landfill site" />
          </SelectTrigger>
          <SelectContent>
            {landfillList.map((landfill) => (
              <SelectItem key={landfill.id} value={landfill.id}>
                {landfill.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <div className="w-full mt-4 flex justify-between">
        <div></div>
        <SubmitButton label={newVehicleEntryInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  ) : (
    <CardLoading />
  );
};

export default NewVehicleEntry;
