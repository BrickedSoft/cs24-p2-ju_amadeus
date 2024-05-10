import React from 'react';
import { useStorageState } from './useStorageState';
import ecoSync from '@/api/ecoSync';
import { login } from '@/data/endpoints';
import { LoginType } from '@/data/types';

const AuthContext = React.createContext<{
  signIn: (data: LoginType) => Promise<boolean>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userId?: string | null;
  role?: string | null;
}>({
  signIn: async () => false,
  signOut: () => null,
  session: null,
  isLoading: false,
  userId: null,
  role: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[isLoadingUser, userId], setUserId] = useStorageState('userId');
  const [[isLoadingRole, role], setRole] = useStorageState('role');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data: LoginType) => {
          return await ecoSync
            .post(login, { ...data })
            .then(async function (res) {
              const cookies = res.headers['set-cookie']?.join('').split(';');
              const userId = cookies
                ?.find((cookie) => cookie.includes('userId'))
                ?.split('userId=')[1];
              const token = cookies
                ?.find((cookie) => cookie.includes('token'))
                ?.split('token=')[1];
              const role = cookies
                ?.find((cookie) => cookie.includes('role'))
                ?.split('role=')[1];
              if (token && userId && role) {
                setSession(token);
                setUserId(userId);
                setRole(role);
                console.log(token, userId, role);
                return true;
              }
              return false;
            })
            .catch(function (error) {
              return false;
            });
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        userId,
        role,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
