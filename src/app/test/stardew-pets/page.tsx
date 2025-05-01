'use client';

import React, { useState } from 'react';
import VirtualPet from '@/components/pets/VirtualPet';

export default function StardewPetsDemo() {
  const [isWalking, setIsWalking] = useState(false);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Mascotas Estilo Stardew Valley</h1>
      
      <div className="flex flex-col items-center mb-8">
        <button 
          onClick={() => setIsWalking(!isWalking)}
          className="px-4 py-2 bg-primary text-white rounded-md mb-4 hover:bg-opacity-90 transition-colors"
        >
          {isWalking ? 'Detener' : 'Caminar'}
        </button>
        
        <p className="text-muted-foreground mb-8">
          Haz clic en el botón para alternar entre caminar y estar parado.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Vaca</h2>
          <div className="bg-[#f0f0f0] p-4 rounded-lg mb-4 flex items-center justify-center h-48 w-full">
            <VirtualPet petType="stardew-cow" isAnimating={true} isWalking={isWalking} />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Vaca detallada con manchas y animaciones suaves
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gallina</h2>
          <div className="bg-[#f0f0f0] p-4 rounded-lg mb-4 flex items-center justify-center h-48 w-full">
            <VirtualPet petType="stardew-chicken" isAnimating={true} isWalking={isWalking} />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Gallina con cresta roja y animaciones de aleteo
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Conejo</h2>
          <div className="bg-[#f0f0f0] p-4 rounded-lg mb-4 flex items-center justify-center h-48 w-full">
            <VirtualPet petType="stardew-rabbit" isAnimating={true} isWalking={isWalking} />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Conejo con orejas largas y animación de salto
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ciervo</h2>
          <div className="bg-[#f0f0f0] p-4 rounded-lg mb-4 flex items-center justify-center h-48 w-full">
            <VirtualPet petType="stardew-deer" isAnimating={true} isWalking={isWalking} />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Ciervo con astas y manchas blancas detalladas
          </p>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sobre estas mascotas</h2>
        <p className="mb-4">
          Estas mascotas virtuales están inspiradas en el estilo pixel art de Stardew Valley, con animaciones detalladas 
          y características únicas para cada animal.
        </p>
        <p>
          Cada mascota tiene animaciones de caminar y estar parado, con detalles como parpadeo, movimiento de cola y 
          pequeños movimientos que les dan vida y personalidad.
        </p>
      </div>
    </div>
  );
}