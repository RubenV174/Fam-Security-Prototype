import React from 'react';
import { cn } from '@/lib/utils';

interface DogProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const Dog: React.FC<DogProps> = ({ 
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
        <ellipse cx="50" cy="60" rx="25" ry="20" fill="#B87A3D" />
        
        {/* Cabeza */}
        <circle cx="50" cy="35" r="18" fill="#B87A3D" />
        
        {/* Ojos */}
        <g className={isAnimating ? 'animate-[blink_4s_ease-in-out_infinite]' : ''}>
          <circle cx="43" cy="32" r="3" fill="#000000" />
          <circle cx="57" cy="32" r="3" fill="#000000" />
        </g>
        
        {/* Nariz */}
        <circle cx="50" cy="38" r="4" fill="#000000" />
        
        {/* Orejas */}
        <path d="M35 25 Q33 15 40 22" fill="#8B5E3C" />
        <path d="M65 25 Q67 15 60 22" fill="#8B5E3C" />
        
        {/* Cola */}
        <path 
          d="M75 60 Q80 55 77 50" 
          stroke="#B87A3D" 
          strokeWidth="4" 
          fill="none"
          className={isAnimating ? 'animate-[wag_1s_ease-in-out_infinite]' : ''}
        />
        
        {/* Patas */}
        <rect x="35" y="75" width="6" height="10" fill="#8B5E3C" />
        <rect x="59" y="75" width="6" height="10" fill="#8B5E3C" />
      </svg>
    </div>
  );
};

export default Dog;

// Añadir estos estilos en tu archivo global.css
/*
@keyframes wag {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
}

@keyframes blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
*/