import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header'; // Assuming Header component exists
import { ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react'; // Icons

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-900/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">

        <ShieldCheck className="h-20 w-20 text-primary mb-6 animate-bounce" /> {/* Animated Icon */}

        <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground sm:text-5xl md:text-6xl animate-fadeIn">
          Bienvenido a <span className="text-primary">FamilySafe AI</span>
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          Comprende mejor la dinámica familiar y toma medidas hacia un entorno más seguro y saludable. Nuestra evaluación intuitiva ayuda a identificar riesgos potenciales.
        </p>

        <Card className="w-full max-w-md shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="items-center">
             <HeartHandshake className="h-12 w-12 text-primary mb-3" />
            <CardTitle className="text-2xl">Comienza tu Evaluación</CardTitle>
            <CardDescription>
              Participa en nuestro breve test gamificado para obtener información valiosa. Es confidencial y está diseñado para ser de apoyo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
               Haz clic abajo para comenzar la evaluación interactiva. Solo toma unos minutos.
            </p>
          </CardContent>
          <CardFooter className="justify-center pt-4">
            <Link href="/test" passHref>
              <Button size="lg">
                Iniciar Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground">
         FamilySafe AI - Creando conciencia para familias más seguras.
      </footer>
    </div>
  );
}

// Simple bounce animation for the icon
const styles = `
@keyframes bounce {
  0%, 100% {
    transform: translateY(-15%);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
.animate-bounce {
  animation: bounce 1.5s infinite;
}
`;

// Inject styles into the head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
