"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/componentes/ui/boton";
import Header from "@/componentes/Encabezado";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/componentes/ui/tarjeta';
import { ShieldCheck, Users, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import CentralPetArea from '@/components/pets/CentralPetArea';
import Logo from '@/componentes/LogoEmpresa';

export default function HomePage() {
  //Estado para el modo oscuro
  const [logoVariant, setLogoVariant] = useState<'light' | 'dark'>('light');
  // Estados para el botón de inicio
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

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
          <ShieldCheck className="h-16 w-16 sm:h-20 sm:w-20 text-primary animate-bounce" />
        </div>
        
        {/* Área central con mascota interactiva - posicionada para no interferir con el contenido */}
        <div className="fixed inset-0 pointer-events-none z-30">
          <CentralPetArea activePetType="dog" showInTest={false} />
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
            {/* Reemplazamos el Link por un botón con estados */}
              <Button 
                size="lg" 
                className="w-full sm:w-auto relative" 
                onClick={async () => {
                  try {
                    // Activar estado de carga
                    setIsLoading(true);
                    
                    // Simular una pequeña carga para mostrar la animación
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    // Mostrar palomita de éxito
                    setIsSuccess(true);
                    
                    // Esperar un momento para mostrar la palomita
                    await new Promise(resolve => setTimeout(resolve, 600));
                    
                    // Redirigir al test
                    router.push('/test');
                  } catch (error) {
                    console.error('Error al iniciar el test:', error);
                    setIsLoading(false);
                    setIsSuccess(false);
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  isSuccess ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-white animate-pulse" />
                      <span className="ml-2">Completado</span>
                    </>
                  ) : (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando...
                    </>
                  )
                ) : (
                  <>
                    Iniciar Test
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </Button>
          </CardContent>
        </Card>

      </main>
      <footer className="text-center py-6 text-xs sm:text-sm text-muted-foreground">
        Fam Security - Creando conciencia para familias más seguras.
      </footer>
    </div>
  );
}