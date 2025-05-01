"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StardewPetProps {
  petType: 'cow' | 'chicken' | 'rabbit' | 'deer';
  isAnimating?: boolean;
  isWalking?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Interfaz separada para las props de SVG
interface SVGProps {
  xmlns?: string;
  viewBox?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

const StardewPets: React.FC<StardewPetProps> = ({
  petType = 'cow',
  isAnimating = true,
  isWalking = false,
  className,
  ...props
}) => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isMoving, setIsMoving] = useState(isWalking);
  const [bobPosition, setBobPosition] = useState(0); // Para el efecto de flotación
  
  // Efecto para manejar la animación de caminar
  useEffect(() => {
    if (!isAnimating || !isMoving) return;
    
    const interval = setInterval(() => {
      setPosition(prev => {
        // Cambiar dirección cuando llega a los límites
        if (prev >= 90) {
          setDirection(-1);
          return 90;
        } else if (prev <= 0) {
          setDirection(1);
          return 0;
        }
        return prev + (5 * direction);
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [isAnimating, isMoving, direction]);
  
  // Efecto para el movimiento de flotación suave
  useEffect(() => {
    if (!isAnimating) return;
    
    const bobInterval = setInterval(() => {
      setBobPosition(prev => (prev + 1) % 4); // Ciclo de 0-3 para el efecto de flotación
    }, 400);
    
    return () => clearInterval(bobInterval);
  }, [isAnimating]);
  
  // Alternar entre caminar y estar parado cada cierto tiempo
  useEffect(() => {
    if (!isAnimating) return;
    
    const toggleInterval = setInterval(() => {
      setIsMoving(prev => !prev);
    }, 10000); // Cambiar estado cada 10 segundos
    
    return () => clearInterval(toggleInterval);
  }, [isAnimating]);
  
  // Renderizar el animal seleccionado
  const renderPet = () => {
    switch (petType) {
      case 'cow':
        return (
          <div 
            className={cn(
              'relative w-16 h-16 transition-all duration-300',
              isMoving && 'animate-[pixelShift_0.5s_ease-in-out_infinite]',
              className
            )}
            style={{ 
              transform: `translateX(${position}%) translateY(${bobPosition === 1 || bobPosition === 3 ? '-2px' : '0px'})`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="100%"
              height="100%"
              style={{ imageRendering: 'pixelated' }}
              className={isAnimating && !isMoving ? 'animate-[stardewIdle_3s_ease-in-out_infinite]' : ''}
            >
              {/* Hierba */}
              <rect x="0" y="27" width="32" height="5" fill="#4CAF50" />
              <rect x="2" y="26" width="2" height="2" fill="#8BC34A" />
              <rect x="7" y="26" width="2" height="2" fill="#8BC34A" />
              <rect x="14" y="26" width="2" height="2" fill="#8BC34A" />
              <rect x="22" y="26" width="2" height="2" fill="#8BC34A" />
              <rect x="28" y="26" width="2" height="2" fill="#8BC34A" />
              
              {/* Cuerpo principal - Vaca */}
              <rect x="8" y="14" width="16" height="10" fill="#F8F8DC" />
              <rect x="6" y="16" width="2" height="8" fill="#F8F8DC" />
              <rect x="24" y="16" width="2" height="8" fill="#F8F8DC" />
              
              {/* Manchas */}
              <rect x="10" y="16" width="4" height="4" fill="#8B4513" />
              <rect x="18" y="18" width="4" height="3" fill="#8B4513" />
              <rect x="12" y="20" width="2" height="2" fill="#8B4513" />
              
              {/* Cabeza */}
              <rect x="10" y="8" width="12" height="6" fill="#F8F8DC" />
              
              {/* Orejas */}
              <rect x="8" y="8" width="2" height="3" fill="#F8F8DC" className={isAnimating ? 'animate-[stardewEarTwitch_4s_ease-in-out_infinite]' : ''} />
              <rect x="22" y="8" width="2" height="3" fill="#F8F8DC" className={isAnimating ? 'animate-[stardewEarTwitch_4s_ease-in-out_infinite_0.5s]' : ''} />
              
              {/* Ojos */}
              <g className={isAnimating ? 'animate-[stardewBlink_4s_ease-in-out_infinite]' : ''}>
                <rect x="12" y="10" width="2" height="2" fill="#000000" />
                <rect x="18" y="10" width="2" height="2" fill="#000000" />
              </g>
              
              {/* Nariz */}
              <rect x="14" y="12" width="4" height="2" fill="#FFC0CB" />
              
              {/* Patas */}
              <rect x="8" y="24" width="2" height="3" fill="#8B4513" className={isMoving ? 'animate-[stardewWalk_0.5s_ease-in-out_infinite]' : ''} />
              <rect x="14" y="24" width="2" height="3" fill="#8B4513" className={isMoving ? 'animate-[stardewWalk_0.5s_ease-in-out_infinite_0.1s]' : ''} />
              <rect x="16" y="24" width="2" height="3" fill="#8B4513" className={isMoving ? 'animate-[stardewWalk_0.5s_ease-in-out_infinite_0.2s]' : ''} />
              <rect x="22" y="24" width="2" height="3" fill="#8B4513" className={isMoving ? 'animate-[stardewWalk_0.5s_ease-in-out_infinite_0.3s]' : ''} />
            </svg>
          </div>
        );
      
      case 'chicken':
        return (
          <div 
            className={cn(
              'relative w-12 h-12 transition-all duration-300',
              isMoving && 'animate-[stardewWalk_0.3s_ease-in-out_infinite]',
              !isMoving && isAnimating && 'animate-[stardewIdle_2s_ease-in-out_infinite]',
              className
            )}
            style={{ 
              transform: `translateX(${position}%) translateY(${bobPosition === 1 || bobPosition === 3 ? '-2px' : '0px'})`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Hierba */}
              <rect x="0" y="20" width="24" height="4" fill="#4CAF50" />
              <rect x="2" y="19" width="1" height="1" fill="#8BC34A" />
              <rect x="6" y="19" width="1" height="1" fill="#8BC34A" />
              <rect x="11" y="19" width="1" height="1" fill="#8BC34A" />
              <rect x="16" y="19" width="1" height="1" fill="#8BC34A" />
              <rect x="20" y="19" width="1" height="1" fill="#8BC34A" />
              
              {/* Cuerpo - Gallina */}
              <rect x="8" y="12" width="8" height="6" fill="#FFFFFF" />
              
              {/* Cabeza */}
              <rect x="7" y="8" width="6" height="4" fill="#FFFFFF" />
              
              {/* Cresta */}
              <rect x="7" y="6" width="1" height="2" fill="#FF3333" />
              <rect x="8" y="6" width="1" height="2" fill="#FF3333" />
              <rect x="9" y="6" width="1" height="2" fill="#FF3333" />
              
              {/* Pico */}
              <rect x="13" y="9" width="2" height="1" fill="#FFA500" />
              
              {/* Ojo */}
              <rect x="11" y="9" width="1" height="1" fill="#000000" className={isAnimating ? 'animate-[pixelBlink_3s_ease-in-out_infinite]' : ''} />
              
              {/* Alas */}
              <rect x="6" y="13" width="2" height="4" fill="#F5F5DC" className={isMoving ? 'animate-[stardewWalk_0.5s_ease-in-out_infinite]' : 'animate-[stardewTailWag_2s_ease-in-out_infinite]'} />
              
              {/* Patas */}
              <rect x="9" y="18" width="1" height="2" fill="#FFA500" className={isMoving ? 'animate-[pixelBounce_0.3s_ease-in-out_infinite]' : ''} />
              <rect x="14" y="18" width="1" height="2" fill="#FFA500" className={isMoving ? 'animate-[pixelBounce_0.3s_ease-in-out_infinite_0.15s]' : ''} />
            </svg>
          </div>
        );
      
      case 'rabbit':
        return (
          <div 
            className={cn(
              'relative w-14 h-14 transition-all duration-300',
              isMoving && 'animate-[stardewWalk_0.4s_ease-in-out_infinite]',
              !isMoving && isAnimating && 'animate-[stardewIdle_2.5s_ease-in-out_infinite]',
              className
            )}
            style={{ 
              transform: `translateX(${position}%) translateY(${bobPosition === 1 || bobPosition === 3 ? '-2px' : '0px'})`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
              width="100%"
              height="100%"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Hierba */}
              <rect x="0" y="22" width="28" height="6" fill="#4CAF50" />
              <rect x="3" y="21" width="2" height="2" fill="#8BC34A" />
              <rect x="8" y="21" width="2" height="2" fill="#8BC34A" />
              <rect x="15" y="21" width="2" height="2" fill="#8BC34A" />
              <rect x="22" y="21" width="2" height="2" fill="#8BC34A" />
              
              {/* Cuerpo - Conejo */}
              <rect x="10" y="14" width="8" height="6" fill="#E07A5F" />
              
              {/* Cabeza */}
              <rect x="9" y="8" width="10" height="6" fill="#E07A5F" />
              
              {/* Orejas */}
              <rect x="10" y="4" width="2" height="4" fill="#E07A5F" className={isAnimating ? 'animate-[stardewEarTwitch_3s_ease-in-out_infinite]' : ''} />
              <rect x="16" y="4" width="2" height="4" fill="#E07A5F" className={isAnimating ? 'animate-[stardewEarTwitch_3s_ease-in-out_infinite_0.3s]' : ''} />
              
              {/* Ojos */}
              <g className={isAnimating ? 'animate-[pixelBlink_3s_ease-in-out_infinite]' : ''}>
                <rect x="11" y="10" width="2" height="2" fill="#FF0000" />
                <rect x="15" y="10" width="2" height="2" fill="#FF0000" />
              </g>
              
              {/* Nariz */}
              <rect x="13" y="12" width="2" height="1" fill="#FFC0CB" />
              
              {/* Patas */}
              <rect x="10" y="20" width="2" height="2" fill="#A0522D" className={isMoving ? 'animate-[pixelBounce_0.4s_ease-in-out_infinite]' : ''} />
              <rect x="16" y="20" width="2" height="2" fill="#A0522D" className={isMoving ? 'animate-[pixelBounce_0.4s_ease-in-out_infinite_0.2s]' : ''} />
              
              {/* Cola */}
              <rect x="8" y="16" width="2" height="2" fill="#FFFFFF" className={isAnimating ? 'animate-[stardewTailWag_1s_ease-in-out_infinite]' : ''} />
            </svg>
          </div>
        );
      
      case 'deer':
        return (
          <div 
            className={cn(
              'relative w-16 h-16 transition-all duration-300',
              isMoving && 'animate-[stardewWalk_0.6s_ease-in-out_infinite]',
              !isMoving && isAnimating && 'animate-[stardewIdle_3s_ease-in-out_infinite]',
              className
            )}
            style={{ 
              transform: `translateX(${position}%) translateY(${bobPosition === 1 || bobPosition === 3 ? '-2px' : '0px'})`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="100%"
              height="100%"
              style={{ imageRendering: 'pixelated' }}
              className={isAnimating && !isMoving ? 'animate-[stardewIdle_3s_ease-in-out_infinite]' : ''}
            >
              {/* Hierba */}
              <rect x="0" y="26" width="32" height="6" fill="#4CAF50" />
              <rect x="3" y="25" width="2" height="2" fill="#8BC34A" />
              <rect x="9" y="25" width="2" height="2" fill="#8BC34A" />
              <rect x="16" y="25" width="2" height="2" fill="#8BC34A" />
              <rect x="23" y="25" width="2" height="2" fill="#8BC34A" />
              <rect x="28" y="25" width="2" height="2" fill="#8BC34A" />
              
              {/* Cuerpo - Ciervo */}
              <rect x="8" y="14" width="16" height="8" fill="#A0522D" />
              
              {/* Manchas */}
              <rect x="10" y="16" width="2" height="2" fill="#FFFFFF" />
              <rect x="16" y="15" width="2" height="2" fill="#FFFFFF" />
              <rect x="20" y="17" width="2" height="2" fill="#FFFFFF" />
              <rect x="14" y="18" width="2" height="2" fill="#FFFFFF" />
              
              {/* Cabeza */}
              <rect x="20" y="8" width="8" height="6" fill="#A0522D" />
              
              {/* Astas */}
              <rect x="21" y="4" width="2" height="4" fill="#8B4513" />
              <rect x="19" y="4" width="2" height="2" fill="#8B4513" />
              <rect x="23" y="4" width="2" height="2" fill="#8B4513" />
              <rect x="25" y="4" width="2" height="4" fill="#8B4513" />
              <rect x="27" y="4" width="2" height="2" fill="#8B4513" />
              
              {/* Ojos */}
              <rect x="22" y="10" width="1" height="1" fill="#000000" className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''} />
              <rect x="25" y="10" width="1" height="1" fill="#000000" className={isAnimating ? 'animate-[pixelBlink_4s_ease-in-out_infinite]' : ''} />
              
              {/* Nariz */}
              <rect x="26" y="12" width="2" height="1" fill="#000000" />
              
              {/* Patas */}
              <rect x="9" y="22" width="2" height="4" fill="#8B4513" className={isMoving ? 'animate-[pixelBounce_0.6s_ease-in-out_infinite]' : ''} />
              <rect x="15" y="22" width="2" height="4" fill="#8B4513" className={isMoving ? 'animate-[pixelBounce_0.6s_ease-in-out_infinite_0.15s]' : ''} />
              <rect x="17" y="22" width="2" height="4" fill="#8B4513" className={isMoving ? 'animate-[pixelBounce_0.6s_ease-in-out_infinite_0.3s]' : ''} />
              <rect x="23" y="22" width="2" height="4" fill="#8B4513" className={isMoving ? 'animate-[pixelBounce_0.6s_ease-in-out_infinite_0.45s]' : ''} />
              
              {/* Cola */}
              <rect x="6" y="16" width="2" height="2" fill="#A0522D" className={isAnimating ? 'animate-[stardewTailWag_1.5s_ease-in-out_infinite]' : ''} />
            </svg>
          </div>
        );
      
      default:
        return null;
    }
  };

  return renderPet();
};

export default StardewPets;