import AuthImage from "./AuthImage";

type AuthProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <main className="grid md:grid-cols-[minmax(200px,auto),1fr] gap-8 md:gap-16 items-center justify-between p-8 md:p-12 bg-white rounded-lg">
        <AuthImage height={"full"} width={"auto"} className="hidden md:block" />
        {children}
      </main>
    </section>
  );
};

export default AuthLayout;
