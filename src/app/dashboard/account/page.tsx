import { userDataEndpoint } from '@/assets/data/api/endpoints';
import AccountName from './_general/AccountName';
import { cookies } from 'next/headers';

const Account: React.FC = async () => {
  const cookieStore = cookies();
  let userData = await fetch(
    `${userDataEndpoint}/${cookieStore.get('userId')?.value}`,
    {
      cache: 'no-store',
      headers: {
        cookie: cookieStore,
      },
    }
  ).then(async (res) => {
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  });

  return <AccountName name={userData.user.name} />;
};

export default Account;
