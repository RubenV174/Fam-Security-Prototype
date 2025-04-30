import React from 'react';
import { cn } from '@/lib/utils';

interface SealProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const Seal: React.FC<SealProps> = ({ 
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
        <ellipse 
          cx="50" 
          cy="60" 
          rx="30" 
          ry="25" 
          fill="#708090"
          className={isAnimating ? 'animate-[sealBounce_2s_ease-in-out_infinite]' : ''}
        />
        
        {/* Cabeza */}
        <circle 
          cx="50" 
          cy="30" 
          r="15" 
          fill="#708090"
          className={isAnimating ? 'animate-[sealNod_3s_ease-in-out_infinite]' : ''}
        />
        
        {/* Ojos */}
        <g className={isAnimating ? 'animate-[sealBlink_4s_ease-in-out_infinite]' : ''}>
          <circle cx="45" cy="28" r="2.5" fill="#000000" />
          <circle cx="55" cy="28" r="2.5" fill="#000000" />
        </g>
        
        {/* Nariz */}
        <circle cx="50" cy="32" r="3" fill="#000000" />
        
        {/* Bigotes */}
        <g className={isAnimating ? 'animate-[sealWhiskers_2s_ease-in-out_infinite]' : ''}>
          <path d="M40 32 L35 30" stroke="#000000" strokeWidth="0.5" />
          <path d="M40 33 L35 33" stroke="#000000" strokeWidth="0.5" />
          <path d="M40 34 L35 36" stroke="#000000" strokeWidth="0.5" />
          
          <path d="M60 32 L65 30" stroke="#000000" strokeWidth="0.5" />
          <path d="M60 33 L65 33" stroke="#000000" strokeWidth="0.5" />
          <path d="M60 34 L65 36" stroke="#000000" strokeWidth="0.5" />
        </g>
        
        {/* Aletas */}
        <path 
          d="M25 60 Q20 65 25 70" 
          fill="#708090"
          className={isAnimating ? 'animate-[sealFlippers_1.5s_ease-in-out_infinite]' : ''}
        />
        <path 
          d="M75 60 Q80 65 75 70" 
          fill="#708090"
          className={isAnimating ? 'animate-[sealFlippers_1.5s_ease-in-out_infinite]' : ''}
        />
        
        {/* Cola */}
        <path 
          d="M50 85 Q55 90 50 95" 
          fill="#708090"
          className={isAnimating ? 'animate-[sealTail_2s_ease-in-out_infinite]' : ''}
        />
      </svg>
    </div>
  );
};

export default Seal;

// Añadir estos estilos en tu archivo global.css
/*
@keyframes sealBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes sealNod {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
}

@keyframes sealBlink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}

@keyframes sealWhiskers {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(3deg); }
}

@keyframes sealFlippers {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-10deg); }
}

@keyframes sealTail {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
}
*/