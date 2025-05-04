import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import VirtualPet from './VirtualPet';

interface DraggablePetContainerProps {
  petType: 'dog' | 'cat' | 'seal' | 'redPanda' | 'stardew-cow' | 'stardew-chicken' | 'stardew-rabbit' | 'stardew-deer';
  className?: string;
  initialPosition?: { x: number, y: number } | 'center';
  boundaryPadding?: number;
}

/**
 * Componente que permite arrastrar una mascota virtual por la pantalla
 * con detección de colisiones para mantenerla dentro de los límites
 */
const DraggablePetContainer: React.FC<DraggablePetContainerProps> = ({
  petType,
  className,
  initialPosition = 'center',
  boundaryPadding = 20
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  // Inicializar la posición
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      setContainerSize({ width, height });
      
      // Posicionar en el centro si se especifica
      if (initialPosition === 'center') {
        // Ajustamos las coordenadas para que la mascota no interfiera con el botón
        const centerX = window.innerWidth * 0.7094152884481049 - width / 2;
        const centerY = window.innerHeight * 0.4287471748134976 - height / 2;
        setPosition({ x: centerX, y: centerY });
      } else if (initialPosition) {
        setPosition(initialPosition);
      }
    }
  }, [initialPosition]);

  // Manejar el inicio del arrastre
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      setIsDragging(true);
      const rect = containerRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Manejar el movimiento durante el arrastre
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      // Calcular nueva posición
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;
      
      // Aplicar límites para evitar que la mascota salga de la pantalla
      const maxX = window.innerWidth - containerSize.width - boundaryPadding;
      const maxY = window.innerHeight - containerSize.height - boundaryPadding;
      
      newX = Math.max(boundaryPadding, Math.min(newX, maxX));
      newY = Math.max(boundaryPadding, Math.min(newY, maxY));
      
      setPosition({ x: newX, y: newY });
    }
  };

  // Manejar el fin del arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Agregar y eliminar event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset, containerSize, boundaryPadding]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'fixed w-20 h-20 md:w-28 md:h-28 cursor-grab active:cursor-grabbing transition-transform',
        isDragging ? 'scale-110 z-30' : 'z-10',
        className
      )}
      style={{
        pointerEvents: 'auto', // Asegura que la mascota sea interactiva
        touchAction: 'none', // Mejora el comportamiento táctil
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        if (containerRef.current) {
          setIsDragging(true);
          const touch = e.touches[0];
          const rect = containerRef.current.getBoundingClientRect();
          setOffset({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          });
        }
      }}
      onTouchMove={(e) => {
        if (isDragging) {
          const touch = e.touches[0];
          
          // Calcular nueva posición
          let newX = touch.clientX - offset.x;
          let newY = touch.clientY - offset.y;
          
          // Aplicar límites
          const maxX = window.innerWidth - containerSize.width - boundaryPadding;
          const maxY = window.innerHeight - containerSize.height - boundaryPadding;
          
          newX = Math.max(boundaryPadding, Math.min(newX, maxX));
          newY = Math.max(boundaryPadding, Math.min(newY, maxY));
          
          setPosition({ x: newX, y: newY });
          e.preventDefault(); // Prevenir scroll
        }
      }}
      onTouchEnd={() => setIsDragging(false)}
    >
      <VirtualPet 
        petType={petType} 
        className="w-full h-full" 
        isAnimating={true}
      />
    </div>
  );
};

export default DraggablePetContainer;