'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, ArrowRight, Image as ImageIcon } from 'lucide-react'; // Added ImageIcon
import Header from '@/components/Header';
import { generateRiskAssessmentReportAction } from '@/lib/actions';
import type { GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';
import Image from 'next/image'; // Import next/image

// Animated SVG Placeholders (Replace with actual animated SVGs or components)
const AnimatedIllustration = ({ id }: { id: number }) => {
  // Example simple animation (pulse) - replace with more complex animations
  const pulseStyle = { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' };
  return (
    <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground overflow-hidden">
      <svg width="100" height="100" viewBox="0 0 100 100" style={pulseStyle}>
        {/* Basic shapes representing concepts - replace with intuitive drawings */}
        {id === 1 && <rect x="20" y="30" width="60" height="40" rx="5" fill="hsl(var(--primary))" opacity="0.7" />}
        {id === 2 && <>
            <path d="M30 30 L70 70 M70 30 L30 70" stroke="hsl(var(--destructive))" strokeWidth="5" opacity="0.7" />
            <path d="M50 20 L50 80" stroke="hsl(var(--primary))" strokeWidth="5" opacity="0.7" />
        </>}
        {id === 3 && <circle cx="50" cy="50" r="25" fill="hsl(var(--destructive))" opacity="0.5" />}
        {id === 4 && <path d="M20 50 Q50 20 80 50 T80 50" stroke="hsl(var(--chart-2))" strokeWidth="5" fill="none" opacity="0.7" />}
        {id === 5 && <rect x="30" y="30" width="40" height="40" rx="20" stroke="hsl(var(--primary))" strokeWidth="5" fill="none" opacity="0.7" />}
         {/* Placeholder for image interpretation */}
        {(id === 6 || id === 7) && <ImageIcon className="w-16 h-16 text-primary" />}
      </svg>
       <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

interface Question {
  id: number;
  type: 'multiple-choice' | 'image-interpretation'; // Add question type
  text: string;
  options?: { value: string; label: string }[]; // Optional for image interpretation
  imageSrc?: string; // For image interpretation questions
  illustration: React.ReactNode;
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    text: "¿Con qué frecuencia te sientes tenso/a o ansioso/a en casa?",
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
    illustration: <AnimatedIllustration id={1} />,
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "Cuando surgen desacuerdos, ¿cómo se resuelven típicamente?",
    options: [
      { value: "discusion_calmada", label: "Discusión calmada" },
      { value: "voces_altas", label: "Voces altas" },
      { value: "evitacion", label: "Evitación / Ignorarlo" },
      { value: "discusiones_fisicas", label: "Discusiones físicas / Agresión" },
    ],
    illustration: <AnimatedIllustration id={2} />,
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "¿Alguna vez sientes miedo de alguien en tu hogar?",
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
    illustration: <AnimatedIllustration id={3} />,
  },
   {
    id: 4,
    type: 'multiple-choice',
    text: "¿Qué tan apoyado/a te sientes por tu familia?",
    options: [
      { value: "muy_apoyado", label: "Muy apoyado/a" },
      { value: "algo_apoyado", label: "Algo apoyado/a" },
      { value: "no_muy_apoyado", label: "No muy apoyado/a" },
      { value: "nada_apoyado", label: "Nada apoyado/a" },
    ],
    illustration: <AnimatedIllustration id={4} />,
  },
   {
    id: 5,
    type: 'multiple-choice',
    text: "¿Ha habido casos de comportamiento controlador (p. ej., limitar contacto con amigos/familia, controlar finanzas)?",
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
    illustration: <AnimatedIllustration id={5} />,
  },
  // --- New Image Interpretation Questions ---
  {
      id: 6,
      type: 'image-interpretation',
      text: "¿Qué emoción o situación te sugiere esta imagen?",
      // Use a placeholder image URL from picsum.photos
      imageSrc: 'https://picsum.photos/seed/familysafe1/400/300',
      options: [
          { value: 'felicidad_union', label: 'Felicidad / Unión' },
          { value: 'tension_conflicto', label: 'Tensión / Conflicto' },
          { value: 'tristeza_aislamiento', label: 'Tristeza / Aislamiento' },
          { value: 'neutralidad', label: 'Neutralidad / Indiferencia' },
      ],
      illustration: <AnimatedIllustration id={6} />, // Generic placeholder icon
  },
  {
      id: 7,
      type: 'image-interpretation',
      text: "Observa la imagen. ¿Qué dinámica familiar representa mejor para ti?",
      imageSrc: 'https://picsum.photos/seed/familysafe2/400/300',
      options: [
          { value: 'apoyo_mutuo', label: 'Apoyo mutuo y comunicación' },
          { value: 'distancia_emocional', label: 'Distancia emocional' },
          { value: 'control_desigualdad', label: 'Control o desigualdad' },
          { value: 'caos_desorden', label: 'Caos o desorden' },
      ],
      illustration: <AnimatedIllustration id={7} />, // Generic placeholder icon
  },
];

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex]);
  const progressValue = useMemo(() => ((currentQuestionIndex + 1) / questions.length) * 100, [currentQuestionIndex]);

  const handleOptionChange = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
     setError(null); // Clear error when an option is selected
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (answers[currentQuestion.id]) {
       if (currentQuestionIndex < questions.length - 1) {
         setCurrentQuestionIndex((prev) => prev + 1);
       }
    } else {
       setError("Por favor, selecciona una opción antes de continuar.");
    }
  }, [currentQuestionIndex, answers, currentQuestion]);


  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setError(null); // Clear error when going back
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    // Final check if all questions answered
    if (Object.keys(answers).length !== questions.length) {
        // Find first unanswered question
        const firstUnanswered = questions.find(q => !answers[q.id]);
        if (firstUnanswered) {
            setCurrentQuestionIndex(questions.findIndex(q => q.id === firstUnanswered.id));
        }
        setError("Por favor, responde todas las preguntas antes de enviar.");
        return;
    }

    setIsLoading(true);
    setIsSubmitting(true);
    setError(null);

    const formattedAnswers = JSON.stringify(
       questions.map(q => ({
         id: q.id,
         question: q.text,
         type: q.type,
         answer: answers[q.id] || 'No respondido' // 'Not Answered' in Spanish
       }))
    );

    try {
        const result: GenerateRiskAssessmentReportOutput = await generateRiskAssessmentReportAction({
           testResponses: formattedAnswers,
        });

        console.log("Resultado de generación de informe:", result);

        // Check for error message within the report string itself
        if (result && result.report && result.report.startsWith('Error generando informe:')) {
          throw new Error(result.report); // Throw error if action returned an error message
        }

        if (result && result.report && result.resources) {
           localStorage.setItem('riskAssessmentResult', JSON.stringify(result));
           router.push('/results'); // Navigate to results page
        } else {
           // Handle cases where the AI might return incomplete data, even if no explicit error was thrown by the action
           let errorMsg = 'Error al generar el informe.';
           if (!result?.report) errorMsg += ' Falta el contenido del informe.';
           if (!result?.resources) errorMsg += ' Faltan los recursos.';
           throw new Error(errorMsg + ' Respuesta inesperada de la IA.');
        }

    } catch (err: any) {
        console.error("Error al enviar el test:", err);
        setError(err.message || "Ocurrió un error inesperado al generar el informe. Por favor, inténtalo de nuevo más tarde.");
        setIsSubmitting(false); // Allow retry on error
    } finally {
        // Only set isLoading to false, isSubmitting remains true if navigation occurs
        setIsLoading(false);
    }
  }, [answers, router]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-lg animate-fadeIn transition-all duration-500">
          <CardHeader>
            <Progress value={progressValue} className="mb-4" />
            <CardTitle className="text-xl font-semibold text-center mb-2">Pregunta {currentQuestion.id} de {questions.length}</CardTitle>
             {/* Illustration and Question Text Section */}
             <div className="mb-4 p-4 bg-muted/50 rounded-lg flex flex-col items-center">
                 {/* Display image if it's an image interpretation question */}
                 {currentQuestion.type === 'image-interpretation' && currentQuestion.imageSrc && (
                    <div className="mb-4 rounded-lg overflow-hidden border">
                         <Image
                             src={currentQuestion.imageSrc}
                             alt={`Imagen para la pregunta ${currentQuestion.id}`}
                             width={400}
                             height={300}
                             className="object-cover"
                             priority={currentQuestionIndex === 0} // Prioritize loading first image
                             unoptimized // Use if picsum causes issues with Next/Image optimization
                         />
                     </div>
                 )}
                 {/* Display illustration if not an image question or as fallback */}
                 {currentQuestion.type !== 'image-interpretation' && (
                     <div className="mt-4 aspect-video overflow-hidden rounded-lg flex items-center justify-center">
                         {currentQuestion.illustration}
                     </div>
                 )}
                 <CardDescription className="text-center text-foreground mt-4">{currentQuestion.text}</CardDescription>
             </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 animate-shake">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Options Section */}
             {currentQuestion.options && (
                 <RadioGroup
                    key={currentQuestion.id} // Add key to force re-render on question change
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleOptionChange}
                    className="space-y-3"
                 >
                    {currentQuestion.options.map((option) => (
                      <div key={option.value} className={`flex items-center space-x-3 p-3 border rounded-md transition-all duration-200 cursor-pointer ${answers[currentQuestion.id] === option.value ? 'bg-primary/10 border-primary ring-1 ring-primary' : 'hover:bg-accent'}`}>
                        <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                        <Label htmlFor={`${currentQuestion.id}-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
             )}

          </CardContent>
          <CardFooter className="flex justify-between pt-4 border-t">
             <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || isLoading}
             >
                Anterior
             </Button>
             {currentQuestionIndex === questions.length - 1 ? (
               <Button
                 onClick={handleSubmit}
                 disabled={!answers[currentQuestion.id] || isLoading || isSubmitting}
               >
                 {isLoading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Generando Informe...
                   </>
                 ) : (
                    'Enviar y Ver Informe'
                 )}
               </Button>
             ) : (
               <Button
                 onClick={handleNext}
                 disabled={!answers[currentQuestion.id] || isLoading}
               >
                 Siguiente
                 <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
             )}
          </CardFooter>
        </Card>
      </main>
       <footer className="text-center py-4 text-sm text-muted-foreground">
         Fam Security - Prevención a través de la Conciencia {/* Updated App Name */}
       </footer>
    </div>
  );
}

// Simple shake animation for error
const styles = `
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
.animate-shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}
`;

// Inject styles into the head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
