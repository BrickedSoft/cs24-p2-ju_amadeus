"use client";

import AuthProvider from "@context/AuthContext";

type ResetPasswordProps = {
  children: React.ReactNode;
};

const ChangePasswordLayout: React.FC<ResetPasswordProps> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default ChangePasswordLayout;
