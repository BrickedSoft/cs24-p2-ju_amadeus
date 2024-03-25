import { name } from "@assets/data/auth/login";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="h-20 flex justify-between items-center px-12">
      <Logo className="h-12 w-12" />
      <Button size="lg">{name}</Button>
    </header>
  );
};

export default Header;
