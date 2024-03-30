import {
  roleFromString,
  sideNavEntry,
} from '@/assets/data/dashboard/dashboard';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

const Entry: React.FC = () => {
  redirect(
    sideNavEntry(roleFromString(cookies().get('role')?.value))[0].href,
    RedirectType.replace
  );
};

export default Entry;
