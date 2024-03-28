import { redirect, RedirectType } from 'next/navigation';

const Account: React.FC = () => {
  redirect('/dashboard/account/general', RedirectType.replace);
};

export default Account;
