import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="py-4 px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
      <h1 className="text-2xl font-bold text-center text-primary">FamilySafe AI</h1>
    </header>
  );
};

export default Header;
