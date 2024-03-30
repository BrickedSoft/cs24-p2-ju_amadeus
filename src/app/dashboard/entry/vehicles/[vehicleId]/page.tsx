'use client';
import { useFormState } from 'react-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/ui/SubmitButton';
import { useEffect, useState } from 'react';
import CardLoading from '@/components/ui/card-loading';
import { updateVehicle } from './updateVehicle';
import { STS, Vehicle } from '@prisma/client';
const initialState = {
  message: '',
};
interface FormValues {
  name: string;
  label: string;
}
interface FormInfo {
  actionLabel: string;
  title: string;
  description: string;
  formValues: FormValues[];
}

const data: FormInfo = {
  actionLabel: 'Update',
  description: 'Update vehicle informations',
  title: 'Vehicle details',
  formValues: [
    {
      name: 'number',
      label: 'Number',
    },
    { name: 'type', label: 'Type' },
    { name: 'capacity', label: 'Capacity' },
    { name: 'fuelCostUnloaded', label: 'Fuel cost per kilometer - Unloaded' },
    { name: 'fuelCostLoaded', label: 'Fuel cost per kilometer - Fully loaded' },
  ],
};

const EditVehicle: React.FC<{ params: { vehicleId: string } }> = ({
  params,
}) => {
  const [vehicle, setVehicle] = useState<any>();
  const [stsList, setStsList] = useState<STS[]>();

  useEffect(() => {
    fetch('/api/sts')
      .then((res) => res.json())
      .then((data) => {
        setStsList(data.sts);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/vehicles/${params.vehicleId}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicle(data.vehicle);
      });
  }, [params.vehicleId]);

  const [state, formAction] = useFormState(
    updateVehicle.bind(null, params.vehicleId),
    initialState
  );
  return vehicle && stsList ? (
    <form
      action={formAction}
      className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8'>
      <p className='text-lg font-medium'>{data.title}</p>
      <p className='my-3 text-sm'>{data.description}</p>
      {data.formValues.map((ele: any) => (
        <div key={ele.name}>
          <p className='mt-4 mb-1 text-sm'>{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            placeholder={vehicle[ele.name]}
            type='text'
            maxLength={32}
            className='max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10'
          />
        </div>
      ))}
      <p className='mt-4 mb-1 text-sm'>Assigned under STS</p>
      <Select
        key='stsId'
        name='stsId'>
        <SelectTrigger className='w-[240px]'>
          <SelectValue
            placeholder={vehicle.STS ? vehicle.STS.name : 'Assign to STS'}
          />
        </SelectTrigger>
        <SelectContent>
          {stsList.map((sts) => (
            <SelectItem
              key={'stsId'}
              value={sts.id}>
              {sts.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

export default EditVehicle;
