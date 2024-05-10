"use client";

import { Contractor, STS, Vehicle } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import {
  newWasteEntryInfo,
  wasteType,
} from "@assets/data/dashboard/entry/waste-entries";
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
import { addWasteEntry } from "@lib/entry/waste-entries/addWasteEntry";

const initialState = {
  message: "",
};

const NewVehicleEntry: React.FC<{}> = ({}) => {
  const [state, formAction] = useFormState(addWasteEntry, initialState);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>();
  const [stsList, setStsList] = useState<STS[]>();
  const [contractors, setContractors] = useState<Contractor[]>([]);

  useEffect(() => {
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((newVehicleInfo) => {
        setVehicleList(newVehicleInfo.vehicles);
      });

    fetch("/api/sts")
      .then((res) => res.json())
      .then((vehicleInfo) => {
        setStsList(vehicleInfo.sts);
      });
    fetch("/api/contractors")
      .then((res) => res.json())
      .then((contractors) => {
        setContractors(contractors.contractors.map((ele: Contractor) => ele));
      });
  }, []);

  return vehicleList && stsList && contractors ? (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{newWasteEntryInfo.title}</p>
      <p className="mt-2 mb-6 text-sm">{newWasteEntryInfo.description}</p>

      {newWasteEntryInfo.formValues.map((ele) => (
        <div key={ele.name}>
          <p className="mb-2 text-sm">{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            type={ele.type}
            required
            maxLength={32}
            className={`max-w-[560px] ${ele.type === "datetime-local" ? "w-[240px]" : ""} border-gray-300 placeholder:text-gray-600 h-10 mb-4`}
          />
        </div>
      ))}

      <div className="my-6" />
      <div className="flex gap-6 justify-between max-w-[560px]">
        <Select key="wasteType" name="wasteType" required>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select waste type" />
          </SelectTrigger>
          <SelectContent>
            {wasteType.map((vehicle) => (
              <SelectItem key={vehicle} value={vehicle}>
                {vehicle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {vehicleList && (
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
        )}
      </div>

      <div className="my-6" />
      <div className="flex gap-6 justify-between max-w-[560px]">
        {stsList && (
          <Select key="stsId" name="stsId" required>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select STS" />
            </SelectTrigger>
            <SelectContent>
              {stsList.map((landfill) => (
                <SelectItem key={landfill.id} value={landfill.id}>
                  {landfill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {contractors && (
          <Select key="contractorId" name="contractorId" required>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select Contractor" />
            </SelectTrigger>
            <SelectContent>
              {contractors.map((landfill) => (
                <SelectItem key={landfill.id} value={landfill.id}>
                  {landfill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="w-full mt-4 flex justify-between">
        <div></div>
        <SubmitButton label={newWasteEntryInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  ) : (
    <CardLoading />
  );
};

export default NewVehicleEntry;
