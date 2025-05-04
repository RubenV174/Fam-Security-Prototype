import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MovingPetProps {
  children: React.ReactNode;
  className?: string;
  isAnimating?: boolean;
}

const MovingPet: React.FC<MovingPetProps> = ({
  children,
  className,
  isAnimating = true,
}) => {
  // Estado para la posición y dirección
  const [position, setPosition] = useState({ x: Math.random() * 80, y: Math.random() * 80 });
  const [direction, setDirection] = useState({ x: Math.random() > 0.5 ? 1 : -1, y: 0 });
  const [isMoving, setIsMoving] = useState(true);

  useEffect(() => {
    if (!isAnimating || !isMoving) return;

    const moveInterval = setInterval(() => {
      setPosition(prev => {
        // Calcular nueva posición
        const newX = prev.x + direction.x * 0.5;
        
        // Verificar límites y cambiar dirección si es necesario
        if (newX < 0 || newX > 90) {
          setDirection(prev => ({ ...prev, x: -prev.x }));
          return prev; // Mantener posición actual este frame
        }
        
        return { ...prev, x: newX };
      });
    }, 50);

    // Cambiar dirección aleatoriamente cada cierto tiempo
    const directionInterval = setInterval(() => {
      // 10% de probabilidad de detenerse por un momento
      const shouldPause = Math.random() < 0.1;
      
      if (shouldPause) {
        setIsMoving(false);
        setTimeout(() => setIsMoving(true), Math.random() * 3000 + 1000);
      } else {
        setDirection({ x: Math.random() > 0.5 ? 1 : -1, y: 0 });
      }
    }, Math.random() * 5000 + 3000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(directionInterval);
    };
  }, [isAnimating, isMoving, direction]);

  return (
    <div 
      className={cn(
        'absolute transition-transform duration-300',
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `scaleX(${direction.x})`
      }}
    >
      {children}
    </div>
  );
};

export default MovingPet;