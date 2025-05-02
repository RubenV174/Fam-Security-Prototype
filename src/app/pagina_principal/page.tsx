"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/componentes/ui/boton";
import Header from "@/componentes/Encabezado";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/componentes/ui/tarjeta';
import { ShieldCheck, Users, ArrowRight } from 'lucide-react';
import VirtualPet from '@/componentes/pets/VirtualPet';
import Logo from '@/componentes/LogoEmpresa';

export default function HomePage() {
  //Camina de estado para el modo oscuro
  const [logoVariant, setLogoVariant] = useState<'light' | 'dark'>('light');

  // Manejador para cambiar el modo oscuro y el logo
  function handleToggle() {
    // Cambia el modo oscuro
    document.documentElement.classList.toggle('dark');
    // Cambia el logo
    setLogoVariant((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    // Adjusted gradient to use primary color subtly
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/90 to-primary/10 dark:from-background dark:via-background/90 dark:to-primary/20">
      <Header logoVariant={logoVariant} onToggleMode={handleToggle} />
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 md:py-24 flex flex-col items-center justify-center text-center">

        {/* Use primary color for the main icon */}
        <div className="flex flex-col items-center mb-8">
          <VirtualPet petType="dog" className="mb-4" />
          <ShieldCheck className="h-16 w-16 sm:h-20 sm:w-20 text-primary animate-bounce" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-4 animate-fadeIn">
          Bienvenido a <span className="text-primary">Fam Security</span>
        </h1>
        <p className="max-w-xl md:max-w-2xl text-base sm:text-lg text-muted-foreground mb-8 animate-fadeIn [animation-delay:0.2s]">
          Comprende mejor la dinámica familiar y toma medidas hacia un entorno más seguro y saludable. Nuestra evaluación intuitiva ayuda a identificar riesgos potenciales.
        </p>

        {/* Card styling */}
        <Card className="w-full max-w-md shadow-lg rounded-xl animate-fadeIn [animation-delay:0.4s] border border-border/50">
          <CardHeader className="items-center pt-8 pb-4">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3" />
            <CardTitle className="text-xl sm:text-2xl font-semibold">Comienza tu Evaluación</CardTitle>
            <CardDescription className="text-sm sm:text-base text-center px-4">
              Participa en nuestro breve test gamificado para obtener información valiosa. Es confidencial y está diseñado para ser de apoyo.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Haz clic abajo para comenzar la evaluación interactiva. Solo toma unos minutos.
            </p>
            <Link href="/test" passHref>
            
            {/* Botón de cambio de modo oscuro y claro */}
              <Button size="lg" className="w-full sm:w-auto">
                Iniciar Test
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

      </main>
      <footer className="text-center py-6 text-xs sm:text-sm text-muted-foreground">
        Fam Security - Creando conciencia para familias más seguras.
      </footer>
    </div>
  );
}