"use client";

import AuthProvider from "@/context/AuthContext";

type ResetPasswordProps = {
  children: React.ReactNode;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default ResetPassword;
