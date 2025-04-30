import * as React from 'react';
import { cn } from '@/lib/utils';
import Dog from './Dog';
import Cat from './Cat';
import Seal from './Seal';
import RedPanda from './RedPanda';

interface VirtualPetProps extends React.SVGProps<SVGSVGElement> {
  isAnimating?: boolean;
  petType: 'dog' | 'cat' | 'seal' | 'redPanda';
}

const VirtualPet: React.FC<VirtualPetProps> = ({ 
  isAnimating = true, 
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

  const PetComponent = PetComponents[petType];

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
          {...props}
        />
      </div>
    </React.Fragment>
  );
};

export default VirtualPet;