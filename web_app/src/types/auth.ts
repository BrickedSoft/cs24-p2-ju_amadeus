import { Dispatch } from "react";

export type Auth = {
  email: string | undefined;
  password: string | undefined;
  resetToken: string | undefined;
};

export type AuthContextType = {
  auth: Auth;
  setAuth: Dispatch<React.SetStateAction<Auth>>;
};
