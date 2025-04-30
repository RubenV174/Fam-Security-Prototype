'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react'; // Added ArrowLeft
import Header from '@/components/Header';
import { generateRiskAssessmentReportAction } from '@/lib/actions';
import type { GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';
import Image from 'next/image';

// Simplified Animated Placeholder for Illustrations (Can be replaced with actual SVGs later)
const AnimatedIllustrationPlaceholder = ({ id }: { id: number }) => {
  // Basic representation, enhance with actual graphics later
  return (
    <div className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center text-primary/50 p-4">
       <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24" />
       {/* You could add subtle animation class here like 'animate-pulse' if desired */}
    </div>
  );
};


interface Question {
  id: number;
  type: 'multiple-choice' | 'image-interpretation';
  text: string;
  options?: { value: string; label: string }[];
  imageSrc?: string;
  illustration: React.ReactNode; // Keep illustration for non-image questions
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
     illustration: <AnimatedIllustrationPlaceholder id={1} />,
  },
  {
    id: 2,
    type: 'multiple-choice',
    text: "Cuando surgen desacuerdos, ¿cómo se resuelven típicamente?",
    options: [
      { value: "discusion_calmada", label: "Discusión calmada" },
      { value: "voces_altas", label: "Voces altas" },
      { value: "evitacion", label: "Evitación / Ignorarlo" },
      { value: "discusiones_intensas", label: "Discusiones intensas / Gritos" }, // Refined option
    ],
    illustration: <AnimatedIllustrationPlaceholder id={2} />,
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "¿Alguna vez sientes miedo de la reacción de alguien en tu hogar?", // Rephrased slightly
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={3} />,
  },
   {
    id: 4,
    type: 'multiple-choice',
    text: "¿Qué tan apoyado/a te sientes por las personas con las que vives?", // Rephrased
    options: [
      { value: "muy_apoyado", label: "Muy apoyado/a" },
      { value: "algo_apoyado", label: "Algo apoyado/a" },
      { value: "poco_apoyado", label: "Poco apoyado/a" }, // Changed label
      { value: "nada_apoyado", label: "Nada apoyado/a" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={4} />,
  },
   {
    id: 5,
    type: 'multiple-choice',
    text: "¿Has notado comportamientos controladores (p. ej., revisar tu teléfono, decirte qué vestir, limitar tus salidas)?", // Rephrased with examples
    options: [
      { value: "nunca", label: "Nunca" },
      { value: "raramente", label: "Raramente" },
      { value: "a_veces", label: "A veces" },
      { value: "a_menudo", label: "A menudo" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={5} />,
  },
  {
      id: 6,
      type: 'image-interpretation',
      text: "¿Qué emoción o situación te sugiere esta imagen?",
      imageSrc: 'https://picsum.photos/seed/familysafe_calm/400/300', // Changed seed for variety
      options: [
          { value: 'armonia_paz', label: 'Armonía / Paz' }, // Refined labels
          { value: 'tension_conflicto', label: 'Tensión / Conflicto' },
          { value: 'tristeza_soledad', label: 'Tristeza / Soledad' },
          { value: 'indiferencia', label: 'Indiferencia' },
      ],
      // No illustration needed if imageSrc is present
      illustration: null,
  },
  {
      id: 7,
      type: 'image-interpretation',
      text: "Observa la imagen. ¿Qué dinámica familiar representa mejor para ti?",
      imageSrc: 'https://picsum.photos/seed/familysafe_distant/400/300', // Changed seed
      options: [
          { value: 'conexion_apoyo', label: 'Conexión y apoyo' }, // Refined labels
          { value: 'distanciamiento', label: 'Distanciamiento' },
          { value: 'jerarquia_control', label: 'Jerarquía / Control' },
          { value: 'caos_confusion', label: 'Caos / Confusión' },
      ],
       illustration: null,
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
     setError(null);
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (answers[currentQuestion.id]) {
       if (currentQuestionIndex < questions.length - 1) {
         setCurrentQuestionIndex((prev) => prev + 1);
       }
    } else {
       setError("Por favor, selecciona una opción para continuar.");
    }
  }, [currentQuestionIndex, answers, currentQuestion]);


  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setError(null);
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    if (Object.keys(answers).length !== questions.length) {
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
         answer: answers[q.id] || 'No respondido'
       }))
    );

    try {
        const result: GenerateRiskAssessmentReportOutput = await generateRiskAssessmentReportAction({
           testResponses: formattedAnswers,
        });

        console.log("Resultado de generación de informe:", result);

        if (result && result.report && result.report.startsWith('Error')) { // Broader error check
          throw new Error(result.report);
        }

        if (result && result.report && result.resources !== undefined) { // Check resource exists, even if empty string
           localStorage.setItem('riskAssessmentResult', JSON.stringify(result));
           router.push('/results');
        } else {
           let errorMsg = 'Respuesta inesperada al generar el informe.';
           if (!result?.report) errorMsg += ' Falta el contenido del informe.';
           if (result?.resources === undefined) errorMsg += ' Faltan los recursos.';
           throw new Error(errorMsg);
        }

    } catch (err: any) {
        console.error("Error al enviar el test:", err);
        setError(err.message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
        setIsSubmitting(false);
    } finally {
        setIsLoading(false);
        // isSubmitting remains true on success to prevent double clicks during navigation
    }
  }, [answers, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-primary/10 dark:from-background dark:via-background dark:to-primary/5">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        {/* Wider card on larger screens */}
        <Card className="w-full max-w-md md:max-w-lg shadow-xl rounded-xl animate-fadeIn border border-border/50">
          <CardHeader className="p-4 sm:p-6">
            <Progress value={progressValue} className="mb-4 h-2" /> {/* Thinner progress bar */}
            <CardTitle className="text-lg sm:text-xl font-semibold text-center mb-1">Pregunta {currentQuestion.id} de {questions.length}</CardTitle>
             {/* Question Area */}
             <div className="my-4 p-4 bg-muted/40 rounded-lg">
                 {/* Image for interpretation questions */}
                 {currentQuestion.type === 'image-interpretation' && currentQuestion.imageSrc && (
                    <div className="mb-4 rounded-lg overflow-hidden border shadow-sm aspect-video relative">
                         <Image
                             src={currentQuestion.imageSrc}
                             alt={`Imagen para la pregunta ${currentQuestion.id}`}
                             fill // Use fill for responsive sizing within the container
                             style={{ objectFit: 'cover' }} // Ensure image covers the area
                             priority={currentQuestionIndex < 2} // Prioritize first few images
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
                             unoptimized={false} // Let Next.js optimize
                         />
                     </div>
                 )}
                 {/* Illustration Placeholder for other question types */}
                 {currentQuestion.type !== 'image-interpretation' && currentQuestion.illustration && (
                     <div className="mb-4">
                         {currentQuestion.illustration}
                     </div>
                 )}
                 <CardDescription className="text-center text-base sm:text-lg text-foreground font-medium">{currentQuestion.text}</CardDescription>
             </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {error && (
              <Alert variant="destructive" className="mb-4 animate-shake">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Options */}
             {currentQuestion.options && (
                 <RadioGroup
                    key={currentQuestion.id}
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleOptionChange}
                    className="space-y-3"
                 >
                    {currentQuestion.options.map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`${currentQuestion.id}-${option.value}`}
                        className={cn(
                            "flex items-center space-x-3 p-3 sm:p-4 border rounded-lg transition-all duration-200 cursor-pointer hover:bg-accent hover:border-primary/50",
                            answers[currentQuestion.id] === option.value
                              ? 'bg-primary/10 border-primary ring-2 ring-primary/70'
                              : 'border-border'
                        )}
                        >
                        <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} className="h-5 w-5 border-muted-foreground" />
                        <span className="flex-1 text-sm sm:text-base">{option.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
             )}
          </CardContent>
          <CardFooter className="flex justify-between p-4 sm:p-6 border-t border-border/50">
             <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || isLoading}
                aria-label="Pregunta anterior"
             >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
             </Button>
             {currentQuestionIndex === questions.length - 1 ? (
               <Button
                 onClick={handleSubmit}
                 disabled={!answers[currentQuestion.id] || isLoading || isSubmitting}
                 aria-label="Enviar respuestas y ver informe"
               >
                 {isLoading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Generando...
                   </>
                 ) : (
                    'Ver Informe' // Simplified text
                 )}
               </Button>
             ) : (
               <Button
                 onClick={handleNext}
                 disabled={!answers[currentQuestion.id] || isLoading}
                 aria-label="Siguiente pregunta"
               >
                 Siguiente
                 <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
             )}
          </CardFooter>
        </Card>
      </main>
       <footer className="text-center py-6 text-xs sm:text-sm text-muted-foreground">
         Fam Security - Un paso hacia el bienestar familiar
       </footer>
    </div>
  );
}
