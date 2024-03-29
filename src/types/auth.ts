import { Dispatch } from "react";

export type Auth = {
  email: string | undefined;
};

export type AuthContextType = {
  auth: Auth;
  setAuth: Dispatch<React.SetStateAction<Auth>>;
};
