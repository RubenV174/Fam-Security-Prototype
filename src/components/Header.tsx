import type { FC } from 'react';
import Logo from './Logo';
import Link from 'next/link';

interface HeaderProps {
  logoVariant?: 'light' | 'dark';
}

const Header: FC<HeaderProps> = ({ logoVariant = 'light' }) => {
  return (
    <header className="py-3 px-4 sm:px-6 border-b sticky top-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-center shadow-sm">
      <Link href="/" aria-label="Fam Security Inicio">
        <Logo className="h-10 sm:h-11 w-auto" variant={logoVariant} />
      </Link>
    </header>
  );
};

export default Header;
