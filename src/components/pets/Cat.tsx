import React from 'react';
import { cn } from '@/lib/utils';

interface CatProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const Cat: React.FC<CatProps> = ({ 
  isAnimating = true,
  className, 
  ...props 
}) => {
  return (
    <div className={cn(
      'relative w-40 h-40 transition-all duration-300',
      isAnimating && 'hover:scale-110',
      className
    )}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        {...props}
      >
        {/* Cuerpo */}
        <ellipse cx="50" cy="60" rx="22" ry="18" fill="#808080" />
        
        {/* Cabeza */}
        <circle cx="50" cy="35" r="16" fill="#808080" />
        
        {/* Ojos */}
        <g className={isAnimating ? 'animate-[catBlink_4s_ease-in-out_infinite]' : ''}>
          <path d="M43 30 L43 34" stroke="#000000" strokeWidth="2" />
          <path d="M57 30 L57 34" stroke="#000000" strokeWidth="2" />
        </g>
        
        {/* Nariz */}
        <path d="M50 38 L48 40 L52 40 Z" fill="#FFA7A7" />
        
        {/* Orejas */}
        <path d="M35 25 L40 15 L45 25" fill="#808080" />
        <path d="M65 25 L60 15 L55 25" fill="#808080" />
        
        {/* Cola */}
        <path 
          d="M72 60 Q80 55 77 45" 
          stroke="#808080" 
          strokeWidth="4" 
          fill="none"
          className={isAnimating ? 'animate-[catTail_2s_ease-in-out_infinite]' : ''}
        />
        
        {/* Bigotes */}
        <g className={isAnimating ? 'animate-[whiskers_3s_ease-in-out_infinite]' : ''}>
          <path d="M35 40 L45 38" stroke="#000000" strokeWidth="0.5" />
          <path d="M35 42 L45 42" stroke="#000000" strokeWidth="0.5" />
          <path d="M35 44 L45 46" stroke="#000000" strokeWidth="0.5" />
          
          <path d="M65 40 L55 38" stroke="#000000" strokeWidth="0.5" />
          <path d="M65 42 L55 42" stroke="#000000" strokeWidth="0.5" />
          <path d="M65 44 L55 46" stroke="#000000" strokeWidth="0.5" />
        </g>
        
        {/* Patas */}
        <rect x="37" y="75" width="4" height="8" fill="#808080" />
        <rect x="59" y="75" width="4" height="8" fill="#808080" />
      </svg>
    </div>
  );
};

export default Cat;

// Añadir estos estilos en tu archivo global.css
/*
@keyframes catTail {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-20deg); }
}

@keyframes catBlink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}

@keyframes whiskers {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(2deg); }
}
*/