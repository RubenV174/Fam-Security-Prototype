import React from 'react';
import { cn } from '@/lib/utils';
import MovingPet from './MovingPet';

interface RedPandaProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
}

const RedPanda: React.FC<RedPandaProps> = ({ 
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
        
        {/* Cuerpo - Naranja rojizo con sombras */}
        <g className={isAnimating ? 'animate-[pixelBounce_2s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="9" width="6" height="4" fill="#E84A2F" />
          {/* Sombras del cuerpo */}
          <rect x="5" y="12" width="6" height="1" fill="#C43C27" />
          <rect x="10" y="9" width="1" height="3" fill="#D04329" />
          {/* Detalles del pelaje */}
          <rect x="6" y="10" width="2" height="1" fill="#F05E45" />
        </g>
        
        {/* Cabeza - Naranja rojizo con sombras */}
        <g className={isAnimating ? 'animate-[pixelShift_3s_ease-in-out_infinite]' : ''}>
          <rect x="4" y="5" width="8" height="4" fill="#E84A2F" />
          {/* Sombras de la cabeza */}
          <rect x="4" y="8" width="8" height="1" fill="#D04329" />
          <rect x="11" y="5" width="1" height="3" fill="#D04329" />
        </g>
        
        {/* Máscara facial blanca con sombras */}
        <rect x="6" y="7" width="4" height="2" fill="#FFFFFF" />
        <rect x="6" y="8" width="4" height="1" fill="#F0F0F0" />
        
        {/* Orejas - Marrón con detalles */}
        <g className={isAnimating ? 'animate-[pixelBounce_3s_ease-in-out_infinite]' : ''}>
          <rect x="3" y="4" width="2" height="2" fill="#8B4513" />
          <rect x="4" y="4" width="1" height="1" fill="#7A3B10" />
          <rect x="3" y="5" width="1" height="1" fill="#9A5018" />
          
          <rect x="11" y="4" width="2" height="2" fill="#8B4513" />
          <rect x="11" y="4" width="1" height="1" fill="#7A3B10" />
          <rect x="12" y="5" width="1" height="1" fill="#9A5018" />
        </g>
        
        {/* Ojos - Negros con brillo */}
        <g className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''}>
          <rect x="5" y="6" width="1" height="1" fill="#000000" />
          <rect x="10" y="6" width="1" height="1" fill="#000000" />
          {/* Brillo en los ojos */}
          <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
          <rect x="10" y="6" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
        </g>
        
        {/* Nariz - Negra con brillo */}
        <rect x="7" y="7" width="2" height="1" fill="#000000" />
        <rect x="7" y="7" width="1" height="1" fill="#333333" />
        
        {/* Marcas faciales más detalladas */}
        <rect x="4" y="5" width="1" height="1" fill="#8B4513" />
        <rect x="4" y="6" width="1" height="1" fill="#7A3B10" />
        <rect x="11" y="5" width="1" height="1" fill="#8B4513" />
        <rect x="11" y="6" width="1" height="1" fill="#7A3B10" />
        
        {/* Cola rayada con más detalle */}
        <g className={isAnimating ? 'animate-[pixelWag_2s_ease-in-out_infinite]' : ''}>
          <rect x="11" y="10" width="3" height="2" fill="#E84A2F" />
          <rect x="13" y="10" width="1" height="1" fill="#D04329" />
          <rect x="12" y="10" width="1" height="1" fill="#8B4513" />
          <rect x="11" y="11" width="1" height="1" fill="#8B4513" />
          <rect x="13" y="11" width="1" height="1" fill="#7A3B10" />
        </g>
        
        {/* Patas con sombras */}
        <rect x="5" y="13" width="2" height="2" fill="#8B4513" />
        <rect x="5" y="14" width="2" height="1" fill="#7A3B10" />
        <rect x="9" y="13" width="2" height="2" fill="#8B4513" />
        <rect x="9" y="14" width="2" height="1" fill="#7A3B10" />
      </svg>
    </div>
    </MovingPet>
  );
};

export default RedPanda;

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