import Logo from "@/components/Logo";
import AuthImage from "./AuthImage";
import Link from "next/link";

type AuthProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <main className="relative grid md:grid-cols-[minmax(200px,auto),1fr] gap-8 md:gap-16 items-center justify-between p-8 md:p-12 bg-white rounded-lg">
        <Link
          href="/"
          className="md:absolute mx-auto -mb-4 md:top-12 md:left-12"
        >
          <Logo className="w-12 h-12" />
        </Link>
        <AuthImage height={"full"} width={"auto"} className="hidden md:block" />
        {children}
      </main>
    </section>
  );
};

export default AuthLayout;
