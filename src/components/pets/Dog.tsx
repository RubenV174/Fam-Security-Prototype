import React from 'react';
import { cn } from '@/lib/utils';
import MovingPet from './MovingPet';

interface DogProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const Dog: React.FC<DogProps> = ({ 
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
        
        {/* Cuerpo principal - Marrón con sombras */}
        <rect x="5" y="9" width="6" height="4" fill="#B87A3D" />
        
        {/* Sombras del cuerpo */}
        <rect x="5" y="12" width="6" height="1" fill="#A06A30" />
        <rect x="10" y="9" width="1" height="3" fill="#A06A30" />
        
        {/* Detalles del pelaje */}
        <rect x="6" y="10" width="2" height="1" fill="#C88A4D" />
        
        {/* Cabeza - Marrón con sombras */}
        <rect x="4" y="5" width="8" height="4" fill="#B87A3D" />
        
        {/* Sombras de la cabeza */}
        <rect x="4" y="8" width="8" height="1" fill="#A06A30" />
        <rect x="11" y="5" width="1" height="3" fill="#A06A30" />
        
        {/* Orejas con detalles */}
        <g className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="3" width="2" height="3" fill="#8B5E3C" />
          <rect x="4" y="3" width="1" height="2" fill="#7A4E2C" />
          <rect x="3" y="5" width="1" height="1" fill="#7A4E2C" />
          
          <rect x="11" y="3" width="2" height="3" fill="#8B5E3C" />
          <rect x="11" y="3" width="1" height="2" fill="#7A4E2C" />
          <rect x="12" y="5" width="1" height="1" fill="#7A4E2C" />
        </g>
        
        {/* Manchas características */}
        <rect x="7" y="5" width="2" height="1" fill="#C88A4D" />
        <rect x="8" y="9" width="2" height="2" fill="#C88A4D" />
        
        {/* Ojos - Negros con brillo */}
        <g className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
          {/* Brillo en los ojos */}
          <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
          <rect x="10" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
        </g>
        
        {/* Nariz - Negra con brillo */}
        <rect x="7" y="7" width="2" height="2" fill="#000000" />
        <rect x="7" y="7" width="1" height="1" fill="#333333" />
        
        {/* Cola con más detalle */}
        <g className={isAnimating ? 'animate-[pixelWag_1s_ease-in-out_infinite]' : ''}>
          <rect x="11" y="9" width="3" height="2" fill="#B87A3D" />
          <rect x="13" y="9" width="1" height="1" fill="#A06A30" />
          <rect x="11" y="10" width="1" height="1" fill="#A06A30" />
          <rect x="12" y="11" width="1" height="1" fill="#B87A3D" />
        </g>
        
        {/* Patas con sombras */}
        <rect x="5" y="13" width="2" height="2" fill="#8B5E3C" />
        <rect x="5" y="14" width="2" height="1" fill="#7A4E2C" />
        <rect x="9" y="13" width="2" height="2" fill="#8B5E3C" />
        <rect x="9" y="14" width="2" height="1" fill="#7A4E2C" />
      </svg>
    </div>
    </MovingPet>
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
*/