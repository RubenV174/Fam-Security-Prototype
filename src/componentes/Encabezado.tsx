import type { FC } from 'react';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


interface HeaderProps {
  logoVariant?: 'light' | 'dark';
  onToggleMode?: () => void; // Asegúrate de incluir esta línea
}

const Header: FC<HeaderProps> = ({ logoVariant = 'light', onToggleMode }) => {
  return (
    <header className="py-3 px-4 sm:px-6 border-b sticky top-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-between shadow-sm">
      <Link href="/" aria-label="Fam Security Inicio">
        <Logo className="h-10 sm:h-11 w-auto" variant={logoVariant} />
      </Link>
      {onToggleMode && (
        <Button onClick={onToggleMode} className="ml-auto">
          Cambiar Modo y Logo
        </Button>
      )}
    </header>
  );
};

export default Header;
