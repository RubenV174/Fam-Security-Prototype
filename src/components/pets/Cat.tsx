import React from 'react';
import { cn } from '@/lib/utils';
import MovingPet from './MovingPet';

interface CatProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const Cat: React.FC<CatProps> = ({ 
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
        
        {/* Cuerpo principal - Gris claro */}
        <rect x="5" y="9" width="6" height="4" fill="#A0A0A0" />
        
        {/* Sombras del cuerpo */}
        <rect x="5" y="12" width="6" height="1" fill="#808080" />
        <rect x="10" y="9" width="1" height="3" fill="#909090" />
        
        {/* Cabeza - Gris claro */}
        <rect x="4" y="5" width="8" height="4" fill="#A0A0A0" />
        
        {/* Sombras de la cabeza */}
        <rect x="4" y="8" width="8" height="1" fill="#909090" />
        <rect x="11" y="5" width="1" height="3" fill="#909090" />
        
        {/* Orejas - Gris oscuro con detalles */}
        <g className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="4" width="2" height="2" fill="#707070" />
          <rect x="4" y="4" width="1" height="1" fill="#606060" />
          <rect x="11" y="4" width="2" height="2" fill="#707070" />
          <rect x="11" y="4" width="1" height="1" fill="#606060" />
        </g>
        
        {/* Manchas características */}
        <rect x="4" y="5" width="1" height="1" fill="#B0B0B0" />
        <rect x="11" y="5" width="1" height="1" fill="#B0B0B0" />
        <rect x="6" y="9" width="2" height="2" fill="#B0B0B0" />
        
        {/* Ojos - Negros con brillo */}
        <g className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
          {/* Brillo en los ojos */}
          <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
          <rect x="10" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
        </g>
        
        {/* Nariz - Rosa con sombra */}
        <rect x="7" y="7" width="2" height="1" fill="#FFA7A7" />
        <rect x="8" y="7" width="1" height="1" fill="#FF9090" />
        
        {/* Bigotes más detallados */}
        <g className={isAnimating ? 'animate-[pixelShift_2s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
          <rect x="2" y="6" width="1" height="1" fill="#000000" opacity="0.3" />
          <rect x="11" y="7" width="2" height="1" fill="#000000" opacity="0.5" />
          <rect x="13" y="6" width="1" height="1" fill="#000000" opacity="0.3" />
        </g>
        
        {/* Cola con más detalle */}
        <g className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}>
          <rect x="11" y="10" width="3" height="1" fill="#A0A0A0" />
          <rect x="13" y="10" width="1" height="1" fill="#909090" />
          <rect x="12" y="11" width="1" height="1" fill="#A0A0A0" />
        </g>
        
        {/* Patas con sombras */}
        <rect x="5" y="13" width="1" height="2" fill="#909090" />
        <rect x="10" y="13" width="1" height="2" fill="#909090" />
        <rect x="5" y="14" width="1" height="1" fill="#808080" />
        <rect x="10" y="14" width="1" height="1" fill="#808080" />
      </svg>
    </div>
    </MovingPet>
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