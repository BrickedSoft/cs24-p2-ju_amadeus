import { cookies } from 'next/headers';
import AccountReset from './_password/AccountReset';
import { userDataEndpoint } from '@/assets/data/api/endpoints';

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

  return (
    <>
      <AccountReset resetToken={userData.user.resetToken} />
    </>
  );
};

export default Account;
