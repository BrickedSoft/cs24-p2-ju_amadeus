'use client';
import { Input } from '@/components/ui/input';
import { deleteUser } from './deleteUser';

import SubmitButton from '@/components/ui/SubmitButton';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';

const initialState = {
  message: '',
};

const DeleteUser: React.FC<{ params: { userId: string } }> = ({ params }) => {
  const [state, formAction] = useFormState(deleteUser.bind(null, params.userId || ""), initialState);

  return (
    <div>
      <form
        action={formAction}
        className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8'>
        <p className='text-lg font-medium'>Delete User</p>
        <p className='mt-4 mb-1 text-sm'>Delete user with id:</p>
        <Input
          contentEditable={false}
          name='id'
          id='id'
          value={params.userId}
          type='text'
          disabled
          maxLength={32}
          className='max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10'
        />

        <div className='w-full mt-4 flex justify-between'>
          <div></div>
          <SubmitButton
            label='Delete'
            disabled={false}
          />
        </div>
        <p className='text-sm text-green-600'>{state.message}</p>
      </form>
    </div>
  );
};

export default DeleteUser;
