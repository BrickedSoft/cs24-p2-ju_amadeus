'use client';
import { Input } from '@/components/ui/input';
import SubmitButton from '../../../../components/ui/SubmitButton';
import { CardType } from '@/assets/data/dashboard/account/general';

const EditInfoCard: React.FC<{
  formAction: (payload: FormData) => void;
  state: { message: string };
  info: CardType;
  value: any;
  disabled: boolean;
  name: string;
}> = ({ formAction, state, info, value, disabled, name }) => {
  return (
    <form
      action={formAction}
      className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8'>
      <p className='text-lg font-medium'>{info.title}</p>
      <p className='my-3 text-sm'>{info.description}</p>
      <Input
        name={name}
        id={name}
        type='text'
        placeholder={value}
        maxLength={32}
        className='max-w-[360px] border-gray-300 placeholder:text-gray-600'
        required
        disabled={disabled}
      />
      <div className='w-full flex justify-between mt-4'>
        <p className=' text-sm text-gray-600'>{info.instruction}</p>
        <SubmitButton
          label={info.actionLabel}
          disabled={disabled}
        />
      </div>
    </form>
  );
};

export default EditInfoCard;
