import React from 'react';
import { cn } from '@/lib/utils';
import VirtualPet from './VirtualPet';

interface FixedPetContainerProps {
  petType: 'dog' | 'cat' | 'seal' | 'redPanda' | 'stardew-cow' | 'stardew-chicken' | 'stardew-rabbit' | 'stardew-deer';
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Componente que posiciona una mascota virtual en una posición fija en la pantalla
 */
const FixedPetContainer: React.FC<FixedPetContainerProps> = ({
  petType,
  className,
  position = 'bottom-right'
}) => {
  // Mapeo de posiciones a clases CSS
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <div className={cn(
      'fixed z-50 w-24 h-24 md:w-32 md:h-32',
      positionClasses[position],
      className
    )}>
      <VirtualPet 
        petType={petType} 
        className="w-full h-full" 
      />
    </div>
  );
};

export default FixedPetContainer;