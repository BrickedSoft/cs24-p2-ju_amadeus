'use client';
import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/ui/SubmitButton';
import { useEffect, useState } from 'react';
import { updateLandfill } from './updateLandfill';
import CardLoading from '@/components/ui/card-loading';
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
  actionLabel: 'Submit',
  description: 'Enter landfil site informations',
  title: 'Landfill site details',
  formValues: [
    {
      name: 'name',
      label: 'Name',
    },
    { name: 'longitude', label: 'Longitude' },
    { name: 'latitude', label: 'Latitude' },
  ],
};

const EditLandfill: React.FC<{ params: { landfillId: string } }> = ({
  params,
}) => {
  const [landfill, setLandfill] = useState();

  useEffect(() => {
    fetch(`/api/landfill/${params.landfillId}`)
      .then((res) => res.json())
      .then((data) => {
        setLandfill(data.landfill);
      });
  }, [params.landfillId]);

  const [state, formAction] = useFormState(
    updateLandfill.bind(null, params.landfillId),
    initialState
  );
  return landfill ? (
    <form
      action={formAction}
      className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8'>
      <p className='text-lg font-medium'>{data.title}</p>
      <p className='my-3 text-sm'>{data.description}</p>
      {data.formValues.map((ele) => (
        <div key={ele.name}>
          <p className='mt-4 mb-1 text-sm'>{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            type='text'
            placeholder={landfill[ele.name]}
            maxLength={32}
            className='max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10'
          />
        </div>
      ))}

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

export default EditLandfill;
