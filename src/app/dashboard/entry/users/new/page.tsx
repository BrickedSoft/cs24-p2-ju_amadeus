'use client';
import { useFormState } from 'react-dom';
import { getCookie } from 'cookies-next';
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
import { RoleType } from '@/lib/constants/userContants';
import { createUser } from './createUser';

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
  description: 'Enter user informations',
  title: 'User details',
  formValues: [
    {
      name: 'name',
      label: 'Name',
    },
    { name: 'email', label: 'Email' },
    { name: 'password', label: 'Password' },
  ],
};

const NewUser: React.FC<{}> = ({}) => {
  const [roleList, setRoleList] = useState(['Unassigned']);
  useEffect(() => {
    fetch('/api/users/roles')
      .then((res) => res.json())
      .then((data) => {
        setRoleList(data.roles.map((ele: { name: any }) => ele.name));
      });
  }, []);
  const userId = getCookie('userId');
  const [state, formAction] = useFormState(createUser, initialState);
  return (
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
            required
            maxLength={32}
            className='max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10'
          />
        </div>
      ))}
      <p className='mt-4 mb-1 text-sm'>Role</p>
      <Select
        key='role'
        name='role'
        defaultValue={RoleType.UNASSIGNED}>
        <SelectTrigger className='w-[240px]'>
          <SelectValue placeholder='Role' />
        </SelectTrigger>
        <SelectContent>
          {roleList.map((name) => (
            <SelectItem
              key={name}
              value={name}>
              {name}
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
  );
};

export default NewUser;
