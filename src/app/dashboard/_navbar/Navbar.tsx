import Logo from '@/components/Logo';
import NavLinkComp from './NavLinkComp';
import { navLinks } from '@/assets/data/dashboard/dashboard';

const Navbar: React.FC = () => {
  return (
    <nav className='max-w-screen-2xl h-14 px-12 border-b-[1.5px] border-b-stone-200'>
      <div className='w-full h-full flex space-x-12 items-center'>
        <Logo className='h-10 w-10' />
        {navLinks.map((link) => (
          <NavLinkComp
            key={link.href}
            label={link.label}
            href={link.href}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
