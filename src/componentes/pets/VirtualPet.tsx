import * as React from 'react';
import { cn } from '@/lib/utils';
import Dog from './Dog';
import Cat from './Cat';
import Seal from './Seal';
import RedPanda from './RedPanda';
import StardewPets from './StardewPets';

interface VirtualPetProps extends React.HTMLAttributes<HTMLDivElement> {
  isAnimating?: boolean;
  isWalking?: boolean;
  petType: 'dog' | 'cat' | 'seal' | 'redPanda' | 'stardew-cow' | 'stardew-chicken' | 'stardew-rabbit' | 'stardew-deer';
}

const VirtualPet: React.FC<VirtualPetProps> = ({ 
  isAnimating = true, 
  isWalking = false,
  petType,
  className,
  ...props 
}) => {
  const PetComponents = {
    dog: Dog,
    cat: Cat,
    seal: Seal,
    redPanda: RedPanda
  };

  const PetComponent = PetComponents[petType as keyof typeof PetComponents];

  // Manejar los animales de Stardew Valley
  if (petType.startsWith('stardew-')) {
    const stardewType = petType.replace('stardew-', '') as 'cow' | 'chicken' | 'rabbit' | 'deer';
    return (
      <div className={cn(
        'relative w-40 h-40 transition-transform',
        className
      )}>
        <StardewPets
          petType={stardewType}
          isAnimating={isAnimating}
          isWalking={isWalking}
          className="w-full h-full"
        />
      </div>
    );
  }
  
  if (!PetComponent) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={cn(
        'relative w-40 h-40 transition-transform',
        className
      )}>
        <PetComponent
          isAnimating={isAnimating}
          className="w-full h-full"
        />
      </div>
    </React.Fragment>
  );
};

export default VirtualPet;