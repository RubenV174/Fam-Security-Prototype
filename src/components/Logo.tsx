import type { FC } from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Logo: FC<LogoProps> = (props) => {
  return (
    <img
      src="/logo-fam-security.png"
      alt="FAM Security Logo"
      width={192}
      height={80}
      {...props}
    />
  );
};

export default Logo;
