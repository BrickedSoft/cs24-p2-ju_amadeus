// 'use client';
// import { Input } from '@/components/ui/input';
// import { useFormState } from 'react-dom';
// import SubmitButton from '../_account/SubmitButton';
// import { updateUserWithId } from '@/lib/db-utils/user/profile';
// import { getCookie } from 'cookies-next';
// import { CardType } from '@/assets/data/dashboard/account/general';

// const initialState = {
//   message: '',
// };
// const InfoCard: React.FC<{
//   formAction: (payload: FormData) => void;
//   state: { message: string };
//   info: CardType;
// }> = ({ formAction, state, info }) => {
//   return (
//     <form
//       action={formAction}
//       className='bg-background p-6 rounded-md  border-[1.45px] border-gray-300 shadow-sm'>
//       <p className='text-lg font-semibold'>{info.title}</p>
//       <p className='my-3 text-sm'>
//        {info.description}
//       </p>
//       <Input
//         name='name'
//         id='name'
//         type='text'
//         placeholder={name}
//         maxLength={32}
//         className='max-w-[360px] border-gray-300 placeholder:text-gray-600'
//         required
//       />
//       <div className='w-full flex justify-between mt-6'>
//         <p className=' text-sm text-gray-600'>
//           {info.instruction}
//         </p>
//         <SubmitButton label={info.actionLabel} />
//       </div>
//     </form>
//   );
// };

// export default InfoCard;
