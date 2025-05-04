import React from 'react';
import { cn } from '@/lib/utils';

interface SealProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
  isWalking?: boolean;
}

const Seal: React.FC<SealProps> = ({ 
  isAnimating = true,
  isWalking = false,
  className, 
  ...props 
}) => {
  return (
    <div className={cn(
      'relative w-40 h-40 transition-all duration-300',
      isAnimating && 'hover:scale-110',
      isWalking && isAnimating && 'animate-[sealWalk_0.6s_ease-in-out_infinite]',
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
        
        {/* Cuerpo - Gris claro */}
        <rect 
          x="5" 
          y="8" 
          width="6" 
          height="5" 
          fill="#A9A9A9"
          className={isAnimating ? 'animate-[pixelBounce_2s_ease-in-out_infinite]' : ''}
        />
        
        {/* Cabeza - Gris claro */}
        <rect 
          x="4" 
          y="5" 
          width="8" 
          height="3" 
          fill="#A9A9A9"
          className={isAnimating ? 'animate-[pixelShift_3s_ease-in-out_infinite]' : ''}
        />
        
        {/* Nariz - Negra */}
        <rect x="7" y="7" width="2" height="1" fill="#000000" />
        
        {/* Ojos - Negros */}
        <g className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
        </g>
        
        {/* Bigotes */}
        <g className={isAnimating ? 'animate-[pixelShift_2s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
          <rect x="11" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
        </g>
        
        {/* Aletas */}
        <rect 
          x="3" 
          y="10" 
          width="2" 
          height="2" 
          fill="#A9A9A9"
          className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}
        />
        <rect 
          x="11" 
          y="10" 
          width="2" 
          height="2" 
          fill="#A9A9A9"
          className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}
        />
        
        {/* Cola */}
        <rect x="7" y="13" width="2" height="1" fill="#A9A9A9" className={isWalking && isAnimating ? 'animate-[pixelBounce_0.6s_ease-in-out_infinite]' : ''} />
      </svg>
    </div>
  );
};

export default Seal;

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

@keyframes sealWalk {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(2px) translateY(-2px); }
  50% { transform: translateX(4px) translateY(0); }
  75% { transform: translateX(2px) translateY(-2px); }
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