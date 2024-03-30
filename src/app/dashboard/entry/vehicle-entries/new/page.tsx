'use client';
import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/ui/SubmitButton';
import { addVehicleEntry } from './addVehicleEntry';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { LandFill, Vehicle } from '@prisma/client';
import CardLoading from '@/components/ui/card-loading';
import { getCookie } from 'cookies-next';
import { RoleType } from '@/lib/constants/userContants';

const initialState = {
  message: '',
};
interface FormValues {
  name: string;
  label: string;
  type: string;
}
interface FormInfo {
  actionLabel: string;
  title: string;
  description: string;
  formValues: FormValues[];
}

const data: FormInfo = {
  actionLabel: 'Add',
  description: 'Enter vehicle entry informations',
  title: 'Vehicle entry details',
  formValues: [
    { name: 'wasteVolume', label: 'Waste volume (tons)', type: 'number' },
    { name: 'arrivalTime', label: 'Arrival Time', type: 'datetime-local' },
    { name: 'departureTime', label: 'Departure Time', type: 'datetime-local' },
  ],
};

const NewVehicleEntry: React.FC<{}> = ({}) => {
  const [state, formAction] = useFormState(addVehicleEntry, initialState);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>();
  const [landfillList, setLandfillList] = useState<LandFill[]>();

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data) => {
        setVehicleList(data.vehicles);
      });
  }, []);

  useEffect(() => {
    const role = getCookie('role');
    if (role && role == RoleType.LANDFILL_MANAGER)
      fetch('/api/landfill')
        .then((res) => res.json())
        .then((data) => {
          setLandfillList(data.landfills);
        });
  }, []);

  return vehicleList ? (
    <form
      action={formAction}
      className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8'>
      <p className='text-lg font-medium'>{data.title}</p>
      <p className='mt-2 mb-6 text-sm'>{data.description}</p>

      {data.formValues.map((ele) => (
        <div key={ele.name}>
          <p className='mb-2 text-sm'>{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            type={ele.type}
            required
            maxLength={32}
            className='max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10 mb-4'
          />
        </div>
      ))}
      <div className='my-6' />
      <Select
        key='vehicleId'
        name='vehicleId'
        required>
        <SelectTrigger className='w-[240px]'>
          <SelectValue placeholder='Select Vehicle' />
        </SelectTrigger>
        <SelectContent>
          {vehicleList.map((vehicle) => (
            <SelectItem
              key={vehicle.id}
              value={vehicle.id}>
              {vehicle.number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className='my-6' />
      {landfillList && (
        <Select
          key='landfillId'
          name='landfillId'
          required>
          <SelectTrigger className='w-[240px]'>
            <SelectValue placeholder='Select Landfill site' />
          </SelectTrigger>
          <SelectContent>
            {landfillList.map((landfill) => (
              <SelectItem
                key={landfill.id}
                value={landfill.id}>
                {landfill.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <div className='w-full mt-4 flex justify-between'>
        <div></div>
        <SubmitButton
          label={data.actionLabel}
          disabled={false}
        />
      </div>
      <p className='text-sm text-green-600'>{state.message}</p>
    </form>
  ) : (
    <CardLoading />
  );
};

export default NewVehicleEntry;
