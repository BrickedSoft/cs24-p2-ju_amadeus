import { FC, ReactNode, createContext, useState } from "react";

import { Auth, AuthContextType } from "@allTypes";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<Auth>({} as Auth);

  return (
    <AuthContext.Provider
      value={{
        auth: data,
        setAuth: setData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
