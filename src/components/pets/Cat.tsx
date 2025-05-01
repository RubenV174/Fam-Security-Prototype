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
        viewBox="0 0 16 16"
        width="100%"
        height="100%"
        style={{ imageRendering: 'pixelated' }}
        {...props}
      >
        {/* Fondo transparente para el grid */}
        <rect width="16" height="16" fill="none" />
        
        {/* Cuerpo - Gris */}
        <rect x="5" y="9" width="6" height="4" fill="#808080" />
        
        {/* Cabeza - Gris */}
        <rect x="4" y="5" width="8" height="4" fill="#808080" />
        
        {/* Orejas */}
        <rect x="3" y="4" width="2" height="2" fill="#808080" className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''} />
        <rect x="11" y="4" width="2" height="2" fill="#808080" className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''} />
        
        {/* Ojos - Negros */}
        <g className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
        </g>
        
        {/* Nariz - Rosa */}
        <rect x="7" y="7" width="2" height="1" fill="#FFA7A7" />
        
        {/* Bigotes */}
        <g className={isAnimating ? 'animate-[pixelShift_2s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
          <rect x="11" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
        </g>
        
        {/* Cola */}
        <rect 
          x="11" 
          y="10" 
          width="3" 
          height="1" 
          fill="#808080"
          className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}
        />
        
        {/* Patas */}
        <rect x="5" y="13" width="1" height="2" fill="#808080" />
        <rect x="10" y="13" width="1" height="2" fill="#808080" />
      </svg>
    </div>
  );
};

export default Cat;

// Añadir estos estilos en tu archivo global.css
/*
@keyframes pixelWag {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(1px) rotate(15deg); }
}

@keyframes pixelBlink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0; }
}

@keyframes pixelShift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(1px); }
}

@keyframes pixelBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
}
*/