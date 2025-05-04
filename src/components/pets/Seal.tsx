import React from 'react';
import { cn } from '@/lib/utils';
import MovingPet from './MovingPet';

interface SealProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const Seal: React.FC<SealProps> = ({ 
  isAnimating = true,
  className, 
  ...props 
}) => {
  return (
    <MovingPet isAnimating={isAnimating} className={className}>
      <div className="relative w-40 h-40 transition-all duration-300 hover:scale-110">
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
        
        {/* Cuerpo - Gris plateado con sombras */}
        <g className={isAnimating ? 'animate-[pixelBounce_2s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="8" width="6" height="5" fill="#BFBFBF" />
          {/* Sombras del cuerpo */}
          <rect x="5" y="12" width="6" height="1" fill="#A0A0A0" />
          <rect x="10" y="8" width="1" height="4" fill="#B0B0B0" />
          {/* Detalles del pelaje */}
          <rect x="6" y="9" width="2" height="1" fill="#D0D0D0" />
          <rect x="8" y="10" width="2" height="1" fill="#D0D0D0" />
        </g>
        
        {/* Cabeza - Gris plateado con sombras */}
        <g className={isAnimating ? 'animate-[pixelShift_3s_ease-in-out_infinite]' : ''}>
          <rect x="4" y="5" width="8" height="3" fill="#BFBFBF" />
          {/* Sombras de la cabeza */}
          <rect x="4" y="7" width="8" height="1" fill="#B0B0B0" />
          <rect x="11" y="5" width="1" height="2" fill="#B0B0B0" />
          {/* Detalles faciales */}
          <rect x="5" y="5" width="2" height="1" fill="#D0D0D0" />
          <rect x="9" y="5" width="2" height="1" fill="#D0D0D0" />
        </g>
        
        {/* Nariz - Negra con brillo */}
        <rect x="7" y="7" width="2" height="1" fill="#000000" />
        <rect x="7" y="7" width="1" height="1" fill="#333333" />
        
        {/* Ojos - Negros con brillo */}
        <g className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
          {/* Brillo en los ojos */}
          <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
          <rect x="10" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
        </g>
        
        {/* Bigotes más detallados */}
        <g className={isAnimating ? 'animate-[pixelShift_2s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
          <rect x="2" y="6" width="1" height="1" fill="#000000" opacity="0.3" />
          <rect x="2" y="8" width="1" height="1" fill="#000000" opacity="0.3" />
          <rect x="11" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
          <rect x="13" y="6" width="1" height="1" fill="#000000" opacity="0.3" />
          <rect x="13" y="8" width="1" height="1" fill="#000000" opacity="0.3" />
        </g>
        
        {/* Aletas con sombras y detalles */}
        <g className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="10" width="2" height="2" fill="#BFBFBF" />
          <rect x="3" y="11" width="2" height="1" fill="#A0A0A0" />
          <rect x="4" y="10" width="1" height="1" fill="#D0D0D0" />
        </g>
        <g className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}>
          <rect x="11" y="10" width="2" height="2" fill="#BFBFBF" />
          <rect x="11" y="11" width="2" height="1" fill="#A0A0A0" />
          <rect x="11" y="10" width="1" height="1" fill="#D0D0D0" />
        </g>
        
        {/* Cola con detalles */}
        <g className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''}>
          <rect x="7" y="13" width="2" height="1" fill="#BFBFBF" />
          <rect x="8" y="13" width="1" height="1" fill="#A0A0A0" />
          <rect x="7" y="14" width="1" height="1" fill="#BFBFBF" />
        </g>
      </svg>
    </div>
    </MovingPet>
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

@keyframes pixelShift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(1px); }
}

@keyframes pixelBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
}
*/