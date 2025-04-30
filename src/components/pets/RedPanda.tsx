import React from 'react';
import { cn } from '@/lib/utils';

interface RedPandaProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const RedPanda: React.FC<RedPandaProps> = ({ 
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
          rx="25" 
          ry="20" 
          fill="#FF5733"
          className={isAnimating ? 'animate-[pandaBounce_2s_ease-in-out_infinite]' : ''}
        />
        
        {/* Cabeza */}
        <circle 
          cx="50" 
          cy="35" 
          r="18" 
          fill="#FF5733"
          className={isAnimating ? 'animate-[pandaHead_3s_ease-in-out_infinite]' : ''}
        />
        
        {/* Máscara facial blanca */}
        <path 
          d="M40 30 Q50 45 60 30" 
          fill="#FFFFFF"
        />
        
        {/* Ojos */}
        <g className={isAnimating ? 'animate-[pandaBlink_4s_ease-in-out_infinite]' : ''}>
          <circle cx="43" cy="32" r="3" fill="#000000" />
          <circle cx="57" cy="32" r="3" fill="#000000" />
        </g>
        
        {/* Nariz */}
        <circle cx="50" cy="36" r="2" fill="#000000" />
        
        {/* Orejas */}
        <path 
          d="M35 20 L40 25 L32 28 Z" 
          fill="#8B4513"
          className={isAnimating ? 'animate-[pandaEars_2s_ease-in-out_infinite]' : ''}
        />
        <path 
          d="M65 20 L60 25 L68 28 Z" 
          fill="#8B4513"
          className={isAnimating ? 'animate-[pandaEars_2s_ease-in-out_infinite]' : ''}
        />
        
        {/* Marcas faciales */}
        <path d="M38 28 L35 25" stroke="#8B4513" strokeWidth="2" />
        <path d="M62 28 L65 25" stroke="#8B4513" strokeWidth="2" />
        
        {/* Cola rayada */}
        <g className={isAnimating ? 'animate-[pandaTail_2s_ease-in-out_infinite]' : ''}>
          <path 
            d="M75 60 Q85 55 80 45" 
            stroke="#FF5733" 
            strokeWidth="8" 
            fill="none"
          />
          <path 
            d="M75 60 Q85 55 80 45" 
            stroke="#8B4513" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="4 4"
          />
        </g>
        
        {/* Patas */}
        <rect x="35" y="75" width="6" height="10" fill="#8B4513" />
        <rect x="59" y="75" width="6" height="10" fill="#8B4513" />
      </svg>
    </div>
  );
};

export default RedPanda;

// Añadir estos estilos en tu archivo global.css
/*
@keyframes pandaBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pandaHead {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
}

@keyframes pandaBlink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}

@keyframes pandaEars {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
}

@keyframes pandaTail {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-10deg); }
}
*/