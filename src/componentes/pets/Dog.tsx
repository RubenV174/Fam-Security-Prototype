import React from 'react';
import { cn } from '@/lib/utils';

interface DogProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
  isWalking?: boolean;
}

const Dog: React.FC<DogProps> = ({ 
  isAnimating = true,
  isWalking = false,
  className, 
  ...props 
}) => {
  return (
    <div className={cn(
      'relative w-40 h-40 transition-all duration-300',
      isAnimating && 'hover:scale-110',
      isWalking && isAnimating && 'animate-[dogWalk_0.5s_ease-in-out_infinite]',
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
        
        {/* Cuerpo - Marrón */}
        <rect x="5" y="9" width="6" height="4" fill="#B87A3D" />
        
        {/* Cabeza - Marrón */}
        <rect x="4" y="5" width="8" height="4" fill="#B87A3D" />
        
        {/* Orejas */}
        <rect x="3" y="3" width="2" height="3" fill="#8B5E3C" className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''} />
        <rect x="11" y="3" width="2" height="3" fill="#8B5E3C" className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''} />
        
        {/* Ojos - Negros */}
        <g className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
        </g>
        
        {/* Nariz - Negra */}
        <rect x="7" y="7" width="2" height="2" fill="#000000" />
        
        {/* Cola */}
        <rect 
          x="11" 
          y="9" 
          width="3" 
          height="2" 
          fill="#B87A3D"
          className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}
        />
        
        {/* Patas */}
        <rect x="5" y="13" width="2" height="2" fill="#8B5E3C" className={isWalking && isAnimating ? 'animate-[pixelBounce_0.5s_ease-in-out_infinite]' : ''} />
        <rect x="9" y="13" width="2" height="2" fill="#8B5E3C" className={isWalking && isAnimating ? 'animate-[pixelBounce_0.5s_ease-in-out_infinite_0.25s]' : ''} />
      </svg>
    </div>
  );
};

export default Dog;

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

@keyframes dogWalk {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(2px) translateY(-1px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(2px) translateY(-1px); }
}
*/