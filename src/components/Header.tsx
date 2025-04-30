import type { FC } from 'react';
import Logo from './Logo'; // Import the new Logo component
import Link from 'next/link'; // Import Link for navigation

const Header: FC = () => {
  return (
    <header className="py-3 px-4 sm:px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-10 flex items-center justify-center">
      {/* Wrap Logo in a Link to the homepage */}
      <Link href="/" aria-label="FamilySafe AI Home">
        <Logo className="h-8 w-auto" /> {/* Adjust size as needed */}
      </Link>
      {/* Optional: Add navigation or user actions here later */}
    </header>
  );
};

export default Header;
