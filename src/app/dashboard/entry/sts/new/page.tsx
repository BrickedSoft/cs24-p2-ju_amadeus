'use client';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ecoSync from '@/api/ecoSync';
import { stsDataEndpoint } from '@/assets/data/api/endpoints';
import { useRouter } from 'next/navigation';
import { routes } from '@/assets/data/routes';
import { Button } from '@/components/ui/button';
import { UpdateIcon } from '@radix-ui/react-icons';
import {
  description,
  title,
  fields,
  submitButton,
  errors as defaultErrors,
} from '@assets/data/dashboard/entry/new-sts';

const DraggableMarker = dynamic(
  () => import('@/components/map/DraggableMarker'),
  {
    loading: () => <p>loading...</p>,
    ssr: false,
  }
);

const center = {
  lat: 23.8,
  lng: 90.41,
};

const NewSts: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [position, setPosition] = useState(center);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) =>
    ecoSync
      .post(stsDataEndpoint, {
        ...data,
        longitude: position.lng,
        latitude: position.lat,
      })
      .then(function () {
        router.replace(routes.sts);
      })
      .catch(function (error) {
        fields.map((item) =>
          setError(item.id, {
            type: 'manual',
            message: item.errors.wrong,
          })
        );
      });

  return (
    <form
      className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8'
      onSubmit={handleSubmit(onSubmit)}>
      <p className='text-lg font-medium'>{title}</p>
      <p className='my-3 text-sm'>{description}</p>
      {fields.map((item) => (
        <div key={item.id}>
          <p className='mt-4 mb-1 text-sm'>{item.title}</p>
          <Input
            id={item.id}
            placeholder={item.placeholder}
            {...register(`${item.id}`, {
              required: item.errors.empty,
            })}
            type='text'
            required
            maxLength={32}
            className='max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10'
          />
          <p className='text-small font-medium text-error-foreground select-none'>
            {errors[item.id] ? (
              (errors[item.id]?.message as string) || defaultErrors.default
            ) : (
              <span className='text-transparent'>-</span>
            )}
          </p>
        </div>
      ))}

      <p className='mt-6 mb-1 text-sm'>Pick your STS location</p>
      <DraggableMarker
        position={position}
        setPosition={setPosition}
      />

      <div className='w-full mt-6 flex justify-between'>
        <Button
          type='submit'
          className='text-sm font-medium  text-gray-500 text-left rounded-[8px] p-2 px-3 bg-gray-200 hover:text-white hover:bg-black'>
          {isSubmitting ? (
            <UpdateIcon className='mx-4 h-4 w-4 animate-spin' />
          ) : (
            submitButton
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewSts;
