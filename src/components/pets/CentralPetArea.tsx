import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import DraggablePetContainer from './DraggablePetContainer';

interface CentralPetAreaProps {
  activePetType: 'dog' | 'cat' | 'seal' | 'redPanda' | 'stardew-cow' | 'stardew-chicken' | 'stardew-rabbit' | 'stardew-deer';
  className?: string;
  showInTest?: boolean; // Indica si se muestra en la página de test
}

/**
 * Área central que contiene las mascotas virtuales interactivas
 * Permite que las mascotas se muestren en el centro de la página principal
 * o al lado durante los tests
 */
const CentralPetArea: React.FC<CentralPetAreaProps> = ({
  activePetType,
  className,
  showInTest = false
}) => {
  // Estado para controlar la posición de las mascotas en la página de test
  const [testPosition, setTestPosition] = useState({ x: 0, y: 0 });
  
  // Calcular la posición para la página de test (al lado del contenido)
  useEffect(() => {
    if (showInTest) {
      // Posicionar a la derecha en pantallas grandes, abajo en móviles
      const handleResize = () => {
        if (window.innerWidth >= 768) { // md breakpoint
          // Posicionar a la derecha, con más espacio para evitar superposición con el contenido
          setTestPosition({
            x: window.innerWidth - 180, // Aumentado para alejar más del borde
            y: window.innerHeight / 3 // Posicionado más arriba para no interferir con el contenido
          });
        } else {
          // Posicionar abajo con más espacio para evitar superposición con el contenido
          setTestPosition({
            x: window.innerWidth / 2 - 50,
            y: window.innerHeight - 180 // Aumentado para alejar más del borde inferior
          });
        }
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [showInTest]);

  return (
    <div className={cn(
      'w-full h-full',
      showInTest ? '' : 'flex items-center justify-center',
      showInTest ? 'z-0' : 'z-10', // Menor z-index en la página de test
      className
    )}>
      <DraggablePetContainer 
        petType={activePetType}
        initialPosition={showInTest ? testPosition : 'center'}
        className={cn(
          showInTest ? 'absolute' : '',
          // Ajustar tamaño para que sea más pequeño en la página de test
          showInTest ? 'scale-75 md:scale-90 opacity-80' : 'opacity-100',
          "pointer-events-auto"
        )}
        boundaryPadding={40} // Aumentar el padding para mantener la mascota más alejada de los bordes
      />
    </div>
  );
};

export default CentralPetArea;