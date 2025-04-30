'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header';
import { generateRiskAssessmentReportAction } from '@/lib/actions';
import type { GenerateRiskAssessmentReportOutput } from '@/ai/flows/generate-risk-assessment-report';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Import cn utility

// Simplified Animated Placeholder for Illustrations
const AnimatedIllustrationPlaceholder = ({ id }: { id: number }) => {
  return (
    <div className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center text-primary/50 p-4 border border-border/30">
       <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24" />
       {/* Subtle pulse animation */}
       {/* <div className="animate-pulse">
            <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24" />
       </div> */}
    </div>
  );
};


interface Question {
  id: number;
  type: 'multiple-choice' | 'image-interpretation';
  text: string;
  options?: { value: string; label: string }[];
  imageSrc?: string;
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
      { value: "discusiones_intensas", label: "Discusiones intensas / Gritos" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={2} />,
  },
  {
    id: 3,
    type: 'multiple-choice',
    text: "¿Alguna vez sientes miedo de la reacción de alguien en tu hogar?",
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
    text: "¿Qué tan apoyado/a te sientes por las personas con las que vives?",
    options: [
      { value: "muy_apoyado", label: "Muy apoyado/a" },
      { value: "algo_apoyado", label: "Algo apoyado/a" },
      { value: "poco_apoyado", label: "Poco apoyado/a" },
      { value: "nada_apoyado", label: "Nada apoyado/a" },
    ],
    illustration: <AnimatedIllustrationPlaceholder id={4} />,
  },
   {
    id: 5,
    type: 'multiple-choice',
    text: "¿Has notado comportamientos controladores (p. ej., revisar tu teléfono, decirte qué vestir, limitar tus salidas)?",
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
      // Placeholder image using picsum with a specific seed for consistency
      imageSrc: 'https://picsum.photos/seed/famsec_harmony/400/300',
      options: [
          { value: 'armonia_paz', label: 'Armonía / Paz' },
          { value: 'tension_conflicto', label: 'Tensión / Conflicto' },
          { value: 'tristeza_soledad', label: 'Tristeza / Soledad' },
          { value: 'indiferencia', label: 'Indiferencia' },
      ],
      illustration: null, // No placeholder needed if imageSrc is present
  },
  {
      id: 7,
      type: 'image-interpretation',
      text: "Observa la imagen. ¿Qué dinámica familiar representa mejor para ti?",
      // Placeholder image using picsum with a different seed
      imageSrc: 'https://picsum.photos/seed/famsec_dynamics/400/300',
      options: [
          { value: 'conexion_apoyo', label: 'Conexión y apoyo' },
          { value: 'distanciamiento', label: 'Distanciamiento' },
          { value: 'jerarquia_control', label: 'Jerarquía / Control' },
          { value: 'caos_confusion', label: 'Caos / Confusión' },
      ],
       illustration: null, // No placeholder needed
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
    // Check if an answer is selected for the current question
    if (answers[currentQuestion.id]) {
       if (currentQuestionIndex < questions.length - 1) {
         setCurrentQuestionIndex((prev) => prev + 1);
         setError(null); // Clear error on successful navigation
       }
       // If it's the last question, the button will change to "Submit"
    } else {
       // Set error if no option is selected
       setError("Por favor, selecciona una opción para continuar.");
    }
  }, [currentQuestionIndex, answers, currentQuestion]);


  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setError(null); // Clear error when going back
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    // Final check to ensure all questions are answered before submitting
    if (Object.keys(answers).length !== questions.length) {
        // Find the first unanswered question and navigate to it
        const firstUnanswered = questions.find(q => !answers[q.id]);
        if (firstUnanswered) {
            setCurrentQuestionIndex(questions.findIndex(q => q.id === firstUnanswered.id));
        }
        setError("Por favor, responde todas las preguntas antes de enviar.");
        return; // Stop submission
    }

    setIsLoading(true);
    setIsSubmitting(true); // Indicate submission process started
    setError(null);

    // Format answers for the AI flow input
    const formattedAnswers = JSON.stringify(
       questions.map(q => ({
         id: q.id,
         question: q.text,
         type: q.type,
         answer: answers[q.id] || 'No respondido' // Fallback, though validation should prevent this
       }))
    );

    try {
        // Call the server action
        const result: GenerateRiskAssessmentReportOutput = await generateRiskAssessmentReportAction({
           testResponses: formattedAnswers,
        });

        console.log("Resultado de generación de informe:", result);

        // Check if the flow returned an error message within the report field
        if (result && result.report && result.report.startsWith('Error')) {
          throw new Error(result.report); // Propagate flow-specific error
        }

        // Basic validation of the result structure
        if (result && result.report && result.resources !== undefined) {
           // Store result in localStorage
           localStorage.setItem('riskAssessmentResult', JSON.stringify(result));
           // Navigate to the results page
           router.push('/results');
        } else {
           // Construct a more specific error message if structure is wrong
           let errorMsg = 'Respuesta inesperada al generar el informe.';
           if (!result?.report) errorMsg += ' Falta el contenido del informe.';
           if (result?.resources === undefined) errorMsg += ' Faltan los recursos.';
           throw new Error(errorMsg);
        }

    } catch (err: any) {
        console.error("Error al enviar el test:", err);
        setError(err.message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
        setIsSubmitting(false); // Allow retry if submission failed
    } finally {
        // Only set isLoading to false. isSubmitting remains true on success
        // to prevent double clicks during the navigation process.
        setIsLoading(false);
    }
  }, [answers, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/90 to-primary/10 dark:from-background dark:via-background/90 dark:to-primary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        {/* Card container */}
        <Card className="w-full max-w-md md:max-w-lg shadow-xl rounded-xl animate-fadeIn border border-border/50">
          <CardHeader className="p-4 sm:p-6">
            {/* Use primary color for progress bar */}
            <Progress value={progressValue} className="mb-4 h-2 [&>div]:bg-primary" />
            <CardTitle className="text-lg sm:text-xl font-semibold text-center mb-1">Pregunta {currentQuestion.id} de {questions.length}</CardTitle>
             {/* Question Area with background */}
             <div className="my-4 p-4 bg-muted/40 rounded-lg border border-border/30">
                 {/* Image for interpretation questions */}
                 {currentQuestion.type === 'image-interpretation' && currentQuestion.imageSrc && (
                    <div className="mb-4 rounded-lg overflow-hidden border shadow-sm aspect-video relative">
                         <Image
                             src={currentQuestion.imageSrc}
                             alt={`Imagen para la pregunta ${currentQuestion.id}`}
                             fill // Use fill for responsive sizing
                             style={{ objectFit: 'cover' }} // Cover the area
                             priority={currentQuestionIndex < 2} // Prioritize loading early images
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
                             unoptimized={false} // Allow Next.js optimization
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
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4 animate-shake">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* Options Radio Group */}
             {currentQuestion.options && (
                 <RadioGroup
                    key={currentQuestion.id} // Ensure re-render on question change
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleOptionChange}
                    className="space-y-3"
                 >
                    {currentQuestion.options.map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`${currentQuestion.id}-${option.value}`}
                        // Use cn for conditional styling based on selection
                        className={cn(
                            "flex items-center space-x-3 p-3 sm:p-4 border rounded-lg transition-all duration-200 cursor-pointer hover:bg-accent hover:border-primary/50",
                            // Highlight selected option with primary color accents
                            answers[currentQuestion.id] === option.value
                              ? 'bg-primary/10 border-primary ring-2 ring-primary/70 shadow-inner'
                              : 'border-border'
                        )}
                        >
                        {/* Style RadioGroupItem to use primary color */}
                        <RadioGroupItem
                            value={option.value}
                            id={`${currentQuestion.id}-${option.value}`}
                            className="h-5 w-5 border-muted-foreground text-primary focus:ring-primary"
                        />
                        <span className="flex-1 text-sm sm:text-base">{option.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
             )}
          </CardContent>
          <CardFooter className="flex justify-between p-4 sm:p-6 border-t border-border/50">
             {/* Previous Button */}
             <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || isLoading}
                aria-label="Pregunta anterior"
             >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
             </Button>
             {/* Next / Submit Button */}
             {currentQuestionIndex === questions.length - 1 ? (
               // Submit button on the last question
               <Button
                 onClick={handleSubmit}
                 // Disable if no answer selected, or if loading/submitting
                 disabled={!answers[currentQuestion.id] || isLoading || isSubmitting}
                 aria-label="Enviar respuestas y ver informe"
               >
                 {isLoading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Generando...
                   </>
                 ) : (
                    'Ver Informe'
                 )}
               </Button>
             ) : (
               // Next button for other questions
               <Button
                 onClick={handleNext}
                 // Disable if no answer selected or if loading
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
```