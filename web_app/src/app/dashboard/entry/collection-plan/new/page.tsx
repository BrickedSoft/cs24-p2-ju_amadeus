'use client';

import { useFormState } from 'react-dom';

import {
  actionLabel,
  description,
  title,
  collectionPlanInfo,
} from '@/assets/data/dashboard/entry/collection-plan';

import CardLoading from '@/components/ui/card-loading';
import { Input } from '@/components/ui/input';
import { createCollectionPlan } from '@/lib/entry/collection-plan/createCollectionPlan';
import { User } from '@/types';
import SubmitButton from '@components/ui/SubmitButton';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const initialState = {
  message: '',
};

const Create: React.FC = () => {
  const [user, setUser] = useState<User>();

  const [state, formAction] = useFormState(createCollectionPlan, initialState);

  useEffect(() => {
    fetch(`/api/users/${getCookie('userId')}`)
      .then((res) => res.json())
      .then((updateUserInfo) => {
        setUser(updateUserInfo.user);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? (
    <form
      action={formAction}
      className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8'>
      <p className='text-lg font-medium'>{title}</p>
      <p className='my-3 text-sm mb-8'>{description}</p>

      {collectionPlanInfo.map((ele) => (
        <div key={ele.id}>
          <p className='mb-2 text-sm'>{ele.title}</p>
          <Input
            contentEditable={false}
            name={ele.id}
            id={ele.id}
            type={ele.type || 'text'}
            required
            maxLength={32}
            className={`max-w-[560px] ${ele.type === 'datetime-local' || ele.type === 'date' ? 'w-[240px]' : ''} border-gray-300 placeholder:text-gray-600 h-10 mb-4`}
          />
        </div>
      ))}

      <div key={'userId'}>
        <p className='mb-2 text-sm'>Manager ID</p>
        <Input
          contentEditable={false}
          name={'userId'}
          id={'userId'}
          required
          maxLength={32}
          readOnly
          value={user?.id}
          className={`max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10 mb-4`}
        />
      </div>

      <div className='w-full mt-4 flex justify-between'>
        <div></div>
        <SubmitButton
          label={actionLabel}
          disabled={false}
        />
      </div>
      <p className='text-sm text-green-600'>{state.message}</p>
    </form>
  ) : (
    <CardLoading />
  );
};

export default Create;
