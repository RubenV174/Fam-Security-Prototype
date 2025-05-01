import type { FC } from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'light' | 'dark';
}

const Logo: FC<LogoProps> = ({ variant = 'light', className = '', ...props }) => {
  const src = variant === 'dark' ? '/logo-fam-security-dark.png' : '/logo-fam-security.png';
  const alt = variant === 'dark' ? 'FAM Security Logo Dark' : 'FAM Security Logo';
  return (
    <img
      src={src}
      alt={alt}
      width={192}
      height={80}
      className={className}
      {...props}
    />
  );
};

export default Logo;
