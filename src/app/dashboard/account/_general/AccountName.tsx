'use client';
import { Input } from '@/components/ui/input';
import { useFormState } from 'react-dom';
import SubmitButton from '../_account/SubmitButton';
import { updateUserWithId } from '@/lib/db-utils/user/profile';
import { getCookie } from 'cookies-next';

const initialState = {
  message: '',
};
const AccountName: React.FC<{ name: string }> = ({ name }) => {
  const userId = getCookie('userId');
  const [state, formAction] = useFormState(
    updateUserWithId.bind(null, userId || ''),
    initialState
  );
  return (
    <form
      action={formAction}
      className='bg-background p-6 rounded-md  border-[1.45px] border-gray-300 shadow-sm'>
      <p className='text-lg font-semibold'>Display name</p>
      <p className='my-3 text-sm'>
        Please enter your full name, or a display name you are comfortable with.
      </p>
      <Input
        name='name'
        id='name'
        type='text'
        placeholder={name}
        maxLength={32}
        className='max-w-[360px] border-gray-300 placeholder:text-gray-600'
        required
      />
      <div className='w-full flex justify-between mt-6'>
        <p className=' text-sm text-gray-600'>
          Please use 32 characters at maximum.
        </p>
        <SubmitButton label={'Save'} />
      </div>
    </form>
  );
};

export default AccountName;
