import type { FC } from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'light' | 'dark';
}

import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

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
