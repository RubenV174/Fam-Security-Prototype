import type { FC } from 'react';
import Logo from './Logo';
import Link from 'next/link';

const Header: FC = () => {
  return (
    // Adjusted padding, added subtle shadow
    <header className="py-3 px-4 sm:px-6 border-b sticky top-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-center shadow-sm">
      <Link href="/" aria-label="Fam Security Inicio"> {/* Updated aria-label */}
        <Logo className="h-8 sm:h-9 w-auto" /> {/* Slightly larger on small screens */}
      </Link>
    </header>
  );
};

export default Header;
